import { NextRequest, NextResponse } from 'next/server'
import { roomService } from '@/lib/room-service'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roomId = parseInt(params.id)
    const body = await request.json()
    const { address, developer, name, description } = body
    
    const success = roomService.registerAgent(roomId, {
      address,
      developer,
      name,
      description
    })
    
    if (success) {
      const room = roomService.getRoom(roomId)
      return NextResponse.json({ success: true, data: room })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to register agent' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to register agent' }, { status: 500 })
  }
}
