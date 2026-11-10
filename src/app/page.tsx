"use client"

import Link from "next/link"
import { IonIcon } from "@ionic/react"
import {
    arrowForwardOutline,
    bookOutline,
    briefcaseOutline,
    codeSlashOutline,
    documentTextOutline,
    gameControllerOutline,
    hardwareChipOutline,
    logoDiscord,
    logoInstagram,
    mailOutline,
    sparklesOutline,
    trophyOutline,
} from "ionicons/icons"
import Hero from "@/components/Hero"
import { site } from "@/lib/site"

const focusAreas = [
    {
        icon: sparklesOutline,
        title: "AI & data science research",
        description: "Dig into AI and data science projects and find undergraduate research programs to apply for.",
        href: "/opportunities",
        cta: "Research opportunities",
    },
    {
        icon: codeSlashOutline,
        title: "Web app development",
        description: "Build and ship real apps, starting with the club's own website. Bring an idea or join one.",
        href: "/tutorials/csclub-web-app",
        cta: "Set up the club app",
    },
    {
        icon: hardwareChipOutline,
        title: "Robotics",
        description: "Sensors, Raspberry Pi and computer vision: write code that moves things in the real world.",
        href: "/tutorials",
        cta: "Robotics tutorials",
    },
    {
        icon: trophyOutline,
        title: "MICS competitions",
        description: "Represent Minot State at the Midwest Instruction and Computing Symposium contests.",
        href: "/mics",
        cta: "About MICS",
    },
]

const perks = [
    "Weekly meetings and workshops",
    "Hands-on programming projects",
    "Networking with industry professionals",
    "Access to learning resources and tutorials",
]

const explore = [
    { icon: bookOutline, title: "Tutorials", description: "Curated guides from web dev to 3D printing.", href: "/tutorials" },
    { icon: gameControllerOutline, title: "Games", description: "Browser games built by club members.", href: "/games" },
    { icon: briefcaseOutline, title: "Opportunities", description: "Research programs, internships and more.", href: "/opportunities" },
    { icon: documentTextOutline, title: "Documents", description: "Our constitution and club paperwork.", href: "/clubdocuments" },
]

export default function Home() {
    return (
        <main className="flex flex-1 flex-col">
            <Hero />

            {/* What we work on */}
            <section id="projects" className="scroll-mt-20">
                <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
                    <div className="max-w-2xl">
                        <p className="eyebrow">What we work on</p>
                        <h2 className="section-title mt-3">Pick a lane, or try them all</h2>
                        <p className="mt-4 text-lg text-zinc-600">
                            We&apos;re always looking for people to help with these projects. Show up to a meeting and jump in.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {focusAreas.map((area) => (
                            <Link key={area.title} href={area.href} className="surface surface-hover group flex flex-col p-6">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                                    <IonIcon icon={area.icon} className="h-5 w-5" />
                                </span>
                                <h3 className="mt-5 text-lg font-semibold text-zinc-900">{area.title}</h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{area.description}</p>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                                    {area.cta}
                                    <IonIcon icon={arrowForwardOutline} className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why join */}
            <section className="border-y border-zinc-200 bg-white">
                <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 sm:py-24 lg:grid-cols-2">
                    <div>
                        <p className="eyebrow">Why join</p>
                        <h2 className="section-title mt-3">Welcome to the MSU CS Club</h2>
                        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                            Join us in exploring the world of computer science. The club offers opportunities for learning,
                            collaboration and growth across every area of technology, whether you&apos;re a CS major or just
                            curious.
                        </p>
                        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                            {perks.map((perk) => (
                                <li key={perk} className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                                    <span className="text-sm font-medium text-zinc-800">{perk}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {explore.map((item) => (
                            <Link key={item.href} href={item.href} className="surface surface-hover group p-6">
                                <IonIcon icon={item.icon} className="h-6 w-6 text-zinc-400 transition group-hover:text-brand-600" />
                                <h3 className="mt-4 font-semibold text-zinc-900">{item.title}</h3>
                                <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
                <div className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-14 text-white sm:px-12">
                    <div className="absolute inset-0 -z-10 bg-grid bg-grid opacity-60" />
                    <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-600/40 blur-3xl" />
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-xl">
                            <p className="eyebrow text-brand-400">Come say hi</p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                {site.meeting.day} at {site.meeting.time} in {site.meeting.place}
                            </h2>
                            <p className="mt-4 text-zinc-300">
                                Drop in any week. Hang out on Discord between meetings and follow along on Instagram.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-3">
                                <IonIcon icon={logoDiscord} className="h-5 w-5" />
                                Discord
                            </a>
                            <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark px-5 py-3">
                                <IonIcon icon={logoInstagram} className="h-5 w-5" />
                                Instagram
                            </a>
                            <a href={`mailto:${site.email}`} className="btn-ghost-dark px-5 py-3">
                                <IonIcon icon={mailOutline} className="h-5 w-5" />
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
