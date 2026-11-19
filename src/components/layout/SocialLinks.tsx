import { site } from '@/content/site'
import { cn } from '@/lib/utils'

function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    )
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
            <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
        </svg>
    )
}

const links = [
    { label: 'Instagram', href: site.socials.instagram, Icon: InstagramIcon },
    { label: 'Facebook', href: site.socials.facebook, Icon: FacebookIcon },
]

export function SocialLinks({ className }: { className?: string }) {
    const available = links.filter((link) => link.href)
    if (available.length === 0) return null

    return (
        <ul className={cn('flex gap-2', className)}>
            {available.map(({ label, href, Icon }) => (
                <li key={label}>
                    <a
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary-ink"
                    >
                        <Icon />
                    </a>
                </li>
            ))}
        </ul>
    )
}
