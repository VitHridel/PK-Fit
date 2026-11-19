import '@testing-library/jest-dom/vitest'

// jsdom has no IntersectionObserver; Motion's whileInView needs one to mount.
class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
        return []
    }
}
globalThis.IntersectionObserver ??=
    IntersectionObserverStub as unknown as typeof IntersectionObserver
