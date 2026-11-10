"use client"

import { useState, useEffect } from "react"
import { IonButton, IonGrid, IonRow, IonCol, IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

type Card = {
    id: number
    content: string
    flipped: boolean
    matched: boolean
}

const initialCards: Card[] = [
    { id: 1, content: "🐶", flipped: false, matched: false },
    { id: 2, content: "🐱", flipped: false, matched: false },
    { id: 3, content: "🐭", flipped: false, matched: false },
    { id: 4, content: "🐹", flipped: false, matched: false },
    { id: 5, content: "🐰", flipped: false, matched: false },
    { id: 6, content: "🦊", flipped: false, matched: false },
    { id: 7, content: "🐶", flipped: false, matched: false },
    { id: 8, content: "🐱", flipped: false, matched: false },
    { id: 9, content: "🐭", flipped: false, matched: false },
    { id: 10, content: "🐹", flipped: false, matched: false },
    { id: 11, content: "🐰", flipped: false, matched: false },
    { id: 12, content: "🦊", flipped: false, matched: false },
]

const MemoryMatch = () => {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [matchedPairs, setMatchedPairs] = useState<number>(0)
    const [moves, setMoves] = useState<number>(0)

    useEffect(() => {
        shuffleCards()
    }, [])

    const shuffleCards = () => {
        const shuffled = [...initialCards].sort(() => Math.random() - 0.5)
        setCards(shuffled)
        setFlippedCards([])
        setMatchedPairs(0)
        setMoves(0)
    }

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2) return

        const newCards = cards.map((card) => (card.id === id ? { ...card, flipped: true } : card))
        setCards(newCards)

        setFlippedCards([...flippedCards, id])

        if (flippedCards.length === 1) {
            setMoves(moves + 1)
            const [firstId] = flippedCards
            const firstCard = cards.find((card) => card.id === firstId)
            const secondCard = newCards.find((card) => card.id === id)

            if (firstCard?.content === secondCard?.content) {
                setMatchedPairs(matchedPairs + 1)
                setCards(cards.map((card) => (card.id === firstId || card.id === id ? { ...card, matched: true } : card)))
                setFlippedCards([])
            } else {
                setTimeout(() => {
                    setCards(cards.map((card) => (card.id === firstId || card.id === id ? { ...card, flipped: false } : card)))
                    setFlippedCards([])
                }, 1000)
            }
        }
    }

    const gameContent = (
        <div className="p-4">
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Memory Match</h2>
                <p className="text-lg">
                    Moves: {moves} | Pairs: {matchedPairs}/6
                </p>
                <IonButton onClick={shuffleCards} className="mt-2">
                    New Game
                </IonButton>
            </div>
            <IonGrid>
                <IonRow>
                    {cards.map((card) => (
                        <IonCol size="3" key={card.id}>
                            <IonButton
                                expand="block"
                                onClick={() => handleCardClick(card.id)}
                                disabled={card.flipped || card.matched}
                                className="h-20 text-4xl"
                                color={card.matched ? "success" : card.flipped ? "primary" : "light"}
                            >
                                {card.flipped || card.matched ? card.content : "?"}
                            </IonButton>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </div>
    )

    const webGameContent = (
        <div className="mx-auto max-w-xl px-4 py-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-sm text-zinc-600">
                    Moves: <span className="font-semibold text-zinc-900">{moves}</span> · Pairs:{" "}
                    <span className="font-semibold text-zinc-900">{matchedPairs}/6</span>
                </p>
                <button onClick={shuffleCards} className="btn-secondary px-4 py-2">
                    New game
                </button>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        disabled={card.flipped || card.matched}
                        className={`flex aspect-square items-center justify-center rounded-xl text-4xl font-bold transition ${
                            card.matched
                                ? "bg-emerald-50 ring-1 ring-inset ring-emerald-200"
                                : card.flipped
                                  ? "bg-white ring-2 ring-inset ring-brand-500"
                                  : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
                        }`}
                    >
                        {card.flipped || card.matched ? card.content : "?"}
                    </button>
                ))}
            </div>
        </div>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Memory Match</IonTitle>
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

export default MemoryMatch