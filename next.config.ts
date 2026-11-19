import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            // Keep viewBox and drop fixed width/height so SVGs scale with CSS.
                            dimensions: false,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: { overrides: { removeViewBox: false } },
                                    },
                                    // Unique, file-based ids so gradients in different inline SVGs
                                    // (logo, logo mark) never collide on one page.
                                    'prefixIds',
                                ],
                            },
                        },
                    },
                ],
                as: '*.js',
            },
        },
    },
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'main-craft.cms-craft.com' }],
    },
}

export default nextConfig
