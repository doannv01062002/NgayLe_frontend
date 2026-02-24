interface RegisterStepperProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: "Thông tin Shop", icon: "store" },
  { id: 2, label: "Vận chuyển", icon: "local_shipping" },
  { id: 3, label: "Thuế & Định danh", icon: "badge" },
  { id: 4, label: "Hoàn tất", icon: "check_circle" },
];

export function RegisterStepper({ currentStep }: RegisterStepperProps) {
  return (
    <div className="mb-10 w-full overflow-x-auto pb-4 md:pb-0 font-sans">
      <div className="min-w-[600px] flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center gap-2 relative z-10 w-32 md:w-40">
                <div
                  className={`size-10 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-300
                    ${
                      isActive
                        ? "bg-primary text-white shadow-primary/30 ring-4 ring-white dark:ring-[#221010]"
                        : isCompleted
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-xl">
                      check
                    </span>
                  ) : isActive && step.icon ? (
                    <span className="material-symbols-outlined text-xl">
                      {step.icon}
                    </span>
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`text-sm font-bold transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.id}. {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="flex-grow h-[2px] bg-[#e5e7eb] mx-3 relative">
                  <div
                    className={`absolute top-0 left-0 h-full bg-green-500 transition-all duration-500`}
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
