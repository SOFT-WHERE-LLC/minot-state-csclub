"use client"

import { useState } from "react"
import { IonButton, IonGrid, IonRow, IonCol } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"

type SquareValue = "X" | "O" | null

const TicTacToe = () => {
    const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    const handleClick = (i: number) => {
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        const newSquares = squares.slice()
        newSquares[i] = xIsNext ? "X" : "O"
        setSquares(newSquares)
        setXIsNext(!xIsNext)
    }

    const renderSquare = (i: number) => {
        return (
            <IonButton
                expand="block"
                onClick={() => handleClick(i)}
                className="h-20 text-2xl font-bold"
                color={squares[i] === "X" ? "danger" : squares[i] === "O" ? "primary" : "light"}
            >
                {squares[i]}
            </IonButton>
        )
    }

    const winner = calculateWinner(squares)
    let status
    if (winner) {
        status = `Winner: ${winner}`
    } else if (squares.every(Boolean)) {
        status = "Draw!"
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`
    }

    const resetGame = () => {
        setSquares(Array(9).fill(null))
        setXIsNext(true)
    }

    if (!isNativeApp()) {
        return (
            <div className="mx-auto max-w-sm px-4 py-10">
                <p className="text-center font-mono text-sm text-zinc-600">{status}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                    {squares.map((value, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            className={`flex aspect-square items-center justify-center rounded-xl text-4xl font-bold transition ${
                                value === "X"
                                    ? "bg-brand-600 text-white"
                                    : value === "O"
                                      ? "bg-zinc-900 text-white"
                                      : "bg-zinc-100 text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-200"
                            }`}
                            aria-label={`Square ${i + 1}${value ? `, ${value}` : ""}`}
                        >
                            {value}
                        </button>
                    ))}
                </div>
                <button onClick={resetGame} className="btn-secondary mt-6 w-full">
                    Reset game
                </button>
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="mb-4 text-xl font-bold text-center">{status}</div>
            <IonGrid>
                <IonRow>
                    <IonCol>{renderSquare(0)}</IonCol>
                    <IonCol>{renderSquare(1)}</IonCol>
                    <IonCol>{renderSquare(2)}</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>{renderSquare(3)}</IonCol>
                    <IonCol>{renderSquare(4)}</IonCol>
                    <IonCol>{renderSquare(5)}</IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>{renderSquare(6)}</IonCol>
                    <IonCol>{renderSquare(7)}</IonCol>
                    <IonCol>{renderSquare(8)}</IonCol>
                </IonRow>
            </IonGrid>
            <IonButton expand="block" onClick={resetGame} className="mt-4">
                Reset Game
            </IonButton>
        </div>
    )
}

function calculateWinner(squares: SquareValue[]): SquareValue {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

export default TicTacToe