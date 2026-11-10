"use client"

import { useEffect, useState } from "react"
import {
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
} from "@ionic/react"
import membersData from "@/data/members.json"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import PageHeader from "@/components/PageHeader"

type Member = {
    _id: string
    name: string
    email: string
    role: string
}

export default function MembersList() {
    const [members, setMembers] = useState<Member[]>([])

    useEffect(() => {
        setMembers(membersData)
    }, [])

    const NativeContent = () => (
        <IonContent>
            <div className="p-8">
                <h2 className="text-4xl font-bold mb-4">CS Club Members</h2>
                <IonList>
                    {members.map((member) => (
                        <IonItem key={member._id}>
                            <IonLabel>
                                <h2>{member.name}</h2>
                                <p>Email: {member.email}</p>
                                <p>Role: {member.role}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </div>
        </IonContent>
    )

    const WebContent = () => (
        <main className="flex-1">
            <PageHeader eyebrow="People" title="Members" description="The officers and members who keep the CS Club running." />
            <div className="page-shell">
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => {
                        const officer = member.role.toLowerCase() !== "member"
                        const initials = member.name
                            .split(" ")
                            .map((part) => part.charAt(0))
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        return (
                            <li key={member._id} className="surface flex items-center gap-4 p-5">
                                <span
                                    className={
                                        officer
                                            ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 font-semibold text-white"
                                            : "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-600 ring-1 ring-inset ring-zinc-200"
                                    }
                                >
                                    {initials}
                                </span>
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="font-semibold text-zinc-900">{member.name}</h2>
                                        {officer && <span className="chip">{member.role}</span>}
                                    </div>
                                    <a href={`mailto:${member.email}`} className="mt-0.5 block truncate text-sm text-zinc-500 transition hover:text-brand-600">
                                        {member.email}
                                    </a>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    )

    return <NoSSR>{isNativeApp() ? <NativeContent /> : <WebContent />}</NoSSR>
}