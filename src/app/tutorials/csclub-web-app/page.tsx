"use client"

import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import Link from "next/link"
import { IonIcon } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons"
import PageHeader from "@/components/PageHeader"
import { site } from "@/lib/site"

export default function CSClubAppTutorial() {
    const WebTutorial = () => {
        const steps = [
            {
                title: "Prerequisites",
                body: (
                    <ul className="space-y-2">
                        <li>
                            Install{" "}
                            <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="link">
                                Visual Studio Code
                            </a>{" "}
                            for code editing.
                        </li>
                        <li>
                            Install{" "}
                            <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="link">
                                Node.js
                            </a>{" "}
                            (LTS version recommended).
                        </li>
                        <li>
                            Optionally, install{" "}
                            <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="link">
                                Git
                            </a>{" "}
                            if it&apos;s not already installed.
                        </li>
                    </ul>
                ),
            },
            {
                title: "Clone the repository",
                body: <p>Open a terminal or command prompt and run the following command to clone the CS Club web app repository:</p>,
                code: "git clone https://github.com/MSUCSClub/csclub-web-app.git",
            },
            {
                title: "Navigate to the project directory",
                body: <p>Change into the project directory using the following command:</p>,
                code: "cd csclub-web-app",
            },
            {
                title: "Install dependencies",
                body: <p>Run the following command to install the necessary packages:</p>,
                code: "npm install",
            },
            {
                title: "Run the development server",
                body: (
                    <p>
                        Start the development server, then open{" "}
                        <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="link">
                            http://localhost:3000
                        </a>{" "}
                        in your browser to see the application running.
                    </p>
                ),
                code: "npm run dev",
            },
            {
                title: "Next.js resources",
                body: (
                    <ul className="space-y-2">
                        <li>
                            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="link">
                                Official Next.js Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer" className="link">
                                Next.js Learning Path
                            </a>
                        </li>
                        <li>
                            <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" className="link">
                                React Documentation
                            </a>
                        </li>
                    </ul>
                ),
            },
        ]

        return (
            <main className="flex-1">
                <PageHeader
                    eyebrow="Tutorial · Web development"
                    title="CS Club App Setup Guide"
                    description="Clone the CS Club web app and get it running on your own machine in a few minutes."
                />
                <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
                    <Link href="/tutorials" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-brand-600">
                        <IonIcon icon={arrowBackOutline} className="h-4 w-4" />
                        All tutorials
                    </Link>
                    <ol className="mt-8 space-y-6">
                        {steps.map((step, index) => (
                            <li key={step.title} className="surface p-6 sm:p-8">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-mono text-sm font-semibold text-white">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-lg font-semibold text-zinc-900">{step.title}</h2>
                                </div>
                                <div className="mt-4 text-[15px] leading-relaxed text-zinc-700">{step.body}</div>
                                {step.code && (
                                    <pre className="code-block mt-4">
                                        <span className="select-none text-brand-400">$ </span>
                                        {step.code}
                                    </pre>
                                )}
                            </li>
                        ))}
                    </ol>
                    <p className="mt-8 rounded-xl bg-zinc-100 px-5 py-4 text-sm text-zinc-600">
                        Stuck? Check the repository&apos;s README, or ask in the{" "}
                        <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="link">
                            club Discord
                        </a>
                        .
                    </p>
                </div>
            </main>
        )
    }

const NativeTutorial = () => (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>CS Club App Setup Guide</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2 className="text-2xl font-bold mb-4">CS Club App Setup Guide</h2>
                <p className="mb-4">
                    This tutorial will guide you through the steps to clone the CS Club web app and get it running on your local
                    machine.
                </p>

                <IonList>
                    <IonItem>
                        <IonLabel>
                            <h2 className="font-semibold">1. Prerequisites</h2>
                            <ul className="list-disc pl-4">
                                <li>Install Visual Studio Code for code editing.</li>
                                <li>Install Node.js (LTS version recommended).</li>
                                <li>Optionally, install Git if it's not already installed.</li>
                            </ul>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2 className="font-semibold">2. Clone the Repository</h2>
                            <p>Open a terminal and run:</p>
                            <pre className="bg-gray-100 p-2 rounded my-2">
                                git clone https://github.com/MSUCSClub/csclub-web-app.git
                            </pre>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2 className="font-semibold">3. Navigate to the Project Directory</h2>
                            <pre className="bg-gray-100 p-2 rounded my-2">cd csclub-web-app</pre>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2 className="font-semibold">4. Install Dependencies</h2>
                            <pre className="bg-gray-100 p-2 rounded my-2">npm install</pre>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2 className="font-semibold">5. Run the Development Server</h2>
                            <pre className="bg-gray-100 p-2 rounded my-2">npm run dev</pre>
                            <p>Open your browser and visit http://localhost:3000</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2 className="font-semibold">6. Next.js Resources</h2>
                            <ul className="list-disc pl-4">
                                <li>Official Next.js Documentation</li>
                                <li>Next.js Learning Path</li>
                                <li>React Documentation</li>
                            </ul>
                        </IonLabel>
                    </IonItem>
                </IonList>

                <p className="mt-4">
                    If you encounter any issues, please refer to the repository's README file or reach out to the CS Club for
                    support.
                </p>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeTutorial /> : <WebTutorial />}</NoSSR>
}