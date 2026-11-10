import type { ReactNode } from "react"

type PageHeaderProps = {
    eyebrow?: string
    title: string
    description?: ReactNode
    children?: ReactNode
}

/** Dark title band used at the top of every inner page. */
export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
    return (
        <section className="relative isolate overflow-hidden bg-zinc-950 text-white">
            <div className="absolute inset-0 -z-10 bg-grid bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="absolute -top-32 left-1/2 -z-10 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
            <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-14 sm:pb-16 sm:pt-20">
                {eyebrow && <p className="eyebrow text-brand-400">{eyebrow}</p>}
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
                {description && <p className="mt-4 max-w-2xl text-lg text-zinc-300">{description}</p>}
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    )
}
