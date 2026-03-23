import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getTemplateById } from '@/lib/templates'

export async function POST(request: Request) {
  try {
    const { templateId } = await request.json()
    const template = getTemplateById(templateId)

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    if (template.price === 'free') {
      return NextResponse.json({ error: 'This template is free' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: template.price * 100,
            product_data: {
              name: template.title,
              description: `Resume template by ${template.creator}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        templateId: template.id,
        templateName: template.title,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
