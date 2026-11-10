"use client"
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
} from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import PageHeader from "@/components/PageHeader"
import { site } from "@/lib/site"

export default function About() {
    const WebContent = () => (
        <main className="flex-1">
            <PageHeader
                eyebrow="About"
                title="About the CS Club"
                description="The CS Club at Minot State University is dedicated to fostering a community of learners interested in computer science and technology."
            />
            <div className="page-shell">
                <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <section className="surface p-6 sm:p-8">
                        <h2 className="section-title">What we do</h2>
                        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                            {[
                                "Organize workshops and coding sessions to enhance programming skills",
                                "Host guest speakers from the tech industry",
                                "Participate in programming competitions and hackathons",
                                "Provide networking opportunities with industry professionals",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                                    <span className="text-sm text-zinc-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="space-y-6">
                        <section className="surface p-6 sm:p-8">
                            <h2 className="text-lg font-semibold text-zinc-900">Join us</h2>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                We welcome students of all skill levels who are passionate about technology and want to learn more about
                                computer science. Meetings are held weekly during the academic year.
                            </p>
                            <p className="mt-4 font-mono text-xs text-zinc-500">
                                {site.meeting.day} · {site.meeting.time} · {site.meeting.place}
                            </p>
                        </section>
                        <section className="surface p-6 sm:p-8">
                            <h2 className="text-lg font-semibold text-zinc-900">Contact</h2>
                            <p className="mt-3 text-sm text-zinc-600">
                                Have questions? Reach out to us at{" "}
                                <a href={`mailto:${site.email}`} className="link">
                                    {site.email}
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )

const NativeContent = () => (
        <IonPage>
            <IonContent fullscreen>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative">
                        <div
                            className="absolute inset-0 bg-red-600"
                            style={{
                                clipPath: "ellipse(150% 100% at 50% 0%)",
                                height: "30vh",
                                zIndex: -1,
                            }}
                        />
                        <div className="pt-8 pb-16">
                            <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Our Mission</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <p className="text-lg mb-6">
                                        The CS Club at Minot State University is dedicated to fostering a community of learners interested
                                        in computer science and technology.
                                    </p>

                                    <h3 className="text-xl font-semibold mb-4">What We Do</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Organize workshops and coding sessions to enhance programming skills</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Host guest speakers from the tech industry</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Participate in programming competitions and hackathons</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Provide networking opportunities with industry professionals</span>
                                        </li>
                                    </ul>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeContent /> : <WebContent />}</NoSSR>
}