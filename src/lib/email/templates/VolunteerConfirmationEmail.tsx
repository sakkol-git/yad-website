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

export interface VolunteerConfirmationEmailProps {
  volunteerName: string;
  submittedAt: string;
}

export const VolunteerConfirmationEmail = ({
  volunteerName,
  submittedAt,
}: VolunteerConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>We've received your volunteer interest!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Your Interest!</Heading>

          <Text style={text}>Hi {volunteerName},</Text>
          <Text style={text}>
            We've received your volunteer interest submission on {submittedAt}. Thank you for
            wanting to make an impact with Youth Advancement for Development (YAD) Cambodia!
          </Text>

          <Text style={text}>
            Our team will review your application and contact you within 5–7 business days to
            discuss next steps and how you can get involved.
          </Text>

          <Text style={text}>
            In the meantime, follow us on our social channels to see what we've been up to:
          </Text>

          <Text style={socialLinks}>
            <Link href="https://facebook.com/yadcambodia" style={link}>
              Facebook
            </Link>{" "}
            •{" "}
            <Link href="https://instagram.com/yadcambodia" style={link}>
              Instagram
            </Link>{" "}
            •{" "}
            <Link href="https://linkedin.com/company/yadcambodia" style={link}>
              LinkedIn
            </Link>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Youth Advancement for Development Cambodia
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

export default VolunteerConfirmationEmail;

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
  color: "#416837",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#444743",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "16px",
};

const socialLinks = {
  color: "#444743",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "32px",
};

const hr = {
  borderColor: "#e1e3de",
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
