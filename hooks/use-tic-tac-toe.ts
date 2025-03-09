"use client"

import { useState, useCallback, useMemo } from "react"

/**
 * Type definitions for the game
 */
export type SquareValue = "X" | "O" | null
export type BoardState = SquareValue[]
export type WinningLine = number[] | null

/**
 * Custom hook that encapsulates all Tic-Tac-Toe game logic
 *
 * This hook manages the game state and provides methods to interact with the game
 */
export function useTicTacToe() {
  // Game state
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const [gameHistory, setGameHistory] = useState<BoardState[]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState<number>(0)

  /**
   * Calculate the winner of the game
   *
   * @param board - The current board state
   * @returns The winner ('X' or 'O') or null if there is no winner
   */
  const calculateWinner = useCallback((board: BoardState): SquareValue => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical
      [0, 4, 8],
      [2, 4, 6], // Diagonal
    ]

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    return null
  }, [])

  /**
   * Get the winning line if there is a winner
   *
   * @param board - The current board state
   * @returns The winning line indices or null if there is no winner
   */
  const getWinningLine = useCallback((board: BoardState): WinningLine => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical
      [0, 4, 8],
      [2, 4, 6], // Diagonal
    ]

    for (const line of lines) {
      const [a, b, c] = line
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return line
      }
    }

    return null
  }, [])

  // Memoized values to prevent unnecessary recalculations
  const winner = useMemo(() => calculateWinner(squares), [squares, calculateWinner])
  const winningLine = useMemo(() => getWinningLine(squares), [squares, getWinningLine])
  const isDraw = useMemo(() => !winner && squares.every((square) => square !== null), [winner, squares])

  // Game status message
  const status = useMemo(() => {
    if (winner) {
      return `Winner: ${winner}`
    } else if (isDraw) {
      return "Game ended in a draw!"
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`
    }
  }, [winner, isDraw, xIsNext])

  /**
   * Handle a click on a square
   *
   * @param index - The index of the clicked square
   */
  const handleSquareClick = useCallback(
    (index: number) => {
      // Return early if the game is over or the square is already filled
      if (winner || squares[index]) {
        return
      }

      // Create a new copy of the squares array
      const nextSquares = squares.slice()
      nextSquares[index] = xIsNext ? "X" : "O"

      // Update game history
      const nextHistory = [...gameHistory.slice(0, currentMove + 1), nextSquares]

      // Update state
      setGameHistory(nextHistory)
      setCurrentMove(nextHistory.length - 1)
      setSquares(nextSquares)
      setXIsNext(!xIsNext)
    },
    [squares, xIsNext, gameHistory, currentMove, winner],
  )

  /**
   * Reset the game to its initial state
   */
  const resetGame = useCallback(() => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setGameHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }, [])

  /**
   * Jump to a specific move in the game history
   *
   * @param move - The move number to jump to
   */
  const jumpToMove = useCallback(
    (move: number) => {
      setCurrentMove(move)
      setSquares(gameHistory[move])
      setXIsNext(move % 2 === 0)
    },
    [gameHistory],
  )

  // Return all the state and functions needed by the components
  return {
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
  }
}

