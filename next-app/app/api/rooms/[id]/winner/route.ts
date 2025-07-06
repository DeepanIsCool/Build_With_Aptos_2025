import { NextRequest, NextResponse } from 'next/server'
import { roomService } from '@/lib/room-service'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roomId = parseInt(params.id)
    const body = await request.json()
    const { winner, admin } = body
    
    const success = roomService.declareWinner(roomId, winner, admin)
    
    if (success) {
      const room = roomService.getRoom(roomId)
      return NextResponse.json({ success: true, data: room })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to declare winner' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to declare winner' }, { status: 500 })
  }
}
