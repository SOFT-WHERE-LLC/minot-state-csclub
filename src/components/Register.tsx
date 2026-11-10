"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IonContent, IonPage, IonItem, IonLabel, IonInput, IonButton, IonText, IonList } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [yearOfStudy, setYearOfStudy] = useState("")
    const [major, setMajor] = useState("")
    const [profilePic, setProfilePic] = useState<string | null>(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement> | CustomEvent) => {
        const file =
            "target" in e && e.target instanceof HTMLInputElement && e.target.files
                ? e.target.files[0]
                : (e as CustomEvent).detail.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePic(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    fullName,
                    yearOfStudy,
                    major,
                    profilePic,
                    userType: "Member",
                }),
            })

            if (response.ok) {
                setSuccess(true)
                setTimeout(() => router.push("/signin"), 2000)
            } else {
                const data = await response.json()
                setError(data.message || "Failed to register. Please try again.")
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.")
        }
    }

    const WebRegister = () => (
        <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-zinc-950 px-5 py-16">
            <div className="absolute inset-0 -z-10 bg-grid bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            <div className="absolute left-1/2 top-1/4 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/5 sm:p-10">
                <p className="eyebrow">Members</p>
                <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Create your account</h1>
                <p className="mt-2 text-sm text-zinc-600">Join the club roster with your school email.</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="fullName" className="field-label">
                            Full name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="field"
                            placeholder="Your full name"
                            autoComplete="name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="field-label">
                            School email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="field"
                            placeholder="you@ndus.edu"
                            autoComplete="email"
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
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="yearOfStudy" className="field-label">
                                Year of study
                            </label>
                            <input
                                id="yearOfStudy"
                                type="text"
                                value={yearOfStudy}
                                onChange={(e) => setYearOfStudy(e.target.value)}
                                className="field"
                                placeholder="e.g. Sophomore"
                            />
                        </div>
                        <div>
                            <label htmlFor="major" className="field-label">
                                Major
                            </label>
                            <input
                                id="major"
                                type="text"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                className="field"
                                placeholder="e.g. Computer Science"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="profilePic" className="field-label">
                            Profile picture <span className="font-normal text-zinc-400">(optional)</span>
                        </label>
                        <input
                            id="profilePic"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
                        />
                    </div>
                    {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-inset ring-red-200">{error}</p>}
                    {success && (
                        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            Registration successful! Redirecting...
                        </p>
                    )}
                    <button type="submit" className="btn-primary w-full py-3">
                        Create account
                    </button>
                    <p className="text-center text-sm text-zinc-600">
                        Already a member?{" "}
                        <Link href="/signin" className="link">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )

const NativeRegister = () => (
        <IonPage>
            <IonContent className="ion-padding">
                <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Full Name</IonLabel>
                            <IonInput
                                value={fullName}
                                onIonChange={(e) => setFullName(e.detail.value!)}
                                placeholder="Your full name"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">School Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                placeholder="Enter your email"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                                placeholder="Create a password"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Year of Study</IonLabel>
                            <IonInput
                                value={yearOfStudy}
                                onIonChange={(e) => setYearOfStudy(e.detail.value!)}
                                placeholder="e.g., Freshman, Sophomore"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Major</IonLabel>
                            <IonInput
                                value={major}
                                onIonChange={(e) => setMajor(e.detail.value!)}
                                placeholder="Your major (e.g., Computer Science)"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Profile Picture (Optional)</IonLabel>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProfilePicChange(e)}
                                style={{ marginTop: "8px" }}
                            />
                        </IonItem>
                    </IonList>
                    {error && (
                        <IonText color="danger" className="ion-text-center">
                            <p>{error}</p>
                        </IonText>
                    )}
                    {success && (
                        <IonText color="success" className="ion-text-center">
                            <p>Registration successful! Redirecting...</p>
                        </IonText>
                    )}
                    <IonButton expand="block" type="submit" className="mt-6">
                        Register
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? NativeRegister() : WebRegister()}</NoSSR>
}