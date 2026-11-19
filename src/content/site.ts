export const site = {
    name: 'Petra Konrádová',
    brand: 'PK-FIT',
    url: 'https://pk-fit.cz',
    phone: '+420 720 458 858',
    phoneHref: 'tel:+420720458858',
    email: 'info@pk-fit.cz',
    ico: '07044143',
    socials: {
        instagram: process.env.NEXT_PUBLIC_IG || undefined,
        facebook: process.env.NEXT_PUBLIC_FB || undefined,
    } as { instagram?: string; facebook?: string },
}
