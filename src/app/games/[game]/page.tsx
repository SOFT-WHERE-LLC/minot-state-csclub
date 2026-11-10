"use client"

import { useParams } from "next/navigation"
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import dynamic from "next/dynamic"
import Link from "next/link"
import { IonIcon } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons"

export default function GamePage() {
    const params = useParams()
    const gameId = params.game as string

    const GameComponent = dynamic(() => import(`@/components/games/${gameId}`), {
        loading: () => <p>Loading game...</p>,
        ssr: false,
    })

    const title = gameId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    const content = (
        <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:py-14">
            <Link href="/games" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-brand-600">
                <IonIcon icon={arrowBackOutline} className="h-4 w-4" />
                All games
            </Link>
            <p className="eyebrow mt-6">Now playing</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900 sm:text-4xl">{title}</h1>
            <div className="surface mt-8 overflow-hidden">
                <GameComponent />
            </div>
        </div>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>{title}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>{content}</IonContent>
                </IonPage>
            ) : (
                <main className="flex-1">{content}</main>
            )}
        </NoSSR>
    )
}