import { NextRequest, NextResponse } from 'next/server'
import { roomService } from '@/lib/room-service'

export async function GET() {
  try {
    const rooms = roomService.getRooms()
    return NextResponse.json({ success: true, data: rooms })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch rooms' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, problemStatement, admin, maxAgents, entryFee, minBet, maxBet } = body
    
    const newRoom = roomService.createRoom({
      name,
      description,
      problemStatement,
      admin,
      maxAgents,
      entryFee,
      minBet,
      maxBet
    })
    
    return NextResponse.json({ success: true, data: newRoom })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create room' }, { status: 500 })
  }
}
