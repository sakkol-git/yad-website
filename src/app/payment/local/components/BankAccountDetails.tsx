interface BankAccountDetailsProps {
  copiedField: string | null;
  copyToClipboard: (text: string, fieldName: string) => void;
}

export function BankAccountDetails({ copiedField, copyToClipboard }: BankAccountDetailsProps) {
  return (
    <div className="w-full bg-transparent border border-outline-variant/50 rounded-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-4xl text-primary">
          account_balance
        </span>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-on-surface mb-1">
            ABA Bank Transfer
          </h4>
          <p className="text-xs font-light text-on-surface-variant">
            Perform a direct local bank transfer
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Bank Name */}
        <div className="p-4 bg-transparent rounded-md border border-outline-variant/30 flex justify-between items-center">
          <div>
            <span className="kicker-label block text-on-surface-variant mb-1">
              Bank Name
            </span>
            <span className="text-sm font-light text-on-surface">ABA Bank</span>
          </div>
          <button
            onClick={() => copyToClipboard("ABA Bank", "bank")}
            className="text-primary hover:text-primary/80 p-1 flex items-center transition-colors cursor-pointer"
            title="Copy Bank Name"
          >
            <span className="material-symbols-outlined text-xl">
              {copiedField === "bank" ? "check" : "content_copy"}
            </span>
          </button>
        </div>

        {/* Account Name */}
        <div className="p-4 bg-transparent rounded-md border border-outline-variant/30 flex justify-between items-center">
          <div>
            <span className="kicker-label block text-on-surface-variant mb-1">
              Account Name
            </span>
            <span className="text-sm font-light text-on-surface">
              YAD CAMBODIA ASSOCIATION
            </span>
          </div>
          <button
            onClick={() => copyToClipboard("YAD CAMBODIA ASSOCIATION", "name")}
            className="text-primary hover:text-primary/80 p-1 flex items-center transition-colors cursor-pointer"
            title="Copy Account Name"
          >
            <span className="material-symbols-outlined text-xl">
              {copiedField === "name" ? "check" : "content_copy"}
            </span>
          </button>
        </div>

        {/* Account Number */}
        <div className="p-4 bg-transparent rounded-md border border-outline-variant/30 flex justify-between items-center">
          <div>
            <span className="kicker-label block text-on-surface-variant mb-1">
              Account Number
            </span>
            <span className="text-lg font-mono font-light text-on-surface tracking-widest">
              000 123 456
            </span>
          </div>
          <button
            onClick={() => copyToClipboard("000123456", "number")}
            className="text-primary hover:text-primary/80 p-1 flex items-center transition-colors cursor-pointer"
            title="Copy Account Number"
          >
            <span className="material-symbols-outlined text-xl">
              {copiedField === "number" ? "check" : "content_copy"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
