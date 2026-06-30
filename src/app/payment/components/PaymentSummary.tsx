import { GenericPaymentDetails } from "@/server/actions/payment.actions";
import { ReactNode } from "react";

interface PaymentSummaryProps {
  paymentDetails: GenericPaymentDetails;
  children?: ReactNode;
}

export function PaymentSummary({ paymentDetails, children }: PaymentSummaryProps) {
  const { name, email, amount, description } = paymentDetails;

  return (
    <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
      <div className="sticky top-24 bg-surface rounded-md p-8 border border-outline-variant/30 relative overflow-hidden">
        <h3 className="text-2xl font-light text-on-surface tracking-tight mb-6 relative z-10 border-b border-outline-variant/30 pb-4">
          Payment Summary
        </h3>

        <div className="space-y-4 mb-8 relative z-10 text-sm font-light text-on-surface-variant leading-relaxed">
          <div className="flex justify-between items-center">
            <span className="kicker-label">Description</span>
            <span className="font-light text-on-surface text-right">{description}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="kicker-label">Name</span>
            <span className="font-light text-on-surface text-right">{name}</span>
          </div>
          {email && (
            <div className="flex justify-between items-center">
              <span className="kicker-label">Email</span>
              <span className="font-light text-on-surface text-right break-all">{email}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-end mb-8 relative z-10 pt-6 border-t border-outline-variant/30">
          <span className="kicker-label text-on-surface-variant mb-2">
            Total Amount
          </span>
          <span className="text-[3.5rem] font-light text-primary tracking-tighter leading-none">
            ${amount.toFixed(2)}
          </span>
        </div>

        {children && <div className="space-y-4 relative z-10">{children}</div>}
      </div>
    </div>
  );
}
