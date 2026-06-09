import type { Metadata } from "next";
import { ProgressIndicator } from "@/features/donate/components/ProgressIndicator";
import { ReviewSummary } from "@/features/donate/components/ReviewSummary";

export const metadata: Metadata = {
  title: "Review",
  description: "Review your donation details before completing your contribution to YAD.",
};

export default function DonateReviewPage() {
  return (
    <main className="max-w-container-max mx-auto px-gutter md:px-margin-desktop pt-32 pb-20">
      <ProgressIndicator currentStep={3} />
      <ReviewSummary />
    </main>
  );
}
