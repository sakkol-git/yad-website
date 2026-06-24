interface ProgressIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "Payment" },
    { id: 3, label: "Review" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center gap-2 md:gap-4 flex-1">
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-md-full flex items-center justify-center font-label-bold text-sm md:text-base transition-colors duration-200 ease-in-out ${
                    isCompleted
                      ? "bg-secondary text-on-secondary shadow-md"
                      : isActive
                      ? "bg-primary text-on-primary ring-4 ring-primary/20 shadow-lg scale-110"
                      : "bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-sm md:text-base">check</span>
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`font-label-bold text-sm md:text-base hidden sm:inline transition-colors duration-300 ${
                    isActive ? "text-primary" : isCompleted ? "text-secondary" : "text-on-surface-variant"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-grow rounded-md-full transition-colors duration-150 ${
                    isCompleted ? "bg-secondary" : "bg-surface-variant/50"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
