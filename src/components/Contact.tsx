"use client"

import { useState } from "react"
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
} from "@ionic/react"
import { mailOutline, logoGithub, logoDiscord, logoInstagram } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import PageHeader from "@/components/PageHeader"
import { site } from "@/lib/site"

export default function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false)

    {/*
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // In a real implementation, this would send the form data to a server
        window.location.href = `mailto:csclub@minotstateu.edu?subject=Contact from ${name}&body=${message}`
        setSubmitted(true)
    }
    */}

    const WebContact = () => (
        <main className="flex-1">
            <PageHeader
                eyebrow="Contact"
                title="Get in touch"
                description="Have questions about the CS Club or want to get involved? We'd love to hear from you."
            />
            <div className="page-shell">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: mailOutline, label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
                        { icon: logoDiscord, label: "Discord", value: "Join the server", href: site.links.discord, external: true },
                        { icon: logoGithub, label: "GitHub", value: "github.com/MSUCSClub", href: site.links.github, external: true },
                        { icon: logoInstagram, label: "Instagram", value: "@msu_csclub", href: site.links.instagram, external: true },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="surface surface-hover group flex flex-col p-6"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                                <IonIcon icon={item.icon} className="h-5 w-5" />
                            </span>
                            <h2 className="mt-5 font-semibold text-zinc-900">{item.label}</h2>
                            <p className="mt-1 break-words text-sm text-zinc-600 transition group-hover:text-brand-600">{item.value}</p>
                        </a>
                    ))}
                </div>

                <section className="surface mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900">Or just come to a meeting</h2>
                        <p className="mt-1 text-sm text-zinc-600">
                            {site.meeting.day} at {site.meeting.time} in {site.meeting.place}. Everyone&apos;s welcome.
                        </p>
                    </div>
                    <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
                        <IonIcon icon={logoDiscord} className="h-4 w-4" />
                        Join our Discord
                    </a>
                </section>
            </div>
        </main>
    )

const NativeContact = () => (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contact Us</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardContent>
                        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                        <p className="mb-4">
                            Have questions about the CS Club or want to get involved? We'd love to hear from you!
                        </p>
                        <IonItem href="mailto:csclub@minotstateu.edu" detail={true}>
                            <IonIcon icon={mailOutline} slot="start" />
                            <IonLabel>csclub@minotstateu.edu</IonLabel>
                        </IonItem>
                        <IonItem href="https://github.com/MSUCSClub" detail={true}>
                            <IonIcon icon={logoGithub} slot="start" />
                            <IonLabel>GitHub</IonLabel>
                        </IonItem>
                        <IonItem href="https://discord.gg/WEdBaCeYsa" detail={true}>
                            <IonIcon icon={logoDiscord} slot="start" />
                            <IonLabel>Discord</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>

                {/*
                <IonCard>
                    <IonCardContent>
                        <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <IonItem>
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} required />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Message</IonLabel>
                                <IonTextarea value={message} onIonChange={(e) => setMessage(e.detail.value!)} rows={4} required />
                            </IonItem>
                            <IonButton expand="block" type="submit" className="mt-4">
                                Send Message
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard> 
                */}
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeContact /> : <WebContact />}</NoSSR>
}