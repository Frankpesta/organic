"use server";

import {
  sendOrderConfirmationEmail,
  sendShippingConfirmationEmail,
  sendWelcomeEmail,
} from "@/lib/services/emailService";

export async function sendWelcomeEmailAction(
  customerName: string,
  customerEmail: string,
) {
  try {
    const result = await sendWelcomeEmail({ 
      to: customerEmail, 
      firstName: customerName 
    });
    return { success: result.success, error: result.error };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: "Failed to send welcome email" };
  }
}

export async function sendOrderConfirmationEmailAction(data: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  total: number;
  currency: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
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
  deliveryMethod?: {
    name: string;
    estimatedDays: string;
  };
}) {
  try {
    const result = await sendOrderConfirmationEmail({
      to: data.customerEmail,
      orderNumber: data.orderNumber,
      customerName: data.customerName,
      orderDate: data.orderDate,
      items: data.items,
      subtotal: data.total * 0.85, // Estimate subtotal (85% of total)
      shipping: data.total * 0.10, // Estimate shipping (10% of total)
      tax: data.total * 0.05, // Estimate tax (5% of total)
      total: data.total,
      shippingAddress: data.shippingAddress,
      billingAddress: data.shippingAddress, // Use shipping address as billing for now
    });
    return { success: result.success, error: result.error };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return { success: false, error: "Failed to send order confirmation email" };
  }
}

export async function sendShippingConfirmationEmailAction(data: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
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
}) {
  try {
    const result = await sendShippingConfirmationEmail(data);
    return { success: result.success, error: result.error };
  } catch (error) {
    console.error("Error sending shipping confirmation email:", error);
    return {
      success: false,
      error: "Failed to send shipping confirmation email",
    };
  }
}
