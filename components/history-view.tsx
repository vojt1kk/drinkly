"use client"

import { Card } from "@/components/ui/card"

interface HistoryViewProps {
  intakes: Array<{ id: string; amount: number; time: string }>
  dailyGoal: number
}

export default function HistoryView({ intakes, dailyGoal }: HistoryViewProps) {
  const totalIntake = intakes.reduce((sum, intake) => sum + intake.amount, 0)

  const sortedIntakes = [...intakes].reverse()

  return (
    <div className="px-4 py-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Historie</h2>

      {intakes.length > 0 ? (
        <>
          <Card className="border-2 border-border p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-foreground font-semibold">Dnes jsi vypil</p>
            <p className="mt-2 text-2xl font-bold text-primary">{(totalIntake / 1000).toFixed(2)} L</p>
          </Card>

          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-foreground mb-3">Dneší příjmy vody</h3>
            {sortedIntakes.map((intake) => (
              <div key={intake.id} className="rounded-lg border-2 border-border bg-card p-4">
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">{intake.time}</div>
                  <div className="font-semibold text-primary">{intake.amount} ml</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border-2 border-border bg-card p-4">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Celkem dnes</div>
                <div className="font-semibold text-primary">{(totalIntake / 1000).toFixed(2)} L</div>
              </div>
            </div>

            <div className="rounded-lg border-2 border-border bg-card p-4">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Zbývá do cíle</div>
                <div className="font-semibold text-primary">
                  {(Math.max(0, dailyGoal - totalIntake) / 1000).toFixed(2)} L
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Card className="border-2 border-border p-6 text-center">
          <div className="text-4xl mb-4">💧</div>
          <p className="text-foreground font-semibold">Zatím jsi nic nepil</p>
          <p className="mt-2 text-sm text-muted-foreground">Vrať se na hlavní stránku a přidej vodu</p>
        </Card>
      )}
    </div>
  )
}
