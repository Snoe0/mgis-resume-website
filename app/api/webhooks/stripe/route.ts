import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const { error } = await supabase.from('orders').insert({
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      template_id: session.metadata?.templateId,
      template_name: session.metadata?.templateName,
      amount: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      status: 'completed',
    })

    if (error) {
      console.error('Supabase insert error:', error)
    }
  }

  return NextResponse.json({ received: true })
}
