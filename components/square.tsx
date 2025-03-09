"use client"

import { memo } from "react"
import type { SquareValue } from "../hooks/use-tic-tac-toe"


const drawingAnimationStyles = `
@keyframes drawStroke {
  0% {
    stroke-dashoffset: 100;
    opacity: 0; /* Totalmente invisible al inicio */
  }
  5% {
    stroke-dashoffset: 100;
    opacity: 0; /* Mantiene oculto durante los primeros 5% */
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.draw-x-path {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: drawStroke 0.6s linear forwards;
  filter: url(#pencil-filter);
}

.draw-circle {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: drawStroke 0.8s linear forwards;
  filter: url(#pencil-filter);
}
`;

interface SquareProps {
  value: SquareValue
  isWinningSquare: boolean
  onSquareClick: () => void
}

export const Square = memo(function Square({ value, isWinningSquare, onSquareClick }: SquareProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: drawingAnimationStyles }} />

      <button
        className={`w-20 h-20 flex items-center justify-center text-2xl font-bold relative ${isWinningSquare ? "bg-success/20" : ""
          } transition-colors`}
        onClick={onSquareClick}
        style={{
          margin: 0,
          padding: 0,
          border: "none",
        }}
        aria-label={value || "Empty square"}
      >
        {value && (
          value === "X" ? (
            <div className="relative z-10">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path
                  d="M 10,10 L 30,30 M 30,10 L 10,30"
                  stroke="#0070f3"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="draw-x-path"
                  style={{ opacity: value === "X" ? 1 : 0 }} /* Controla la visibilidad */
                />
              </svg>
            </div>
          ) : (
            <div className="relative z-10">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="12"
                  fill="none"
                  stroke="black"
                  strokeWidth="5"
                  className="draw-circle"
                  style={{ opacity: value === "O" ? 1 : 0 }} /* Controla la visibilidad */
                />
              </svg>
            </div>
          )
        )}
      </button>
    </>
  )
})