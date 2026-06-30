import { GenericPaymentDetails } from "@/server/actions/payment.actions";

interface PaymentSummaryProps {
  paymentDetails: GenericPaymentDetails;
}

export function PaymentSummary({ paymentDetails }: PaymentSummaryProps) {
  const { name, email, amount, description } = paymentDetails;

  return (
    <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
      <div className="sticky top-24 bg-surface rounded-md p-8 border border-outline-variant/30 relative overflow-hidden">
        <h3 className="text-2xl font-light text-on-surface tracking-tight mb-6 relative z-10 border-b border-outline-variant/30 pb-4">
          Payment Summary
        </h3>

        <div className="space-y-4 mb-8 relative z-10 text-sm font-light text-on-surface-variant leading-relaxed">
          <div className="flex justify-between items-center">
            <span className="uppercase tracking-widest text-[10px] font-bold">Description</span>
            <span className="font-light text-on-surface text-right">{description}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="uppercase tracking-widest text-[10px] font-bold">Name</span>
            <span className="font-light text-on-surface text-right">{name}</span>
          </div>
          {email && (
            <div className="flex justify-between items-center">
              <span className="uppercase tracking-widest text-[10px] font-bold">Email</span>
              <span className="font-light text-on-surface text-right break-all">{email}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-end mb-8 relative z-10 pt-6 border-t border-outline-variant/30">
          <span className="uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">
            Total Amount
          </span>
          <span className="text-[3.5rem] font-light text-primary tracking-tighter leading-none">
            ${amount.toFixed(2)}
          </span>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-xl text-primary">info</span>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-bold text-on-surface mb-1">
                What Happens Next?
              </p>
              <p className="text-xs font-light text-on-surface-variant leading-relaxed mt-0.5">
                After submitting your Transaction ID, our financial team will verify it. This
                process typically takes under 2 hours. You will receive an official confirmation
                email once confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
