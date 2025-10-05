import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, firstName } = body;

    // Validate required fields
    if (!to || !firstName) {
      return NextResponse.json(
        { error: 'Missing required fields: to, firstName' },
        { status: 400 }
      );
    }

    const result = await sendWelcomeEmail({
      to,
      firstName,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send welcome email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Welcome email sent successfully',
      data: result.data 
    });

  } catch (error) {
    console.error('Welcome email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

