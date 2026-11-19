import { defineConfig, devices } from '@playwright/test'

const PORT = 3100

export default defineConfig({
    testDir: 'tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
    },
    projects: [
        {
            name: 'desktop',
            use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
        },
        {
            name: 'mobile',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 390, height: 844 },
                isMobile: true,
                hasTouch: true,
            },
        },
    ],
    webServer: {
        command: `pnpm build && pnpm start -p ${PORT}`,
        url: `http://localhost:${PORT}`,
        timeout: 240_000,
        reuseExistingServer: !process.env.CI,
        env: {
            BLOG_SOURCE: 'mock',
            ALLOW_MOCK_BLOG: '1',
            MAIL_TRANSPORT: 'json',
            NEXT_PUBLIC_TURNSTILE_SITEKEY: '1x00000000000000000000AA',
            TURNSTILE_SECRETKEY: '1x0000000000000000000000000000000AA',
            SMTP_SENDER: 'test@pk-fit.cz',
            NEXT_PUBLIC_IG: 'https://instagram.com/test',
            NEXT_PUBLIC_FB: 'https://facebook.com/test',
        },
    },
})
