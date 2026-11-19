export type NavItem = { label: string; href: string; sectionId?: string }

export const navItems: NavItem[] = [
    { label: 'služby', href: '/#sluzby', sectionId: 'sluzby' },
    { label: 'kurzy', href: '/#kurzy', sectionId: 'kurzy' },
    { label: 'o mně', href: '/#o-mne', sectionId: 'o-mne' },
    { label: 'semináře', href: '/#seminare', sectionId: 'seminare' },
    { label: 'reference', href: '/#reference', sectionId: 'reference' },
    { label: 'blog', href: '/blog' },
    { label: 'kontakt', href: '/#kontakt', sectionId: 'kontakt' },
]

const primaryLabels = ['služby', 'kurzy', 'o mně', 'kontakt']

export const mobilePrimaryNav: NavItem[] = navItems.filter((item) =>
    primaryLabels.includes(item.label),
)

export const mobileMoreNav: NavItem[] = navItems.filter(
    (item) => !primaryLabels.includes(item.label),
)
