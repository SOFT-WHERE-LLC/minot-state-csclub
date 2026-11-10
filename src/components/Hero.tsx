"use client"

import Image from "next/image"
import Link from "next/link"
import { IonIcon } from "@ionic/react"
import { arrowForwardOutline, logoDiscord } from "ionicons/icons"
import { site } from "@/lib/site"

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-zinc-950 text-white">
            <div className="absolute inset-0 -z-10 bg-grid bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
            <div className="absolute -right-40 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-600/30 blur-[120px]" />
            <div className="absolute -left-40 bottom-0 -z-10 h-72 w-72 rounded-full bg-brand-800/30 blur-[100px]" />

            <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-24">
                <div>
                    <p className="eyebrow text-brand-400">Minot State University · Computer Science Club</p>
                    <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                        Learn by building.
                        <span className="block text-zinc-400">Build with friends.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
                        Weekly meetings, hands-on projects, research and competitions for students at every skill level. No
                        experience required, just curiosity.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3 text-base">
                            <IonIcon icon={logoDiscord} className="h-5 w-5" />
                            Join our Discord
                        </a>
                        <Link href="#projects" className="btn-ghost-dark px-6 py-3 text-base">
                            See what we do
                            <IonIcon icon={arrowForwardOutline} className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-10 max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] font-mono text-sm shadow-2xl">
                        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                            <span className="ml-2 text-xs text-zinc-500">next-meeting.sh</span>
                        </div>
                        <div className="space-y-1 px-4 py-4 text-zinc-300">
                            <p>
                                <span className="text-brand-400">$</span> csclub --next-meeting
                            </p>
                            <p>
                                <span className="text-zinc-500">when </span>
                                {site.meeting.day} @ {site.meeting.time}
                            </p>
                            <p>
                                <span className="text-zinc-500">where</span> {site.meeting.place}
                            </p>
                            <p>
                                <span className="text-zinc-500">who  </span> everyone&apos;s welcome
                                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-brand-500" />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm lg:max-w-none">
                    <div className="absolute inset-8 -z-10 rounded-full bg-brand-600/30 blur-3xl" />
                    <Image
                        src="/brand/mascot.png"
                        alt="The CS Club beaver mascot typing on a keyboard"
                        width={900}
                        height={804}
                        priority
                        className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                    />
                </div>
            </div>
        </section>
    )
}
