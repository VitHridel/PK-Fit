const longDate = new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Prague',
})

/** `2026-11-10T08:00:00Z` → `10. listopadu 2026` (Prague time). */
export function formatLongDate(iso: string): string {
    return longDate.format(new Date(iso))
}
