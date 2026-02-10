import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Hello there, darling!",
    message: "I'm Peach, your personal finance companion. Shall we get your household accounts in order?",
    buttonText: "Yes, please!",
  },
  {
    id: 2,
    title: "Track your pennies",
    message: "Log your spending with a quick chat. I'll keep everything organized in my ledger, just like the old days!",
    buttonText: "Sounds lovely!",
  },
  {
    id: 3,
    title: "Stay on budget",
    message: "I'll give you a gentle nudge when you're overspending. Think of me as your financially savvy friend!",
    buttonText: "Let's begin!",
  },
]

const OnboardingView = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const step = ONBOARDING_STEPS[currentStep]

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden">
      
      {/* Logo at top */}
      <div className="relative z-20 flex justify-center pt-8">
        <div className="bg-[#E8825C] rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🐷</span>
          </div>
          <span className="font-hand text-2xl text-white">Peach</span>
        </div>
      </div>

      {/* Floating Glass Card */}
      <div className="flex-1 flex items-center justify-center px-8 -mt-8">
        <div className="w-full max-w-sm glass rounded-3xl shadow-2xl border border-white/40 p-8">
          <h2 className="font-hand text-3xl text-charcoal text-center mb-4 leading-tight">
            {step.title}
          </h2>
          <p className="text-center text-charcoal/70 leading-relaxed text-base">
            {step.message}
          </p>
        </div>
      </div>

      {/* Peach Character at bottom */}
      <div className="relative z-10 flex justify-center -mt-4">
        <img
          src="/assets/happy_final.png"
          alt="Peach waving"
          className="w-48 h-48 object-contain drop-shadow-2xl"
        />
      </div>

      {/* CTA Button */}
      <div className="relative z-20 px-8 pb-12 -mt-8">
        <button
          onClick={handleNext}
          className="w-full bg-[#E8825C] hover:bg-[#D4714D] text-white 
            font-hand text-2xl py-4 px-8 rounded-full
            shadow-xl hover:shadow-2xl transition-all duration-200
            flex items-center justify-center gap-2"
        >
          {step.buttonText}
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Step dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {ONBOARDING_STEPS.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentStep ? 'bg-[#E8825C] w-6' : 'bg-charcoal/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default OnboardingView
