import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      to,
      orderNumber,
      customerName,
      orderDate,
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      billingAddress,
    } = body;

    // Validate required fields
    if (!to || !orderNumber || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendOrderConfirmationEmail({
      to,
      orderNumber,
      customerName,
      orderDate,
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      billingAddress,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Order confirmation email sent successfully',
      data: result.data 
    });

  } catch (error) {
    console.error('Order confirmation email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

