import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DonateSuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id as string;
  const donationId = resolvedSearchParams.id as string;

  if (sessionId) {
    redirect(`/payment/success?session_id=${sessionId}`);
  } else if (donationId) {
    redirect(`/payment/success?id=${donationId}&type=donation`);
  } else {
    redirect("/");
  }
}
