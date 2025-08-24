import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // In a real app, you would hash and compare passwords
    // For now, we'll just check if the password is not empty
    if (!password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return user data (excluding sensitive information)
    const { id, name, email: userEmail, traderLevel, tiqsScore, totalPnl, winRate, totalTrades } = user

    return NextResponse.json({
      user: {
        id,
        name,
        email: userEmail,
        traderLevel,
        tiqsScore,
        totalPnl,
        winRate,
        totalTrades
      },
      message: 'Login successful'
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}