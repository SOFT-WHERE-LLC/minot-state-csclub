"use client"

import Link from "next/link"
import Image from "next/image"
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react"
import { playOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

type Game = {
    id: string
    title: string
    description: string
    image: string
}

const games: Game[] = [
    {
        id: "tic-tac-toe",
        title: "Tic Tac Toe",
        description: "A classic game of Tic Tac Toe. Play against a friend!",
        image: "/tic-tac-toe.png",
    },
    {
        id: "memory-match",
        title: "Memory Match",
        description: "Test your memory by matching pairs of cards.",
        image: "/memory-match.png",
    },
    {
        id: "minesweeper",
        title: "Minesweeper",
        description: "Clear the minefield without triggering any explosions!",
        image: "/minesweeper.png",
    },
]

export default function GamesList() {
    const NativeGameCard = ({ game }: { game: Game }) => (
        <IonCard className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image src={game.image || "/placeholder.svg"} alt={game.title} layout="fill" objectFit="cover" />
            </div>
            <IonCardHeader>
                <IonCardTitle className="text-2xl font-bold text-red-600">{game.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p className="text-gray-700 mb-4">{game.description}</p>
                <Link href={`/games/${game.id}`} passHref>
                    <IonButton expand="block" color="primary">
                        Play Now
                    </IonButton>
                </Link>
            </IonCardContent>
        </IonCard>
    )

    const WebGameCard = ({ game }: { game: Game }) => (
        <Link href={`/games/${game.id}`} className="surface surface-hover group flex flex-col overflow-hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{game.title}</h3>
                <p className="mt-2 flex-1 text-sm text-zinc-600">{game.description}</p>
                <span className="btn-primary mt-5 w-full">
                    <IonIcon icon={playOutline} className="h-4 w-4" />
                    Play now
                </span>
            </div>
        </Link>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonGrid>
                    <IonRow>
                        {games.map((game) => (
                            <IonCol key={game.id} size="12" sizeMd="6" sizeLg="4">
                                <NativeGameCard game={game} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                        <WebGameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </NoSSR>
    )
}