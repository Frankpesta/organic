import { NextRequest, NextResponse } from 'next/server';
import { sendShippingConfirmationEmail } from '@/lib/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      to,
      orderNumber,
      customerName,
      trackingNumber,
      carrier,
      estimatedDelivery,
      items,
      shippingAddress,
    } = body;

    // Validate required fields
    if (!to || !orderNumber || !customerName || !trackingNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendShippingConfirmationEmail({
      to,
      orderNumber,
      customerName,
      trackingNumber,
      carrier,
      estimatedDelivery,
      items,
      shippingAddress,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send shipping confirmation email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Shipping confirmation email sent successfully',
      data: result.data 
    });

  } catch (error) {
    console.error('Shipping confirmation email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

