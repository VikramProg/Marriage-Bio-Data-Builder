import React from 'react';
import { useBioData } from '../../context/BioDataContext';
import StepIndicator from './StepIndicator';
import { ArrowRight, ArrowLeft, RefreshCcw, Home } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Steps
import Step1_Basic from './Step1_Basic';
import Step2_Details from './Step2_Details';
import Step3_Horoscope from './Step3_Horoscope';
import Step4_Education from './Step4_Education';
import Step5_Family from './Step5_Family';
import Step6_Contact from './Step6_Contact';
import Step7_Extra from './Step7_Extra';

const MultiStepForm = ({ onBackHome, onComplete }) => {
    const { state, dispatch, TYPES } = useBioData();
    const { step } = state;
    const TOTAL_STEPS = 7;

    const nextStep = () => {
        if (step === TOTAL_STEPS) {
            onComplete(); // Trigger transition to Final Review
        } else {
            dispatch({ type: TYPES.NEXT_STEP });
        }
    };

    const prevStep = () => dispatch({ type: TYPES.PREV_STEP });

    const reset = () => {
        if (window.confirm("Are you sure? This will clear all data.")) {
            dispatch({ type: TYPES.RESET });
        }
    };


    const renderStep = () => {
        switch (step) {
            case 1: return <Step1_Basic key="step1" />;
            case 2: return <Step2_Details key="step2" />;
            case 3: return <Step3_Horoscope key="step3" />;
            case 4: return <Step4_Education key="step4" />;
            case 5: return <Step5_Family key="step5" />;
            case 6: return <Step6_Contact key="step6" />;
            case 7: return <Step7_Extra key="step7" />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col h-full min-h-[500px]">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={onBackHome} className="text-gray-400 hover:text-blue-600 transition-colors" title="Back to Home">
                        <Home size={20} />
                    </button>
                    <button onClick={reset} className="text-xs text-red-400 flex items-center gap-1 hover:text-red-600 transition-colors">
                        <RefreshCcw size={12} /> Reset
                    </button>
                </div>
                <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
            </div>

            <div className="flex-grow relative">
                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200
            ${step === 1
                            ? 'opacity-0 cursor-default'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200"
                >
                    {step === TOTAL_STEPS ? 'Done' : 'Next'} <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default MultiStepForm;
