"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type CurrencyUnit = "백만원" | "십억원" | "조원"

interface CurrencyContextType {
  unit: CurrencyUnit
  setUnit: (unit: CurrencyUnit) => void
  formatAmount: (amount: string | number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<CurrencyUnit>("백만원")

  const formatAmount = (amount: string | number) => {
    let numericValue: number

    if (typeof amount === "number") {
      numericValue = amount
    } else {
      numericValue = Number.parseFloat(amount.replace(/[₩억조만,]/g, ""))
    }

    if (isNaN(numericValue)) {
      return "₩0"
    }

    switch (unit) {
      case "백만원":
        return `₩${(numericValue * 100).toLocaleString()}백만`
      case "십억원":
        return `₩${(numericValue / 10).toLocaleString()}십억`
      case "조원":
        return `₩${(numericValue / 10000).toLocaleString()}조`
      default:
        return typeof amount === "string" ? amount : `₩${numericValue.toLocaleString()}`
    }
  }

  return <CurrencyContext.Provider value={{ unit, setUnit, formatAmount }}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
