"use client"

import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonIcon } from "@ionic/react"
import { documentTextOutline, downloadOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import PageHeader from "@/components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const documents = [
    {
        title: "Club Constitution",
        description: "The official constitution and bylaws of the Minot State CS Club.",
        path: "/2025CSClubConstitution.pdf",
        lastUpdated: "2025",
    },
]

export default function ClubDocuments() {
    const content = (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Club Documents</h1>
                <p className="text-gray-600 mb-8">
                    Access important CS Club documents and resources. These documents govern our organization and outline our
                    operational procedures.
                </p>

                <div className="grid gap-4">
                    {documents.map((doc) => (
                        <Link key={doc.title} href={doc.path} className="flex items-center gap-2">
                            <Card key={doc.title} className="transition-all hover:shadow-lg w-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <IonIcon icon={documentTextOutline} className="w-5 h-5 text-red-600" />
                                        {doc.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <p className="text-gray-600 mb-2">{doc.description}</p>
                                            <p className="text-sm text-gray-500">Last Updated: {doc.lastUpdated}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
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
                            <IonTitle>Club Documents</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">{content}</IonContent>
                </IonPage>
            ) : (
                <main className="flex-1">
                    <PageHeader
                        eyebrow="Governance"
                        title="Club Documents"
                        description="The documents that govern our organization and outline how the club runs."
                    />
                    <div className="page-shell">
                        <div className="grid gap-5 md:grid-cols-2">
                            {documents.map((doc) => (
                                <a
                                    key={doc.title}
                                    href={doc.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="surface surface-hover group flex items-start gap-5 p-6"
                                >
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                                        <IonIcon icon={documentTextOutline} className="h-6 w-6" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="font-semibold text-zinc-900 transition group-hover:text-brand-600">{doc.title}</h2>
                                        <p className="mt-1 text-sm text-zinc-600">{doc.description}</p>
                                        <p className="mt-4 flex items-center gap-3 font-mono text-xs text-zinc-500">
                                            <span>PDF</span>
                                            <span className="h-1 w-1 rounded-full bg-zinc-300" />
                                            <span>Updated {doc.lastUpdated}</span>
                                        </p>
                                    </div>
                                    <IonIcon
                                        icon={downloadOutline}
                                        className="h-5 w-5 shrink-0 text-zinc-400 transition group-hover:text-brand-600"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </main>
            )}
        </NoSSR>
    )
}