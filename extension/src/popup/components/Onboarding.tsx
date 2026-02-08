import React, { useState } from 'react';
import { setOnboardingComplete } from '@/lib/storage';
import type { OnboardingStep } from '@/types';

interface OnboardingProps {
  onComplete: () => void;
}

const STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Share Access, Not Passwords',
    description:
      'CookiePass lets you share authenticated sessions securely. No need to reveal your actual passwords.',
    icon: '🔐',
  },
  {
    id: 2,
    title: 'Encrypted & Temporary',
    description:
      'All data is encrypted client-side with AES-256-GCM. Set expiration times and use limits for full control.',
    icon: '🛡️',
  },
  {
    id: 3,
    title: 'Revoke Anytime',
    description:
      'Changed your mind? Revoke any share instantly. The recipient will lose access immediately.',
    icon: '⚡',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await setOnboardingComplete();
      onComplete();
    }
  };

  const handleSkip = async () => {
    await setOnboardingComplete();
    onComplete();
  };

  const step = STEPS[currentStep];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-surface-900 p-6">
      {/* Skip */}
      <div className="flex justify-end">
        <button onClick={handleSkip} className="text-xs text-surface-400 hover:text-surface-600">
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in" key={step.id}>
        <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-4xl">{step.icon}</span>
        </div>
        <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
          {step.title}
        </h2>
        <p className="text-sm text-surface-500 max-w-[280px] leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Progress & Nav */}
      <div className="space-y-4">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all
                ${i === currentStep
                  ? 'w-6 bg-primary-500'
                  : i < currentStep
                  ? 'bg-primary-300'
                  : 'bg-surface-200 dark:bg-surface-700'
                }`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="btn-primary w-full">
          {currentStep < STEPS.length - 1 ? 'Next' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}
