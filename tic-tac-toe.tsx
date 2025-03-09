"use client"
import { Button } from "@/components/ui/button"
import { useTicTacToe } from "./hooks/use-tic-tac-toe"
import { GameHistory } from "./components/game-history"
import { GameStatus } from "./components/game-status"
import { GameBoard } from "./components/game-board"

/**
 * Main TicTacToe component that orchestrates the game
 *
 * This component serves as the container for the entire game,
 * managing the overall layout and delegating game logic to custom hooks
 */
export default function TicTacToe() {
  // Use our custom hook to manage game state and logic
  const {
    squares,
    xIsNext,
    winner,
    isDraw,
    winningLine,
    status,
    gameHistory,
    currentMove,
    handleSquareClick,
    resetGame,
    jumpToMove,
  } = useTicTacToe()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">Tic-Tac-Toe</h1>

      {/* Game status display */}
      <GameStatus status={status} winner={winner} isDraw={isDraw} />

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl">
        <div className="flex-1">
          {/* Game board component */}
          <GameBoard squares={squares} winningLine={winningLine} onSquareClick={handleSquareClick} />

          <div className="mt-6 flex justify-center">
            <Button onClick={resetGame} className="px-8">
              Reset Game
            </Button>
          </div>
        </div>

        {/* Game history component */}
        <GameHistory gameHistory={gameHistory} currentMove={currentMove} onJumpTo={jumpToMove} />
      </div>
    </div>
  )
}

