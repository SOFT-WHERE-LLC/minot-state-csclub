"use client"

import { useState, useEffect } from "react"
import {
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
} from "@ionic/react"
import { flagOutline, closeOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

type Cell = {
    isMine: boolean
    isRevealed: boolean
    isFlagged: boolean
    neighborMines: number
}

const GRID_SIZE = 10
const MINES_COUNT = 15

const createBoard = (): Cell[][] => {
    // Create empty board
    const board = Array(GRID_SIZE)
        .fill(null)
        .map(() =>
            Array(GRID_SIZE)
                .fill(null)
                .map(() => ({
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0,
                })),
        )

    // Place mines
    let minesPlaced = 0
    while (minesPlaced < MINES_COUNT) {
        const x = Math.floor(Math.random() * GRID_SIZE)
        const y = Math.floor(Math.random() * GRID_SIZE)
        if (!board[y][x].isMine) {
            board[y][x].isMine = true
            minesPlaced++
        }
    }

    // Calculate neighbor mines
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (!board[y][x].isMine) {
                let count = 0
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const ny = y + dy
                        const nx = x + dx
                        if (ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE) {
                            if (board[ny][nx].isMine) count++
                        }
                    }
                }
                board[y][x].neighborMines = count
            }
        }
    }

    return board
}

const Minesweeper = () => {
    const [board, setBoard] = useState<Cell[][]>([])
    const [gameOver, setGameOver] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [flagMode, setFlagMode] = useState(false)

    useEffect(() => {
        resetGame()
    }, [])

    const resetGame = () => {
        setBoard(createBoard())
        setGameOver(false)
        setGameWon(false)
        setFlagMode(false)
    }

    const revealCell = (y: number, x: number) => {
        if (gameOver || gameWon || board[y][x].isRevealed || board[y][x].isFlagged) return

        const newBoard = [...board]

        if (board[y][x].isMine) {
            // Game Over - reveal all mines
            for (let i = 0; i < GRID_SIZE; i++) {
                for (let j = 0; j < GRID_SIZE; j++) {
                    if (newBoard[i][j].isMine) {
                        newBoard[i][j].isRevealed = true
                    }
                }
            }
            setBoard(newBoard)
            setGameOver(true)
            return
        }

        const revealEmpty = (y: number, x: number) => {
            if (y < 0 || y >= GRID_SIZE || x < 0 || x >= GRID_SIZE) return
            if (newBoard[y][x].isRevealed || newBoard[y][x].isFlagged) return

            newBoard[y][x].isRevealed = true

            if (newBoard[y][x].neighborMines === 0) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        revealEmpty(y + dy, x + dx)
                    }
                }
            }
        }

        revealEmpty(y, x)
        setBoard(newBoard)

        // Check for win
        let unrevealed = 0
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (!newBoard[i][j].isRevealed && !newBoard[i][j].isMine) unrevealed++
            }
        }
        if (unrevealed === 0) setGameWon(true)
    }

    const toggleFlag = (y: number, x: number) => {
        if (gameOver || gameWon || board[y][x].isRevealed) return
        const newBoard = [...board]
        newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged
        setBoard(newBoard)
    }

    const handleCellClick = (y: number, x: number) => {
        if (flagMode) {
            toggleFlag(y, x)
        } else {
            revealCell(y, x)
        }
    }

    const getCellContent = (cell: Cell): string => {
        if (!cell.isRevealed) return cell.isFlagged ? "🚩" : ""
        if (cell.isMine) return "💣"
        return cell.neighborMines > 0 ? cell.neighborMines.toString() : ""
    }

    const getCellColor = (cell: Cell): string => {
        if (!cell.isRevealed) return cell.isFlagged ? "warning" : "light"
        if (cell.isMine) return "danger"
        return cell.neighborMines > 0 ? "primary" : "medium"
    }

    const gameContent = (
        <div className="p-4">
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Minesweeper</h2>
                <p className="text-lg mb-2">{gameOver ? "Game Over!" : gameWon ? "You Won!" : "Find all mines!"}</p>
                <div className="flex justify-center gap-2 mb-4">
                    <IonButton onClick={resetGame}>New Game</IonButton>
                    <IonButton onClick={() => setFlagMode(!flagMode)} color={flagMode ? "warning" : "medium"}>
                        <IonIcon icon={flagMode ? flagOutline : closeOutline} />
                        {flagMode ? " Flag Mode" : " Dig Mode"}
                    </IonButton>
                </div>
            </div>
            <IonGrid className="max-w-md mx-auto">
                {board.map((row, y) => (
                    <IonRow key={y}>
                        {row.map((cell, x) => (
                            <IonCol key={`${y}-${x}`} size="1" className="p-0">
                                <IonButton
                                    expand="block"
                                    onClick={() => handleCellClick(y, x)}
                                    color={getCellColor(cell)}
                                    className="aspect-square m-0"
                                    disabled={gameOver || gameWon}
                                >
                                    {getCellContent(cell)}
                                </IonButton>
                            </IonCol>
                        ))}
                    </IonRow>
                ))}
            </IonGrid>
        </div>
    )

    const webCellClass = (cell: Cell): string => {
        if (!cell.isRevealed) {
            return cell.isFlagged
                ? "bg-amber-100 ring-1 ring-inset ring-amber-300"
                : "bg-zinc-300 hover:bg-zinc-400 shadow-[inset_0_-2px_0_rgb(0_0_0/0.15)]"
        }
        if (cell.isMine) return "bg-brand-600 text-white"
        return "bg-zinc-50 ring-1 ring-inset ring-zinc-200"
    }

    const numberColors = ["", "text-blue-600", "text-emerald-600", "text-brand-600", "text-indigo-700", "text-amber-700", "text-teal-600", "text-zinc-900", "text-zinc-500"]

    const webGameContent = (
        <div className="mx-auto max-w-lg px-4 py-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-sm text-zinc-600">
                    {gameOver ? "Boom. Game over!" : gameWon ? "You cleared the field!" : `${MINES_COUNT} mines hidden`}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFlagMode(!flagMode)}
                        className={flagMode ? "btn bg-amber-100 px-4 py-2 text-amber-900 ring-1 ring-inset ring-amber-300" : "btn-secondary px-4 py-2"}
                    >
                        {flagMode ? "🚩 Flag mode" : "⛏️ Dig mode"}
                    </button>
                    <button onClick={resetGame} className="btn-primary px-4 py-2">
                        New game
                    </button>
                </div>
            </div>
            <div className="mt-6 grid gap-1 rounded-xl bg-zinc-200 p-1.5" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
                {board.map((row, y) =>
                    row.map((cell, x) => (
                        <button
                            key={`${y}-${x}`}
                            onClick={() => handleCellClick(y, x)}
                            onContextMenu={(e) => {
                                e.preventDefault()
                                toggleFlag(y, x)
                            }}
                            disabled={gameOver || gameWon}
                            className={`flex aspect-square items-center justify-center rounded-md text-sm font-bold transition sm:text-base ${webCellClass(cell)} ${
                                cell.isRevealed && !cell.isMine ? numberColors[cell.neighborMines] : ""
                            }`}
                        >
                            {getCellContent(cell)}
                        </button>
                    )),
                )}
            </div>
            <p className="mt-4 text-center text-xs text-zinc-500">Tip: right-click a square to flag it.</p>
        </div>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Minesweeper</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">{gameContent}</IonContent>
                </IonPage>
            ) : (
                webGameContent
            )}
        </NoSSR>
    )
}

export default Minesweeper