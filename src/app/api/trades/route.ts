import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const symbol = searchParams.get('symbol')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const whereClause: any = { userId }
    
    if (status && status !== 'all') {
      whereClause.status = status
    }
    
    if (symbol) {
      whereClause.symbol = { contains: symbol, mode: 'insensitive' }
    }

    const trades = await db.trade.findMany({
      where: whereClause,
      orderBy: { entryDate: 'desc' }
    })

    return NextResponse.json({ trades })
  } catch (error) {
    console.error('Error fetching trades:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      symbol,
      type,
      strategy,
      entryPrice,
      exitPrice,
      quantity,
      notes,
      tags
    } = await request.json()

    // Basic validation
    if (!userId || !symbol || !type || !entryPrice || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate P&L if exit price is provided
    const pnl = exitPrice ? (exitPrice - entryPrice) * quantity * (type === 'Long' ? 1 : -1) : 0
    const status = exitPrice ? 'closed' : 'open'

    // Create new trade
    const trade = await db.trade.create({
      data: {
        userId,
        symbol: symbol.toUpperCase(),
        type,
        strategy: strategy || null,
        entryPrice: parseFloat(entryPrice),
        exitPrice: exitPrice ? parseFloat(exitPrice) : null,
        quantity: parseInt(quantity),
        pnl,
        fees: 0, // You can calculate fees based on your broker
        status,
        notes: notes || null,
        tags: tags ? JSON.stringify(tags) : null,
        entryDate: new Date(),
        exitDate: exitPrice ? new Date() : null
      }
    })

    // Update user statistics
    await updateUserStats(userId)

    return NextResponse.json({
      trade,
      message: 'Trade created successfully'
    })

  } catch (error) {
    console.error('Error creating trade:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function updateUserStats(userId: string) {
  try {
    // Get all user trades
    const trades = await db.trade.findMany({
      where: { userId }
    })

    const totalTrades = trades.length
    const closedTrades = trades.filter(t => t.status === 'closed')
    const winningTrades = closedTrades.filter(t => t.pnl > 0)
    
    const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0)
    const winRate = totalTrades > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0

    // Calculate TIQS Score (simplified version)
    const tiqsScore = Math.round(
      (winRate * 5) + 
      (Math.min(totalTrades, 100) * 2) + 
      (Math.max(0, totalPnl / 100))
    )

    // Update user
    await db.user.update({
      where: { id: userId },
      data: {
        totalTrades,
        totalPnl,
        winRate,
        tiqsScore: Math.max(0, tiqsScore),
        traderLevel: getTraderLevel(tiqsScore)
      }
    })
  } catch (error) {
    console.error('Error updating user stats:', error)
  }
}

function getTraderLevel(tiqsScore: number): string {
  if (tiqsScore >= 1000) return 'expert'
  if (tiqsScore >= 700) return 'pro'
  if (tiqsScore >= 400) return 'intermediate'
  return 'beginner'
}