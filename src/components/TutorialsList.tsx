"use client"

import Link from "next/link"
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
} from "@ionic/react"
import { arrowForwardOutline, openOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import PageHeader from "@/components/PageHeader"
import NoSSR from "@/components/NoSSR"

const tutorials = [
    {
        title: "CS Club App Setup",
        path: "/tutorials/csclub-web-app",
        description: "Learn how to clone, set up, and run the CS Club web app locally.",
        category: "Web Development",
    },
    {
        title: "Getting Started with Next.js",
        path: "https://nextjs.org/docs",
        description: "Official Next.js documentation to help you get started with your Next.js projects.",
        category: "Web Development",
    },
    {
        title: "React Beginner's Guide",
        path: "https://react.dev/learn",
        description: "A comprehensive guide to learning React, the library used by Next.js.",
        category: "Web Development",
    },
    {
        title: "Node.js Basics",
        path: "https://nodejs.dev/en/learn",
        description: "Learn the fundamentals of Node.js, a JavaScript runtime for server-side development.",
        category: "Web Development",
    },
    {
        title: "Git and GitHub Guide",
        path: "https://docs.github.com/en/get-started",
        description: "Understand the basics of Git and GitHub for version control and collaboration.",
        category: "Version Control",
    },
    {
        title: "Python Data Science Fundamentals",
        path: "https://www.datacamp.com/courses/intro-to-python-for-data-science",
        description: "Learn the basics of data science using Python, including pandas, numpy, and matplotlib.",
        category: "Data Science",
    },
    {
        title: "Machine Learning with Scikit-learn",
        path: "https://scikit-learn.org/stable/tutorial/index.html",
        description: "Introduction to machine learning algorithms using Scikit-learn in Python.",
        category: "Data Science",
    },
    {
        title: "Data Visualization with Plotly",
        path: "https://plotly.com/python/",
        description: "Create interactive and beautiful data visualizations using Plotly in Python.",
        category: "Data Science",
    },
    {
        title: "Capacitor Mobile App Development",
        path: "https://capacitorjs.com/docs/getting-started",
        description: "Build cross-platform mobile apps using Capacitor and web technologies.",
        category: "Mobile Development",
    },
    {
        title: "Ionic Framework with Capacitor",
        path: "https://ionicframework.com/docs/intro",
        description: "Learn how to use Ionic Framework with Capacitor for mobile app development.",
        category: "Mobile Development",
    },
    {
        title: "Native APIs with Capacitor",
        path: "https://capacitorjs.com/docs/apis",
        description: "Explore how to access native device features using Capacitor plugins.",
        category: "Mobile Development",
    },
    {
        title: "3D Printing Basics with Bamboo Lab X1 Plus",
        path: "https://www.bambulab.com/en/x1-series",
        description: "Get started with 3D printing using the Bamboo Lab X1 Plus printer.",
        category: "3D Printing",
    },
    {
        title: "3D Modeling for Printing",
        path: "https://www.autodesk.com/solutions/3d-printing-software",
        description: "Learn 3D modeling techniques specifically for 3D printing projects.",
        category: "3D Printing",
    },
    {
        title: "Advanced 3D Printing Techniques",
        path: "https://all3dp.com/2/advanced-3d-printing-techniques/",
        description: "Explore advanced techniques and materials for 3D printing.",
        category: "3D Printing",
    },
    {
        title: "Robotics with Raspberry Pi",
        path: "https://projects.raspberrypi.org/en/projects/robotics-with-python",
        description: "Build and program robots using Raspberry Pi and Python.",
        category: "Robotics",
    },
    {
        title: "Sensor Integration for Raspberry Pi Robots",
        path: "https://www.tomshardware.com/how-to/connect-sensors-raspberry-pi",
        description: "Learn how to integrate various sensors into your Raspberry Pi robotics projects.",
        category: "Robotics",
    },
    {
        title: "Computer Vision for Robotics",
        path: "https://opencv.org/courses/",
        description: "Implement computer vision techniques in your robotics projects using OpenCV.",
        category: "Robotics",
    },
];

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-")

export default function TutorialsList() {
    const WebTutorials = () => (
        <main className="flex-1">
            <PageHeader
                eyebrow="Learn"
                title="Tutorials"
                description="Hand-picked guides for the things we build in the club, from your first web app to robots and 3D printing."
            >
                <div className="flex flex-wrap gap-2">
                    {Object.keys(groupTutorialsByCategory()).map((category) => (
                        <a
                            key={category}
                            href={`#${slug(category)}`}
                            className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-zinc-200 transition hover:border-brand-400 hover:text-white"
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </PageHeader>
            <div className="page-shell space-y-16">
                {Object.entries(groupTutorialsByCategory()).map(([category, categoryTutorials]) => (
                    <section key={category} id={slug(category)} className="scroll-mt-24">
                        <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-3">
                            <h2 className="text-xl font-semibold text-zinc-900">{category}</h2>
                            <span className="font-mono text-xs text-zinc-500">
                                {categoryTutorials.length} {categoryTutorials.length === 1 ? "guide" : "guides"}
                            </span>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {categoryTutorials.map((tutorial) => {
                                const external = tutorial.path.startsWith("http")
                                const card = (
                                    <>
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-semibold text-zinc-900 transition group-hover:text-brand-600">
                                                {tutorial.title}
                                            </h3>
                                            <IonIcon
                                                icon={external ? openOutline : arrowForwardOutline}
                                                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition group-hover:text-brand-600"
                                            />
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{tutorial.description}</p>
                                        <p className="mt-4 font-mono text-xs text-zinc-400">
                                            {external ? new URL(tutorial.path).hostname.replace(/^www\./, "") : "club guide"}
                                        </p>
                                    </>
                                )
                                return external ? (
                                    <a
                                        key={tutorial.title}
                                        href={tutorial.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="surface surface-hover group block p-6"
                                    >
                                        {card}
                                    </a>
                                ) : (
                                    <Link key={tutorial.title} href={tutorial.path} className="surface surface-hover group block p-6">
                                        {card}
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    )

const NativeTutorials = () => (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tutorials</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {Object.entries(groupTutorialsByCategory()).map(([category, categoryTutorials]) => (
                    <div key={category} className="mb-4">
                        <h2 className="text-xl font-semibold px-4 py-2 bg-gray-100">{category}</h2>
                        <IonList>
                            {categoryTutorials.map((tutorial, index) => (
                                <IonCard key={index}>
                                    <IonCardHeader>
                                        <IonCardTitle>{tutorial.title}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>{tutorial.description}</p>
                                        <IonItem
                                            href={tutorial.path}
                                            target={tutorial.path.startsWith("http") ? "_blank" : undefined}
                                            detail={true}
                                            lines="none"
                                            className="mt-2"
                                        >
                                            <IonLabel color="primary">View Tutorial</IonLabel>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            ))}
                        </IonList>
                    </div>
                ))}
            </IonContent>
        </IonPage>
    )

    function groupTutorialsByCategory() {
        return tutorials.reduce(
            (acc, tutorial) => {
                if (!acc[tutorial.category]) {
                    acc[tutorial.category] = []
                }
                acc[tutorial.category].push(tutorial)
                return acc
            },
            {} as Record<string, typeof tutorials>,
        )
    }

    return <NoSSR>{isNativeApp() ? <NativeTutorials /> : <WebTutorials />}</NoSSR>
}