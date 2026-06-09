export type PaymentMethod = "card" | "khqr";

export interface DonationAmount {
  value: number;
  label: string;
  isPopular?: boolean;
}
