import type { Metadata } from "next";
import { getPaymentTargetAction } from "@/server/actions/payment.actions";
import { redirect } from "next/navigation";
import { LocalPaymentClient } from "./LocalPaymentClient";

export const metadata: Metadata = {
  title: "Local Cambodian Payment | YAD Cambodia",
  description: "Complete your payment via Bakong KHQR or local bank transfer.",
};

interface LocalPaymentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LocalPaymentPage({ searchParams }: LocalPaymentPageProps) {
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams.id as string;
  const type = resolvedSearchParams.type as "donation" | "booking";

  if (!id || !type || (type !== "donation" && type !== "booking")) {
    redirect("/");
  }

  const res = await getPaymentTargetAction(id, type);
  if (!res.success || !res.data) {
    redirect(`/?error=Payment+target+not+found`);
  }

  const paymentDetails = res.data;

  // If already completed, redirect directly to success
  if (paymentDetails.status === "Completed" || paymentDetails.status === "Confirmed") {
    redirect(`/payment/success?id=${id}&type=${type}`);
  }

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20">
      <LocalPaymentClient paymentDetails={paymentDetails} />
    </main>
  );
}
