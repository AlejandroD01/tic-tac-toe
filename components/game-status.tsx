"use client"

import { memo } from "react"
import type { SquareValue } from "../hooks/use-tic-tac-toe"

/**
 * Props for the GameStatus component
 */
interface GameStatusProps {
  status: string
  winner: SquareValue
  isDraw: boolean
}

/**
 * GameStatus component that displays the current game status
 *
 * This component is memoized to prevent unnecessary re-renders
 */
export const GameStatus = memo(function GameStatus({ status, winner, isDraw }: GameStatusProps) {
  return (
    <div
      className="mb-4 text-xl font-medium"
      style={{
        color: winner ? "var(--success)" : isDraw ? "var(--warning)" : "var(--foreground)",
      }}
    >
      {status}
    </div>
  )
})

