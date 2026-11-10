"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn, isNativeApp } from "@/lib/utils"
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/react"
import { menuOutline, closeOutline, logoDiscord } from "ionicons/icons"
import NoSSR from "@/components/NoSSR"
import { routes, site } from "@/lib/site"

function isActive(pathname: string | null, href: string) {
    if (!pathname) return false
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Close the drawer whenever the route changes
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    const toggleMobileMenu = () => setMobileMenuOpen((open) => !open)

    const MobileMenu = () => (
        <div
            className={cn(
                "fixed inset-0 z-50 flex transition-opacity duration-200",
                mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={!mobileMenuOpen}
        >
            <div
                className={cn(
                    "flex h-full w-72 flex-col bg-zinc-950 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 ease-out",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <Image src="/brand/csclub-logo-sm.png" alt={site.name} width={120} height={63} className="h-9 w-auto" />
                    <button
                        onClick={toggleMobileMenu}
                        className="rounded-lg p-2 text-zinc-300 hover:bg-white/10 hover:text-white"
                        aria-label="Close menu"
                    >
                        <IonIcon icon={closeOutline} className="h-6 w-6" />
                    </button>
                </div>
                <nav className="flex flex-col gap-1 p-3">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive(pathname, route.href)
                                    ? "bg-brand-600/15 text-white ring-1 ring-inset ring-brand-500/40"
                                    : "text-zinc-300 hover:bg-white/5 hover:text-white",
                            )}
                            onClick={toggleMobileMenu}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto border-t border-white/10 p-5">
                    <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                        <IonIcon icon={logoDiscord} className="h-4 w-4" />
                        Join our Discord
                    </a>
                    <p className="mt-4 text-center font-mono text-xs text-zinc-500">
                        {site.meeting.day} · {site.meeting.time} · {site.meeting.place}
                    </p>
                </div>
            </div>
            <button className="flex-1 bg-black/60 backdrop-blur-sm" onClick={toggleMobileMenu} aria-label="Close menu" />
        </div>
    )

    // The drawer is rendered outside <header>: the header's backdrop-blur would otherwise trap the fixed overlay inside it
    const WebNavbar = () => (
        <>
        <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/95 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5">
                <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
                    <Image
                        src="/brand/csclub-logo-sm.png"
                        alt={site.longName}
                        width={240}
                        height={126}
                        className="h-11 w-auto"
                        priority
                    />
                </Link>
                <nav className="hidden items-center gap-1 lg:flex">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive(pathname, route.href) ? "text-white" : "text-zinc-400 hover:text-white",
                            )}
                        >
                            {route.label}
                            {isActive(pathname, route.href) && (
                                <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-brand-500" />
                            )}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <a
                        href={site.links.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary hidden px-4 py-2 sm:inline-flex"
                    >
                        <IonIcon icon={logoDiscord} className="h-4 w-4" />
                        Join Discord
                    </a>
                    <button
                        onClick={toggleMobileMenu}
                        className="rounded-lg p-2 text-zinc-300 hover:bg-white/10 hover:text-white lg:hidden"
                        aria-label="Open menu"
                    >
                        <IonIcon icon={menuOutline} className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
        <MobileMenu />
        </>
    )

    const NativeNavbar = () => (
        <IonHeader className="ion-no-border">
            <IonToolbar color="dark">
                <div className="flex items-center">
                    <Image src="/cs-club-logo.png" alt="CS Club Logo" width={30} height={30} className="mr-2" />
                    <IonTitle>MSU CS Club</IonTitle>
                </div>
                <IonButtons slot="start">
                    <IonButton onClick={toggleMobileMenu}>
                        <IonIcon icon={menuOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <MobileMenu />
        </IonHeader>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <NativeNavbar />
            ) : (
                <WebNavbar />
            )}
        </NoSSR>
    )
}
