# Email System Setup

This project uses Resend and React Email for sending transactional emails.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Resend Email Service
RESEND_API_KEY=your_resend_api_key_here

# Email Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup Steps

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use their test domain for development)
3. Get your API key from the dashboard
4. Add it to your environment variables

### 2. Domain Configuration

For production, you'll need to:
1. Add your domain to Resend
2. Configure DNS records as instructed by Resend
3. Update the `from` addresses in `lib/email.ts` to use your domain

### 3. Email Templates

The following email templates are available:

- **Order Confirmation** - Sent when an order is placed
- **Shipping Confirmation** - Sent when an order ships
- **Welcome Email** - Sent to new users
- **Password Reset** - Sent when users request password reset
- **Order Status Updates** - Sent when order status changes

### 4. Testing

For development, you can:
1. Use Resend's test domain
2. Check the Resend dashboard for sent emails
3. Use the API routes to test email sending

## Email Features

- ✅ Responsive HTML emails
- ✅ Professional design with branding
- ✅ Order confirmation with details
- ✅ Shipping notifications with tracking
- ✅ Welcome emails for new users
- ✅ Order status updates
- ✅ Password reset emails
- ✅ Dark mode support
- ✅ Mobile-optimized

## API Endpoints

- `POST /api/email/send-order-confirmation` - Send order confirmation
- `POST /api/email/send-shipping-confirmation` - Send shipping notification
- `POST /api/email/send-welcome` - Send welcome email

## Usage

Emails are automatically sent when:
- New users sign up (welcome email)
- Orders are placed (confirmation email)
- Orders are shipped (shipping notification)
- Order status changes (status update)

You can also manually trigger emails using the API endpoints or server actions.
