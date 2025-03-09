"use client"

import { memo } from "react"
import { Square } from "./square"
import type { BoardState, WinningLine } from "../hooks/use-tic-tac-toe"

/**
 * Props for the GameBoard component
 */
interface GameBoardProps {
  squares: BoardState
  winningLine: WinningLine
  onSquareClick: (index: number) => void
}

/**
 * GameBoard component that renders the Tic-Tac-Toe grid
 *
 * This component is memoized to prevent unnecessary re-renders
 */
export const GameBoard = memo(function GameBoard({ squares, winningLine, onSquareClick }: GameBoardProps) {
  return (
    <div className="relative max-w-xs mx-auto" style={{ width: "240px", height: "240px" }}>
      {/* SVG filter for pencil effect */}
      <svg width="0" height="0" className="absolute">
        <filter id="pencil-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </svg>

      {/* Grid of squares */}
      <div className="grid grid-cols-3 grid-rows-3 absolute inset-0">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => onSquareClick(i)}
            isWinningSquare={winningLine?.includes(i) || false}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Vertical lines */}
          <line x1="80" y1="0" x2="80" y2="240" stroke="black" strokeWidth="1" />
          <line x1="160" y1="0" x2="160" y2="240" stroke="black" strokeWidth="1" />
          {/* Horizontal lines */}
          <line x1="0" y1="80" x2="240" y2="80" stroke="black" strokeWidth="1" />
          <line x1="0" y1="160" x2="240" y2="160" stroke="black" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
})

