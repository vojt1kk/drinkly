"use client"

import type React from "react"

import { useState } from "react"
import AddWaterModal from "./add-water-modal"

interface WaterIntakeProps {
  dailyGoal: number
  totalIntake: number
  progress: number
  intakes: Array<{ id: string; amount: number; time: string }>
  onAddIntake: (amount: number) => void
}

export default function WaterIntake({ dailyGoal, totalIntake, progress, intakes, onAddIntake }: WaterIntakeProps) {
  const [showModal, setShowModal] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const remaining = Math.max(0, dailyGoal - totalIntake)

  const snapToNearest50 = (value: number): number => {
    return Math.round(value / 50) * 50
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    const snappedValue = snapToNearest50(newValue)
    setSliderValue(snappedValue)
  }

  const handleDrinkClick = () => {
    if (sliderValue > 0) {
      onAddIntake(sliderValue)
      setSliderValue(0)
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 py-8">
        <div className="w-full max-w-xs space-y-8 text-center">
          {/* Drink Button Circle */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleDrinkClick}
              className="flex flex-col items-center justify-center rounded-full bg-accent shadow-lg transition-transform hover:scale-105 active:scale-95 w-[250px] h-[250px]"
            >
              <span className="font-bold text-accent-foreground leading-7 text-7xl">Drink</span>
            </button>
          </div>

          {/* Slider Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <input
                type="range"
                min="0"
                max={dailyGoal}
                value={sliderValue}
                onChange={handleSliderChange}
                className="flex-1 h-2 bg-primary-foreground/30 rounded-lg appearance-none cursor-pointer accent-primary-foreground slider"
              />
              <div className="text-right min-w-16">
                <div className="text-lg font-semibold text-primary-foreground">{sliderValue}</div>
                <div className="text-xs text-primary-foreground/80">ml</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3 rounded-2xl p-6 bg-secondary px-6">
            <div className="text-2xl font-bold text-primary-foreground">
              You drank {(totalIntake / 1000).toFixed(2)} liters today.
            </div>
            <div className="text-sm text-primary-foreground/80">
              {remaining > 0 ? `${(remaining / 1000).toFixed(2)} L remaining` : "Daily goal reached!"}
            </div>
          </div>

          {/* Today's Intakes */}
          {intakes.length > 0 && (
            <div className="space-y-3 text-left mt-7">
              <h3 className="text-sm font-semibold text-primary-foreground mb-4">Today's intake</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {intakes.map((intake) => (
                  <div
                    key={intake.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary opacity-80 py-2.5"
                  >
                    <div>
                      <div className="font-semibold text-primary-foreground">{intake.amount} ml</div>
                      <div className="text-xs text-primary-foreground/70">{intake.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        input[type="range"].slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        input[type="range"].slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          border: none;
        }
      `}</style>

      <AddWaterModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={onAddIntake} />
    </>
  )
}
