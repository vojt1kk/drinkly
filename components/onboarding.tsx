"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(2000)

  const steps = [
    {
      title: "Vítejte v HydroTrack",
      description: "Vaše osobní asistent pro sledování hydratace",
      content: (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="text-6xl">💧</div>
          <p className="text-center text-muted-foreground">
            Zůstaňte zdravě hydratovaní s jednoduchým sledováním příjmu vody
          </p>
        </div>
      ),
    },
    {
      title: "Nastavte svůj cíl",
      description: "Kolik ml vody chcete pít denně?",
      content: (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDailyGoal(Math.max(500, dailyGoal - 250))}
              className="rounded-full bg-secondary px-4 py-2 text-lg font-semibold text-secondary-foreground hover:bg-secondary/80"
            >
              −
            </button>
            <div className="w-32 text-center">
              <div className="text-5xl font-bold text-primary">{dailyGoal}</div>
              <div className="text-sm text-muted-foreground">ml</div>
            </div>
            <button
              onClick={() => setDailyGoal(dailyGoal + 250)}
              className="rounded-full bg-secondary px-4 py-2 text-lg font-semibold text-secondary-foreground hover:bg-secondary/80"
            >
              +
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Doporučeno: {Math.round((dailyGoal / 1000) * 10) / 10} litrů denně
          </p>
        </div>
      ),
    },
    {
      title: "Jste připraveni!",
      description: "Začněte sledovat svůj příjem vody",
      content: (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="text-6xl">✓</div>
          <Card className="w-full bg-secondary p-4">
            <p className="text-center font-semibold">
              Váš cíl: <span className="text-white">{dailyGoal} ml</span>
            </p>
          </Card>
          <p className="text-center text-sm text-muted-foreground">
            Dozvídejte se o svých návycích a zlepšujte svou hydrataci
          </p>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      localStorage.setItem("dailyGoal", dailyGoal.toString())
      onComplete()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">{steps[step].title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{steps[step].description}</p>
        </div>

        <Card className="mb-8 border-2 border-border p-6">{steps[step].content}</Card>

        <div className="mb-6 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-secondary"}`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full bg-primary py-6 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {step === steps.length - 1 ? "Začít" : "Další"}
        </Button>
      </div>
    </div>
  )
}
