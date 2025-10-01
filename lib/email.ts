import { Resend } from "resend";
import { render } from "@react-email/render";
import OrderConfirmationEmail from "@/emails/order-confirmation";
import ShippingConfirmationEmail from "@/emails/shipping-confirmation";
import WelcomeEmail from "@/emails/welcome";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export interface OrderConfirmationData {
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
}

export interface ShippingConfirmationData {
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
}

export interface WelcomeEmailData {
  customerName: string;
  customerEmail: string;
}

// Send order confirmation email
export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  try {
    const emailHtml = render(OrderConfirmationEmail(data));
    
    const { data: result, error } = await resend.emails.send({
      from: "Helen's Beauty Secret <orders@helensbeautysecret.com>",
      to: [data.customerEmail],
      subject: `Order Confirmation - #${data.orderNumber}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending order confirmation email:", error);
      return { success: false, error };
    }

    console.log("Order confirmation email sent:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return { success: false, error };
  }
}

// Send shipping confirmation email
export async function sendShippingConfirmationEmail(data: ShippingConfirmationData) {
  try {
    const emailHtml = render(ShippingConfirmationEmail(data));
    
    const { data: result, error } = await resend.emails.send({
      from: "Helen's Beauty Secret <shipping@helensbeautysecret.com>",
      to: [data.customerEmail],
      subject: `Your Order #${data.orderNumber} Has Shipped!`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending shipping confirmation email:", error);
      return { success: false, error };
    }

    console.log("Shipping confirmation email sent:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending shipping confirmation email:", error);
    return { success: false, error };
  }
}

// Send welcome email
export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const emailHtml = render(WelcomeEmail(data));
    
    const { data: result, error } = await resend.emails.send({
      from: "Helen's Beauty Secret <welcome@helensbeautysecret.com>",
      to: [data.customerEmail],
      subject: "Welcome to Helen's Beauty Secret! 🌿",
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }

    console.log("Welcome email sent:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: "Helen's Beauty Secret <security@helensbeautysecret.com>",
      to: [email],
      subject: "Reset Your Password - Helen's Beauty Secret",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Reset Your Password</h1>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <a href="${resetLink}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending password reset email:", error);
      return { success: false, error };
    }

    console.log("Password reset email sent:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error };
  }
}

// Send order status update email
export async function sendOrderStatusUpdateEmail(
  email: string,
  orderNumber: string,
  status: string,
  customerName: string
) {
  try {
    const statusMessages = {
      processing: "Your order is being prepared for shipment.",
      shipped: "Your order has been shipped and is on its way!",
      delivered: "Your order has been delivered successfully.",
      cancelled: "Your order has been cancelled.",
    };

    const message = statusMessages[status as keyof typeof statusMessages] || "Your order status has been updated.";

    const { data: result, error } = await resend.emails.send({
      from: "Helen's Beauty Secret <orders@helensbeautysecret.com>",
      to: [email],
      subject: `Order #${orderNumber} Status Update`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Order Status Update</h1>
          <p>Hi ${customerName},</p>
          <p>Your order #${orderNumber} status has been updated to: <strong>${status}</strong></p>
          <p>${message}</p>
          <a href="https://helensbeautysecret.com/dashboard" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Order Details
          </a>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending order status update email:", error);
      return { success: false, error };
    }

    console.log("Order status update email sent:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending order status update email:", error);
    return { success: false, error };
  }
}
