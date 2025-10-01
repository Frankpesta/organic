import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  customerName: string;
  customerEmail: string;
}

export const WelcomeEmail = ({
  customerName,
  customerEmail,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Helen's Beauty Secret!</Preview>
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
            <Heading style={h1}>Welcome to Helen's Beauty Secret! 🌿</Heading>
            
            <Text style={text}>
              Hi {customerName},
            </Text>
            
            <Text style={text}>
              Welcome to our community of beauty enthusiasts who believe in the power of organic skincare! 
              We're thrilled to have you join us on this journey to healthier, more radiant skin.
            </Text>

            {/* Benefits Section */}
            <Section style={benefitsSection}>
              <Heading style={h2}>What You'll Love About Us</Heading>
              
              <Text style={benefitItem}>
                🌱 <strong>100% Organic Ingredients</strong> - Pure, natural ingredients that your skin will love
              </Text>
              
              <Text style={benefitItem}>
                🚚 <strong>Free Worldwide Shipping</strong> - On orders over $50, delivered right to your door
              </Text>
              
              <Text style={benefitItem}>
                💚 <strong>Cruelty-Free & Sustainable</strong> - Ethical beauty that cares for you and the planet
              </Text>
              
              <Text style={benefitItem}>
                ⭐ <strong>30-Day Satisfaction Guarantee</strong> - Love your products or get a full refund
              </Text>
            </Section>

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Button
                href="https://helensbeautysecret.com/shop"
                style={ctaButton}
              >
                Start Shopping
              </Button>
            </Section>

            {/* Special Offer */}
            <Section style={offerSection}>
              <Heading style={h2}>Special Welcome Offer</Heading>
              <Text style={offerText}>
                As a new member, enjoy <strong>15% off your first order</strong>! 
                Use code <strong>WELCOME15</strong> at checkout.
              </Text>
              <Text style={offerExpiry}>
                *Valid for 30 days from signup
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Getting Started */}
            <Section style={gettingStartedSection}>
              <Heading style={h2}>Getting Started</Heading>
              <Text style={text}>
                • <strong>Explore our products</strong> - Browse our curated collection of organic skincare
                <br />
                • <strong>Take our skin quiz</strong> - Get personalized product recommendations
                <br />
                • <strong>Follow us on social</strong> - Stay updated with beauty tips and new launches
                <br />
                • <strong>Join our community</strong> - Connect with other beauty enthusiasts
              </Text>
            </Section>

            {/* Social Links */}
            <Section style={socialSection}>
              <Text style={socialText}>Follow us for daily beauty inspiration:</Text>
              <Text style={socialLinks}>
                <Link href="https://instagram.com/helensbeautysecret" style={socialLink}>
                  Instagram
                </Link>
                {" • "}
                <Link href="https://facebook.com/helensbeautysecret" style={socialLink}>
                  Facebook
                </Link>
                {" • "}
                <Link href="https://twitter.com/helensbeautysecret" style={socialLink}>
                  Twitter
                </Link>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? We're here to help!
              <br />
              Email us at{" "}
              <Link href="mailto:support@helensbeautysecret.com" style={link}>
                support@helensbeautysecret.com
              </Link>
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
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
  fontSize: "28px",
  fontWeight: "bold",
  margin: "40px 0 20px",
  padding: "0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#333",
  fontSize: "20px",
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

const benefitsSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const benefitItem = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "12px 0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const ctaButton = {
  backgroundColor: "#22c55e",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const offerSection = {
  backgroundColor: "#e8f5e8",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const offerText = {
  color: "#333",
  fontSize: "18px",
  lineHeight: "26px",
  margin: "0 0 8px",
  fontWeight: "500",
};

const offerExpiry = {
  color: "#666",
  fontSize: "14px",
  margin: "0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "24px 0",
};

const gettingStartedSection = {
  margin: "24px 0",
};

const socialSection = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const socialText = {
  color: "#666",
  fontSize: "16px",
  margin: "0 0 12px",
};

const socialLinks = {
  color: "#333",
  fontSize: "16px",
  margin: "0",
};

const socialLink = {
  color: "#2754e6",
  textDecoration: "underline",
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

export default WelcomeEmail;
