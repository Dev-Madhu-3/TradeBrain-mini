import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const user = await db.user.create({
      data: {
        email,
        name,
        // In a real app, you would hash the password here
        traderLevel: 'beginner',
        tiqsScore: 0,
        totalPnl: 0,
        winRate: 0,
        totalTrades: 0
      }
    })

    // Return user data (excluding sensitive information)
    const { id, name: userName, email: userEmail, traderLevel, tiqsScore, totalPnl, winRate, totalTrades } = user

    return NextResponse.json({
      user: {
        id,
        name: userName,
        email: userEmail,
        traderLevel,
        tiqsScore,
        totalPnl,
        winRate,
        totalTrades
      },
      message: 'Registration successful'
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}