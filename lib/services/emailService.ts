import React from "react";
import { OrderConfirmationEmail } from "@/emails/order-confirmation";
import { ShippingConfirmationEmail } from "@/emails/shipping-confirmation";
import { WelcomeEmail } from "@/emails/welcome";
import { sendEmail } from "@/lib/resend";

// Type definitions
export interface WelcomeEmailData {
  customerName: string;
  customerEmail: string;
}

export interface OrderConfirmationData {
  to: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface ShippingConfirmationData {
  to: string;
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
    image?: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Order confirmation email
export async function sendOrderConfirmationEmail({
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
}: {
  to: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}) {
  return await sendEmail({
    to,
    subject: `Order Confirmation - ${orderNumber}`,
    react: OrderConfirmationEmail({
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
    }),
  });
}

// Welcome email for new users
export async function sendWelcomeEmail({
  to,
  firstName,
}: {
  to: string;
  firstName: string;
}) {
  return await sendEmail({
    to,
    subject: "Welcome to Helen's Beauty Secret!",
    react: WelcomeEmail({
      firstName,
    }),
  });
}

// Shipping confirmation email
export async function sendShippingConfirmationEmail({
  to,
  orderNumber,
  customerName,
  trackingNumber,
  carrier,
  estimatedDelivery,
  items,
  shippingAddress,
}: {
  to: string;
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
    image?: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}) {
  return await sendEmail({
    to,
    subject: `Your Order is on the Way! - ${orderNumber}`,
    react: ShippingConfirmationEmail({
      orderNumber,
      customerName,
      trackingNumber,
      carrier,
      estimatedDelivery,
      items,
      shippingAddress,
    }),
  });
}

// Generic notification email
export async function sendNotificationEmail({
  to,
  subject,
  message,
  actionUrl,
  actionText,
}: {
  to: string;
  subject: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}) {
  const NotificationEmail = () => {
    return React.createElement(
      "div",
      {
        style: {
          fontFamily: "Arial, sans-serif",
          maxWidth: "600px",
          margin: "0 auto",
        },
      },
      React.createElement(
        "h2",
        { style: { color: "#16a34a" } },
        "Helen's Beauty Secret",
      ),
      React.createElement("p", null, message),
      actionUrl &&
        actionText &&
        React.createElement(
          "a",
          {
            href: actionUrl,
            style: {
              backgroundColor: "#16a34a",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              display: "inline-block",
              marginTop: "16px",
            },
          },
          actionText,
        ),
    );
  };

  return await sendEmail({
    to,
    subject,
    react: NotificationEmail(),
  });
}
