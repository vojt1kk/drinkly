"use client"

import { useState } from "react"
import Onboarding from "@/components/onboarding"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState(false)

  return isOnboarded ? <Dashboard /> : <Onboarding onComplete={() => setIsOnboarded(true)} />
}
