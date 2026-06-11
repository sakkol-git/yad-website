import type { Metadata } from "next";
import { getPaymentTargetAction } from "@/server/actions/payment.actions";
import { redirect } from "next/navigation";
import { StripePaymentClient } from "./StripePaymentClient";

export const metadata: Metadata = {
  title: "Secure Card Payment | YAD Cambodia",
  description: "Complete your payment securely via international credit or debit card.",
};

interface StripePaymentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StripePaymentPage({ searchParams }: StripePaymentPageProps) {
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
      <StripePaymentClient paymentDetails={paymentDetails} />
    </main>
  );
}
