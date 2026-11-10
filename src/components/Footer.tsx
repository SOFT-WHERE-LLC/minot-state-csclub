"use client"

import Link from "next/link"
import Image from "next/image"
import { IonFooter, IonToolbar, IonTitle, IonIcon } from "@ionic/react"
import { logoDiscord, logoGithub, logoInstagram, mailOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import { routes, site } from "@/lib/site"

const connect = [
    { href: site.links.discord, label: "Discord", icon: logoDiscord, external: true },
    { href: site.links.github, label: "GitHub", icon: logoGithub, external: true },
    { href: site.links.instagram, label: "Instagram", icon: logoInstagram, external: true },
    { href: `mailto:${site.email}`, label: "Email us", icon: mailOutline, external: false },
]

const more = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/opportunities/research", label: "Research" },
    { href: "/signin", label: "Member sign in" },
]

export default function Footer() {
    const WebFooter = () => (
        <footer className="mt-auto w-full bg-zinc-950 text-zinc-400">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div className="col-span-2 md:col-span-1">
                    <Image
                        src="/brand/csclub-logo-sm.png"
                        alt={site.longName}
                        width={240}
                        height={126}
                        className="h-14 w-auto"
                    />
                    <p className="mt-5 max-w-xs text-sm leading-relaxed">
                        A student community for anyone at Minot State who wants to build, learn and ship things with code.
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                        {site.meeting.day} · {site.meeting.time} · {site.meeting.place}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-white">Explore</h3>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {routes.map((route) => (
                            <li key={route.href}>
                                <Link href={route.href} className="transition hover:text-white">
                                    {route.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-white">Club</h3>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {more.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="transition hover:text-white">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-white">Connect</h3>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {connect.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="inline-flex items-center gap-2 transition hover:text-white"
                                >
                                    <IonIcon icon={item.icon} className="h-4 w-4" />
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} {site.longName}.</p>
                    <p className="font-mono text-zinc-500">Built by students, for students.</p>
                </div>
            </div>
        </footer>
    )

    const NativeFooter = () => (
        <IonFooter className="ion-no-border">
            <IonToolbar>
                <IonTitle size="small" className="text-center">
                    © {new Date().getFullYear()} MSU CS Club
                </IonTitle>
            </IonToolbar>
        </IonFooter>
    )

    return <NoSSR>{isNativeApp() ? <NativeFooter /> : <WebFooter />}</NoSSR>
}
