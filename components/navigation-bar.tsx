"use client"

interface NavigationBarProps {
  activeTab: "today" | "history"
  onTabChange: (tab: "today" | "history") => void
}

export default function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t-2 border-border bg-card px-4 py-3 flex justify-around">
      <button
        onClick={() => onTabChange("today")}
        className={`flex flex-col items-center gap-1 py-2 transition-colors ${
          activeTab === "today" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <span className="text-2xl">💧</span>
        <span className="text-xs font-semibold">Dnes</span>
      </button>
      <button
        onClick={() => onTabChange("history")}
        className={`flex flex-col items-center gap-1 py-2 transition-colors ${
          activeTab === "history" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <span className="text-2xl">{"💦"}</span>
        <span className="text-xs font-semibold">Historie</span>
      </button>
    </div>
  )
}
