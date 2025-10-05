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
    const result = await sendWelcomeEmail({ customerName, customerEmail });
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
    const result = await sendOrderConfirmationEmail(data);
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
