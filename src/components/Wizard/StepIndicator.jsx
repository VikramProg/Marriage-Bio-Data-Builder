import React from 'react';

const StepIndicator = ({ currentStep, totalSteps, onStepSelect }) => {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;
                const isClickable = typeof onStepSelect === 'function';

                return (
                    <React.Fragment key={stepNum}>
                        <button
                            type="button"
                            onClick={() => isClickable && onStepSelect(stepNum)}
                            className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                                ${isActive
                                    ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--bg-color)]'
                                    : isCompleted
                                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                                        : 'border-[var(--border-color)] text-[var(--text-muted)] bg-transparent'
                                }
                                ${isClickable ? 'hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]' : ''}
                            `}
                            aria-current={isActive ? 'step' : undefined}
                            aria-label={`Go to step ${stepNum}`}
                        >
                            {stepNum}
                        </button>
                        {stepNum < totalSteps && (
                            <div className={`h-1 w-6 rounded flex-1 ${stepNum < currentStep ? 'bg-[var(--primary)]' : 'bg-[var(--border-color)]'}`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepIndicator;
