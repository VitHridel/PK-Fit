import createCache from '@emotion/cache'

const isBrowser = typeof document !== 'undefined'

export default function createEmotionCache() {
    let insertionPoint: HTMLElement | undefined

    if (isBrowser) {
        const emotionInsertionPoint = document.getElementById('emotion-insertion-point')
        insertionPoint = emotionInsertionPoint ?? undefined
    }

    return createCache({ key: 'mui-style', insertionPoint, prepend: true })
}
