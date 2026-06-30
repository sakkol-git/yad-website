import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Applications | YAD",
  description:
    "Apply for dormitory programs, scholarships, and youth development initiatives at YAD Cambodia.",
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
