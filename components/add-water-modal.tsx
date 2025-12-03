"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AddWaterModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (amount: number) => void
}

export default function AddWaterModal({ isOpen, onClose, onAdd }: AddWaterModalProps) {
  const [amount, setAmount] = useState(250)

  const handleAdd = () => {
    onAdd(amount)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="w-full rounded-t-2xl bg-card p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-foreground">Přidat vodu</h2>
          <p className="mt-1 text-sm text-muted-foreground">Zadejte množství ml</p>
        </div>

        <Card className="mb-6 border-2 border-border bg-secondary p-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number.parseInt(e.target.value) || 0))}
            className="w-full bg-transparent text-center text-4xl font-bold text-foreground outline-none"
          />
          <div className="mt-2 text-center text-sm text-muted-foreground">ml</div>
        </Card>

        <div className="mb-4 grid grid-cols-4 gap-2">
          {[100, 250, 500, 750].map((preset) => (
            <Button
              key={preset}
              onClick={() => setAmount(preset)}
              variant={amount === preset ? "default" : "outline"}
              className={`text-xs ${
                amount === preset ? "bg-primary text-primary-foreground" : "border-2 border-border"
              }`}
            >
              {preset}
            </Button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1 border-2 border-border py-6 bg-transparent">
            Zrušit
          </Button>
          <Button
            onClick={handleAdd}
            className="flex-1 bg-primary py-6 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Přidat
          </Button>
        </div>
      </div>
    </div>
  )
}
