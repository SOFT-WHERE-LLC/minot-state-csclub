"use client"

import Image from "next/image"
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
} from "@ionic/react"
import { openOutline, calendarOutline, hourglassOutline, cashOutline, peopleOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import Link from "next/link"
import PageHeader from "@/components/PageHeader"

const researchAreas = [
    {
        title: "Computer Science",
        topics: ["GenAI & Healthcare", "Deep Learning & Computer Vision"],
    },
    {
        title: "Chemistry & Biochemistry",
        topics: ["Quantum Chemical Simulations", "Model Drug Dynamics", "High-Throughput Drug Screening"],
    },
    {
        title: "Geography & GIS",
        topics: ["Geospatial Deep Learning"],
    },
    {
        title: "Materials Science",
        topics: ["Machine Learning Force Fields", "Superconducting Wire Assessment"],
    },
    {
        title: "Bioinformatics",
        topics: ["Phylogenomics"],
    },
]

const programHighlights = [
    { icon: cashOutline, text: "$6300 in summer stipend" },
    { icon: peopleOutline, text: "Free on-campus housing and meals" },
    { icon: openOutline, text: "Travel allowance" },
    { icon: calendarOutline, text: "Group activities and tours" },
    { icon: hourglassOutline, text: "Professional development" },
]

export default function ResearchOpportunity() {
    const content = (
        <div className="max-w-4xl mx-auto p-4">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-6">
                <Image
                    src="/UW-EauClaire-Research-2025.png"
                    alt="UW-Eau Claire campus view with NSF logo"
                    fill
                    className="object-fit"
                    priority
                />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Summer 2025: Research Experience for Undergraduates</h1>
                <h2 className="text-xl text-gray-600 mb-6">
                    Advancing High-Performance Computing Opportunities in Undergraduate Research at UW-Eau Claire
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-red-600 mb-4">Important Dates</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <IonIcon icon={calendarOutline} className="w-5 h-5 mr-2 text-gray-600" />
                                <span>Program: June 2 - August 1, 2025 (9 weeks)</span>
                            </li>
                            <li className="flex items-center">
                                <IonIcon icon={hourglassOutline} className="w-5 h-5 mr-2 text-gray-600" />
                                <span>Application Deadline: March 1, 2025</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-red-600 mb-4">Program Highlights</h3>
                        <ul className="space-y-2">
                            {programHighlights.map((highlight, index) => (
                                <li key={index} className="flex items-center">
                                    <IonIcon icon={highlight.icon} className="w-5 h-5 mr-2 text-gray-600" />
                                    <span>{highlight.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-red-600 mb-4">Research Areas</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {researchAreas.map((area) => (
                        <div key={area.title} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">{area.title}</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                {area.topics.map((topic) => (
                                    <li key={topic}>{topic}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-4">Eligibility</h3>
                <p className="mb-4">Enrolled college students who are US citizens or permanent residents.</p>
                <p className="mb-6">
                    Applicants from underrepresented minority groups, women, and first-generation college students are especially
                    encouraged to apply.
                </p>

                <div className="space-y-4">
                    <h4 className="font-semibold">Contact Information:</h4>
                    <div className="space-y-2">
                        <p>Dr. Rahul Gomes (gomesr@uwec.edu)</p>
                        <p>Dr. Ying Ma (yingma@uwec.edu)</p>
                    </div>
                    <a
                        href="https://hpc.uwec.edu/explore-opportunities/nsf-reu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Apply Now
                    </a>
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
                            <IonTitle>Research Opportunity</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">{content}</IonContent>
                </IonPage>
            ) : (
                <main className="flex-1">
                    <PageHeader
                        eyebrow="Research · Summer 2025"
                        title="Research Experience for Undergraduates"
                        description="Advancing High-Performance Computing Opportunities in Undergraduate Research at UW-Eau Claire."
                    >
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://hpc.uwec.edu/explore-opportunities/nsf-reu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                Program website
                                <IonIcon icon={openOutline} className="h-4 w-4" />
                            </a>
                            <Link href="/opportunities" className="btn-ghost-dark">
                                All opportunities
                            </Link>
                        </div>
                    </PageHeader>
                    <div className="page-shell">
                        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-6">
                                <section className="surface p-6 sm:p-8">
                                    <div className="grid gap-8 md:grid-cols-2">
                                        <div>
                                            <h2 className="text-lg font-semibold text-zinc-900">Important dates</h2>
                                            <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                                                <li className="flex items-start gap-3">
                                                    <IonIcon icon={calendarOutline} className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                                                    <span>Program: June 2 - August 1, 2025 (9 weeks)</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <IonIcon icon={hourglassOutline} className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                                                    <span>Application deadline: March 1, 2025</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-zinc-900">Program highlights</h2>
                                            <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                                                {programHighlights.map((highlight) => (
                                                    <li key={highlight.text} className="flex items-start gap-3">
                                                        <IonIcon icon={highlight.icon} className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                                                        <span>{highlight.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section className="surface p-6 sm:p-8">
                                    <h2 className="text-lg font-semibold text-zinc-900">Research areas</h2>
                                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                        {researchAreas.map((area) => (
                                            <div key={area.title} className="rounded-xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200">
                                                <h3 className="font-semibold text-zinc-900">{area.title}</h3>
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {area.topics.map((topic) => (
                                                        <span key={topic} className="chip">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="surface p-6 sm:p-8">
                                    <h2 className="text-lg font-semibold text-zinc-900">Eligibility</h2>
                                    <p className="mt-3 text-zinc-700">Enrolled college students who are US citizens or permanent residents.</p>
                                    <p className="mt-3 text-zinc-700">
                                        Applicants from underrepresented minority groups, women, and first-generation college students are
                                        especially encouraged to apply.
                                    </p>
                                </section>
                            </div>

                            <aside className="space-y-6">
                                <div className="surface overflow-hidden">
                                    <div className="relative aspect-[330/403] w-full bg-zinc-100">
                                        <Image
                                            src="/UW-EauClaire-Research-2025.png"
                                            alt="UW-Eau Claire campus view with NSF logo"
                                            fill
                                            sizes="20rem"
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className="surface p-6">
                                    <h2 className="font-semibold text-zinc-900">Contact</h2>
                                    <ul className="mt-3 space-y-2 text-sm">
                                        <li>
                                            Dr. Rahul Gomes
                                            <a href="mailto:gomesr@uwec.edu" className="link block">
                                                gomesr@uwec.edu
                                            </a>
                                        </li>
                                        <li>
                                            Dr. Ying Ma
                                            <a href="mailto:yingma@uwec.edu" className="link block">
                                                yingma@uwec.edu
                                            </a>
                                        </li>
                                    </ul>
                                    <a
                                        href="https://hpc.uwec.edu/explore-opportunities/nsf-reu/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary mt-6 w-full"
                                    >
                                        Apply now
                                    </a>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
            )}
        </NoSSR>
    )
}