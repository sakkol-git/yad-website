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

export interface NewsletterWelcomeEmailProps {
  email: string;
}

export const NewsletterWelcomeEmail = ({ email }: NewsletterWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to YAD Cambodia updates!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You're on the list!</Heading>

          <Text style={text}>Hello,</Text>
          <Text style={text}>
            Thank you for subscribing to the Youth Advancement for Development (YAD) Cambodia
            newsletter.
          </Text>

          <Text style={text}>
            Expect updates on our programs, events, and the direct impact we are making in
            communities across Cambodia. We're excited to share our journey with you!
          </Text>

          <Text style={text}>
            If you have any questions or want to get involved right away, feel free to reply
            directly to this email or visit our website.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            This email was sent to {email}.<br />
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

export default NewsletterWelcomeEmail;

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
