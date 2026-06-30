import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from "@react-email/components";

export interface DonationReceiptEmailProps {
  donorName: string;
  amount: number;
  currency: string;
  donationId: string;
  date: string;
  projectName: string;
  orgName: string;
}

export const DonationReceiptEmail = ({
  donorName,
  amount,
  currency,
  donationId,
  date,
  projectName,
  orgName,
}: DonationReceiptEmailProps) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);

  return (
    <Html>
      <Head />
      <Preview>Your donation receipt from {orgName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for your generosity!</Heading>

          <Text style={text}>Dear {donorName},</Text>
          <Text style={text}>
            We have received your donation to <strong>{projectName}</strong>. Your generosity
            directly funds youth empowerment programs in Cambodia.
          </Text>

          <Container style={receiptBox}>
            <Text style={receiptHeading}>Donation Receipt</Text>
            <Hr style={hr} />
            <Text style={receiptText}>
              <strong>Amount:</strong> {formattedAmount}
            </Text>
            <Text style={receiptText}>
              <strong>Date:</strong> {date}
            </Text>
            <Text style={receiptText}>
              <strong>Transaction ID:</strong> {donationId}
            </Text>
          </Container>

          <Text style={text}>This email serves as your official donation receipt.</Text>

          <Text style={disclaimer}>
            Tax deductibility varies by country — please consult your tax advisor. {orgName} does
            not issue tax receipts for international jurisdictions.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            {orgName}
            <br />
            Registration Number: [INSERT REGISTRATION NUMBER]
            <br />
            <Link href="https://yadcambodia.org" style={link}>
              yadcambodia.org
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default DonationReceiptEmail;

const main = {
  backgroundColor: "#f6f9f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const h1 = {
  color: "#416837", // Primary color
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#444743", // On-surface-variant
  fontSize: "16px",
  lineHeight: "24px",
};

const receiptBox = {
  background: "#f0fdf4", // Light green / surface-container
  borderRadius: "4px",
  padding: "24px",
  margin: "32px 0",
};

const receiptHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1a1c19",
  margin: "0 0 16px",
};

const receiptText = {
  fontSize: "14px",
  color: "#444743",
  margin: "8px 0",
};

const disclaimer = {
  fontSize: "12px",
  color: "#737970",
  lineHeight: "18px",
  marginTop: "32px",
  fontStyle: "italic",
};

const hr = {
  borderColor: "#e1e3de", // Surface-variant
  margin: "20px 0",
};

const footer = {
  color: "#737970",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center" as const,
};

const link = {
  color: "#416837",
  textDecoration: "underline",
};
