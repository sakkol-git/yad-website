interface KHQRProps {
  amount: number;
}

export function KHQR({ amount }: KHQRProps) {
  return (
    <div className="w-64 bg-red-600 rounded-md p-4 shadow-xl border-4 border-red-700 flex flex-col items-center select-none text-white relative">
      {/* bg-red-600/border-red-700: Intentional KHQR national payment standard brand colors — not a design-token violation */}
      {/* KHQR Header Banner */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] font-bold tracking-widest bg-on-primary text-primary px-1.5 py-0.5 rounded-sm">
          KHQR
        </span>
        <span className="text-[9px] font-semibold opacity-95 text-right">
          Cambodian Unified QR
        </span>
      </div>

      {/* QR Image Area */}
      <div className="w-full bg-white rounded-md p-3 flex flex-col items-center shadow-inner relative">
        <svg viewBox="0 0 100 100" className="w-44 h-44 text-on-surface">
          {/* Stylized QR Code Mock */}
          <rect width="100" height="100" fill="white" />
          {/* Corners */}
          <rect x="5" y="5" width="25" height="25" fill="currentColor" />
          <rect x="8" y="8" width="19" height="19" fill="white" />
          <rect x="11" y="11" width="13" height="13" fill="currentColor" />

          <rect x="70" y="5" width="25" height="25" fill="currentColor" />
          <rect x="73" y="8" width="19" height="19" fill="white" />
          <rect x="76" y="11" width="13" height="13" fill="currentColor" />

          <rect x="5" y="70" width="25" height="25" fill="currentColor" />
          <rect x="8" y="73" width="19" height="19" fill="white" />
          <rect x="11" y="76" width="13" height="13" fill="currentColor" />

          {/* Small Bottom Right Position Finder */}
          <rect x="75" y="75" width="10" height="10" fill="currentColor" />

          {/* Random Mock QR Pixels */}
          <path
            d="M 35 10 h 5 v 5 h -5 z M 45 5 h 5 v 5 h -5 z M 55 10 h 10 v 5 h -10 z M 40 20 h 10 v 10 h -10 z M 5 35 h 10 v 5 h -10 z M 20 40 h 5 v 5 h -5 z M 30 35 h 5 v 15 h -5 z M 40 45 h 15 v 5 h -15 z M 65 35 h 10 v 5 h -10 z M 85 35 h 10 v 5 h -10 z M 55 45 h 5 v 15 h -5 z M 10 50 h 10 v 5 h -10 z M 25 55 h 5 v 10 h -5 z M 35 60 h 15 v 5 h -15 z M 65 55 h 10 v 10 h -10 z M 80 50 h 15 v 5 h -15 z M 85 65 h 10 v 10 h -10 z M 45 75 h 5 v 10 h -5 z M 55 75 h 10 v 5 h -10 z M 35 85 h 15 v 5 h -15 z"
            fill="currentColor"
          />

          {/* Bakong stylization center logo */}
          <rect x="42" y="42" width="16" height="16" rx="3" fill="#E11D48" />
          <circle cx="50" cy="50" r="5" fill="white" />
        </svg>

        {/* Amount Banner */}
        <div className="mt-3 w-full bg-surface-container-low border border-outline-variant/30 py-1.5 rounded-md text-center">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
            Amount to Scan
          </span>
          <span className="text-[17px] font-bold text-on-surface">
            USD {amount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* KHQR Footer Label */}
      <div className="mt-3 text-center">
        <p className="text-xs font-bold text-white tracking-wide">
          YAD CAMBODIA ASSOCIATION
        </p>
        <p className="text-[9px] opacity-80 mt-0.5">Scan with any banking app</p>
      </div>
    </div>
  );
}
