import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'main-craft.cms-craft.com' }],
    },
}

export default nextConfig
