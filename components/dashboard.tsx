"use client"

import { useState, useEffect } from "react"
import WaterIntake from "./water-intake"
import HistoryView from "./history-view"
import NavigationBar from "./navigation-bar"

export default function Dashboard() {
  const [dailyGoal, setDailyGoal] = useState(2000)
  const [activeTab, setActiveTab] = useState<"today" | "history">("today")
  const [intakes, setIntakes] = useState<Array<{ id: string; amount: number; time: string }>>([])

  useEffect(() => {
    const savedGoal = localStorage.getItem("dailyGoal")
    if (savedGoal) {
      setDailyGoal(Number.parseInt(savedGoal))
    }

    const savedIntakes = localStorage.getItem("intakes")
    if (savedIntakes) {
      setIntakes(JSON.parse(savedIntakes))
    }
  }, [])

  const totalIntake = intakes.reduce((sum, intake) => sum + intake.amount, 0)
  const progress = Math.min((totalIntake / dailyGoal) * 100, 100)

  const addIntake = (amount: number) => {
    const newIntake = {
      id: Date.now().toString(),
      amount,
      time: new Date().toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }),
    }
    const updatedIntakes = [newIntake, ...intakes]
    setIntakes(updatedIntakes)
    localStorage.setItem("intakes", JSON.stringify(updatedIntakes))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "today" ? (
          <WaterIntake
            dailyGoal={dailyGoal}
            totalIntake={totalIntake}
            progress={progress}
            intakes={intakes}
            onAddIntake={addIntake}
          />
        ) : (
          <HistoryView intakes={intakes} dailyGoal={dailyGoal} />
        )}
      </div>
      {/* Navigation Bar */}
      {console.log("[v0] Dashboard - activeTab:", activeTab, "intakes:", intakes)}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
