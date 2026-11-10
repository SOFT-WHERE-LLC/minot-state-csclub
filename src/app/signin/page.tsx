"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IonContent, IonPage, IonItem, IonLabel, IonInput, IonButton, IonText } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })

            if (response.ok) {
                router.push("/")
            } else {
                const data = await response.json()
                setError(data.message || "Invalid login credentials.")
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.")
        }
    }

    const WebLogin = () => (
        <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-zinc-950 px-5 py-16">
            <div className="absolute inset-0 -z-10 bg-grid bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            <div className="absolute left-1/2 top-1/3 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/5 sm:p-10">
                <p className="eyebrow">Members</p>
                <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Sign in</h1>
                <p className="mt-2 text-sm text-zinc-600">Welcome back. Sign in with your club account.</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="username" className="field-label">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="field"
                            placeholder="Enter your username"
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="field-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="field"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-inset ring-red-200">{error}</p>}
                    <button type="submit" className="btn-primary w-full py-3">
                        Sign in
                    </button>
                    <p className="text-center text-sm text-zinc-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="link">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )

const NativeLogin = () => (
        <IonPage>
            <IonContent className="ion-padding">
                <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput
                            value={username}
                            onIonChange={(e) => setUsername(e.detail.value!)}
                            placeholder="Enter your username"
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            placeholder="Enter your password"
                            required
                        />
                    </IonItem>
                    {error && (
                        <IonText color="danger" className="ion-text-center">
                            <p>{error}</p>
                        </IonText>
                    )}
                    <IonButton expand="block" type="submit" className="mt-6">
                        Log In
                    </IonButton>
                    {/*
                    <div className="ion-text-center mt-4">
                        <p>
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                    */}
                </form>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? NativeLogin() : WebLogin()}</NoSSR>
}