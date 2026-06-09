export function ProgressIndicator() {
  return (
    <div className="w-full max-w-3xl mx-auto mb-16">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container rounded-full z-0" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary rounded-full z-0 transition-all duration-500" />
        {/* Step 1: Details (Completed) */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-bold text-label-bold shadow-md">
            <span className="material-symbols-outlined icon-fill text-xl">check</span>
          </div>
          <span className="font-label-bold text-label-bold text-secondary">Details</span>
        </div>
        {/* Step 2: Payment (Completed) */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-bold text-label-bold shadow-md">
            <span className="material-symbols-outlined icon-fill text-xl">check</span>
          </div>
          <span className="font-label-bold text-label-bold text-secondary">Payment</span>
        </div>
        {/* Step 3: Review (Active) */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-surface border-4 border-secondary text-secondary flex items-center justify-center font-label-bold text-label-bold shadow-lg scale-110">
            3
          </div>
          <span className="font-label-bold text-label-bold text-on-surface">Review</span>
        </div>
      </div>
    </div>
  );
}
