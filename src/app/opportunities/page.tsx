"use client"

import Link from "next/link"
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
    IonIcon,
} from "@ionic/react"
import { arrowForwardOutline, calendarOutline, hourglassOutline } from "ionicons/icons"
import PageHeader from "@/components/PageHeader"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import { opportunitySections, type OpportunitySection, type Opportunity } from "@/data/opportunities"

export default function OpportunitiesPage() {
    const content = (
        <div className="max-w-6xl mx-auto px-4">
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
                    <h1 className="text-4xl font-bold text-white mb-4">Opportunities</h1>
                    <p className="text-xl text-white/90 mb-8">
                        Discover opportunities for growth, learning, and advancement in computer science.
                    </p>

                    <div className="space-y-12">
                        {opportunitySections.map((section: OpportunitySection) => (
                            <div key={section.id} className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                <p className="text-gray-600 mb-6">{section.description}</p>

                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {section.opportunities.map((opportunity: Opportunity) => (
                                        <Link key={opportunity.id} href={opportunity.path}>
                                            <div className="block h-full transition-transform hover:scale-105">
                                                <div className="h-full border border-gray-200 rounded-lg p-6 hover:border-red-600">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                                                    <p className="text-gray-600 mb-4">{opportunity.description}</p>
                                                    {(opportunity.date || opportunity.deadline) && (
                                                        <div className="space-y-2">
                                                            {opportunity.date && (
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <IonIcon icon={calendarOutline} className="w-4 h-4 mr-2" />
                                                                    <span>{opportunity.date}</span>
                                                                </div>
                                                            )}
                                                            {opportunity.deadline && (
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <IonIcon icon={hourglassOutline} className="w-4 h-4 mr-2" />
                                                                    <span>Deadline: {opportunity.deadline}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Opportunities</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">{content}</IonContent>
                </IonPage>
            ) : (
                <main className="flex-1">
                    <PageHeader
                        eyebrow="Grow"
                        title="Opportunities"
                        description="Research programs, competitions and other ways to grow in computer science beyond the classroom."
                    />
                    <div className="page-shell space-y-14">
                        {opportunitySections.map((section: OpportunitySection) => (
                            <section key={section.id}>
                                <h2 className="section-title">{section.title}</h2>
                                <p className="mt-2 max-w-2xl text-zinc-600">{section.description}</p>
                                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                    {section.opportunities.map((opportunity: Opportunity) => (
                                        <Link
                                            key={opportunity.id}
                                            href={opportunity.path}
                                            className="surface surface-hover group flex flex-col p-6"
                                        >
                                            <h3 className="text-lg font-semibold text-zinc-900 transition group-hover:text-brand-600">
                                                {opportunity.title}
                                            </h3>
                                            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{opportunity.description}</p>
                                            {(opportunity.date || opportunity.deadline) && (
                                                <dl className="mt-5 space-y-2 border-t border-zinc-100 pt-4 text-sm">
                                                    {opportunity.date && (
                                                        <div className="flex items-center gap-2 text-zinc-600">
                                                            <IonIcon icon={calendarOutline} className="h-4 w-4 text-zinc-400" />
                                                            <dt className="sr-only">Dates</dt>
                                                            <dd>{opportunity.date}</dd>
                                                        </div>
                                                    )}
                                                    {opportunity.deadline && (
                                                        <div className="flex items-center gap-2 text-zinc-600">
                                                            <IonIcon icon={hourglassOutline} className="h-4 w-4 text-zinc-400" />
                                                            <dt>Deadline:</dt>
                                                            <dd>{opportunity.deadline}</dd>
                                                        </div>
                                                    )}
                                                </dl>
                                            )}
                                            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                                                Learn more
                                                <IonIcon icon={arrowForwardOutline} className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </main>
            )}
        </NoSSR>
    )
}