import type { Metadata } from "next";
import { getPaymentTargetAction } from "@/server/actions/payment.actions";
import { redirect } from "next/navigation";
import { PaymentSelectorClient } from "./PaymentSelectorClient";

export const metadata: Metadata = {
  title: "Secure Payment Options | YAD Cambodia",
  description: "Select your preferred payment method to complete your payment.",
};

interface PaymentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
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

  // If already completed/confirmed, redirect directly to success
  if (paymentDetails.status === "Completed" || paymentDetails.status === "Confirmed") {
    redirect(`/payment/success?id=${id}&type=${type}`);
  }

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20">
      <PaymentSelectorClient paymentDetails={paymentDetails} />
    </main>
  );
}
