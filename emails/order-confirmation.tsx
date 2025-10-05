import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
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

export const OrderConfirmationEmail = ({
  orderNumber,
  customerName,
  orderDate,
  total,
  currency,
  items,
  shippingAddress,
  deliveryMethod,
}: OrderConfirmationEmailProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  return (
    <Html>
      <Head />
      <Preview>Order Confirmation - {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://helensbeautysecret.com/logo.png"
              width="120"
              height="40"
              alt="Helen's Beauty Secret"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Order Confirmed! 🎉</Heading>

            <Text style={text}>Hi {customerName},</Text>

            <Text style={text}>
              Thank you for your order! We're excited to prepare your organic
              skincare products for you.
            </Text>

            {/* Order Details */}
            <Section style={orderDetails}>
              <Heading style={h2}>Order Details</Heading>
              <Row style={row}>
                <Column style={column}>
                  <Text style={label}>Order Number:</Text>
                </Column>
                <Column style={column}>
                  <Text style={value}>#{orderNumber}</Text>
                </Column>
              </Row>
              <Row style={row}>
                <Column style={column}>
                  <Text style={label}>Order Date:</Text>
                </Column>
                <Column style={column}>
                  <Text style={value}>{orderDate}</Text>
                </Column>
              </Row>
              <Row style={row}>
                <Column style={column}>
                  <Text style={label}>Total:</Text>
                </Column>
                <Column style={column}>
                  <Text style={value}>{formatPrice(total)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Items */}
            <Section style={itemsSection}>
              <Heading style={h2}>Items Ordered</Heading>
              {items.map((item, index) => (
                <Row key={index} style={itemRow}>
                  <Column style={itemColumn}>
                    <Text style={itemName}>{item.name}</Text>
                    <Text style={itemDetails}>
                      Quantity: {item.quantity} × {formatPrice(item.price)}
                    </Text>
                  </Column>
                  <Column style={itemColumn}>
                    <Text style={itemTotal}>
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>

            {/* Shipping Address */}
            <Section style={shippingSection}>
              <Heading style={h2}>Shipping Address</Heading>
              <Text style={address}>
                {shippingAddress.firstName} {shippingAddress.lastName}
                <br />
                {shippingAddress.address1}
                {shippingAddress.address2 && (
                  <>
                    <br />
                    {shippingAddress.address2}
                  </>
                )}
                <br />
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.postalCode}
                <br />
                {shippingAddress.country}
              </Text>
            </Section>

            {/* Delivery Method */}
            {deliveryMethod && (
              <Section style={deliverySection}>
                <Heading style={h2}>Delivery Method</Heading>
                <Text style={text}>
                  <strong>{deliveryMethod.name}</strong>
                  <br />
                  Estimated delivery: {deliveryMethod.estimatedDays}
                </Text>
              </Section>
            )}

            <Hr style={hr} />

            {/* Next Steps */}
            <Section style={nextSteps}>
              <Heading style={h2}>What's Next?</Heading>
              <Text style={text}>
                • You'll receive a shipping confirmation email once your order
                is dispatched
                <br />• Track your order status in your{" "}
                <Link
                  href="https://helensbeautysecret.com/dashboard"
                  style={link}
                >
                  dashboard
                </Link>
                <br />• Questions? Contact us at{" "}
                <Link href="mailto:support@helensbeautysecret.com" style={link}>
                  support@helensbeautysecret.com
                </Link>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Thank you for choosing Helen's Beauty Secret!
              <br />
              Transform your skin naturally with our premium organic skincare.
            </Text>
            <Text style={footerText}>
              <Link href="https://helensbeautysecret.com" style={link}>
                helensbeautysecret.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const header = {
  padding: "32px 24px 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const content = {
  padding: "0 24px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0 20px",
  padding: "0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "30px 0 15px",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const orderDetails = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  margin: "8px 0",
};

const column = {
  flex: "1",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const value = {
  color: "#333",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
  textAlign: "right" as const,
};

const itemsSection = {
  margin: "20px 0",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};

const itemColumn = {
  flex: "1",
};

const itemName = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "500",
  margin: "0 0 4px",
};

const itemDetails = {
  color: "#666",
  fontSize: "14px",
  margin: "0",
};

const itemTotal = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
  textAlign: "right" as const,
};

const shippingSection = {
  margin: "20px 0",
};

const address = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
};

const deliverySection = {
  margin: "20px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const nextSteps = {
  margin: "20px 0",
};

const link = {
  color: "#2754e6",
  textDecoration: "underline",
};

const footer = {
  padding: "0 24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "16px 0",
};

export default OrderConfirmationEmail;
