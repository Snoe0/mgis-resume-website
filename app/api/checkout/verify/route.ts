import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      status: session.payment_status,
      templateName: session.metadata?.templateName,
      templateId: session.metadata?.templateId,
      customerEmail: session.customer_details?.email,
      amount: session.amount_total,
    })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: 'Failed to verify session' }, { status: 500 })
  }
}
