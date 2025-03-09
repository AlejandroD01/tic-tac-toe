"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import type { BoardState } from "../hooks/use-tic-tac-toe"

/**
 * Props for the GameHistory component
 */
interface GameHistoryProps {
  gameHistory: BoardState[]
  currentMove: number
  onJumpTo: (move: number) => void
}

/**
 * GameHistory component that displays the history of moves
 *
 * This component is memoized to prevent unnecessary re-renders
 */
export const GameHistory = memo(function GameHistory({ gameHistory, currentMove, onJumpTo }: GameHistoryProps) {
  return (
    <div className="mt-6 md:mt-0">
      <h2 className="text-lg font-medium mb-2">Game History</h2>
      <ol className="list-decimal pl-5">
        {gameHistory.map((_, move) => {
          const description = move ? `Go to move #${move}` : "Go to game start"
          return (
            <li key={move} className="mb-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onJumpTo(move)}
                className={move === currentMove ? "bg-primary text-primary-foreground" : ""}
                aria-current={move === currentMove ? "step" : undefined}
              >
                {description}
              </Button>
            </li>
          )
        })}
      </ol>
    </div>
  )
})

