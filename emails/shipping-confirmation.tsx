import {
  Body,
  Button,
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

interface ShippingConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
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

export const ShippingConfirmationEmail = ({
  orderNumber,
  customerName,
  trackingNumber,
  carrier,
  estimatedDelivery,
  items,
  shippingAddress,
}: ShippingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your order #{orderNumber} has shipped!</Preview>
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
            <Heading style={h1}>Your Order is on the Way! 📦</Heading>

            <Text style={text}>Hi {customerName},</Text>

            <Text style={text}>
              Great news! Your order #{orderNumber} has been shipped and is on
              its way to you.
            </Text>

            {/* Tracking Information */}
            {trackingNumber && (
              <Section style={trackingSection}>
                <Heading style={h2}>Tracking Information</Heading>
                <Text style={text}>
                  <strong>Tracking Number:</strong> {trackingNumber}
                  {carrier && (
                    <>
                      <br />
                      <strong>Carrier:</strong> {carrier}
                    </>
                  )}
                  <br />
                  <strong>Estimated Delivery:</strong> {estimatedDelivery}
                </Text>

                <Button
                  href={`https://www.google.com/search?q=${trackingNumber}`}
                  style={trackingButton}
                >
                  Track Your Package
                </Button>
              </Section>
            )}

            {/* Items Shipped */}
            <Section style={itemsSection}>
              <Heading style={h2}>Items Shipped</Heading>
              {items.map((item, index) => (
                <Row key={index} style={itemRow}>
                  <Column style={itemColumn}>
                    <Text style={itemName}>{item.name}</Text>
                    <Text style={itemDetails}>Quantity: {item.quantity}</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            {/* Shipping Address */}
            <Section style={shippingSection}>
              <Heading style={h2}>Delivery Address</Heading>
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

            <Hr style={hr} />

            {/* Next Steps */}
            <Section style={nextSteps}>
              <Heading style={h2}>What to Expect</Heading>
              <Text style={text}>
                • Your package will arrive within the estimated delivery time
                <br />• You'll receive delivery notifications from the carrier
                <br />• If you have any questions, contact us at{" "}
                <Link href="mailto:support@helensbeautysecret.com" style={link}>
                  support@helensbeautysecret.com
                </Link>
              </Text>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Button
                href="https://helensbeautysecret.com/dashboard"
                style={ctaButton}
              >
                View Order Status
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Thank you for choosing Helen's Beauty Secret!
              <br />
              We hope you love your new organic skincare products.
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

const trackingSection = {
  backgroundColor: "#e8f5e8",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
  textAlign: "center" as const,
};

const trackingButton = {
  backgroundColor: "#22c55e",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "16px 0 0",
};

const itemsSection = {
  margin: "20px 0",
};

const itemRow = {
  display: "flex",
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

const shippingSection = {
  margin: "20px 0",
};

const address = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const nextSteps = {
  margin: "20px 0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const ctaButton = {
  backgroundColor: "#2754e6",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
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

export default ShippingConfirmationEmail;
