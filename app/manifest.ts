import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ResumeForge — Professional Resume Templates',
    short_name: 'ResumeForge',
    description: 'Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0B',
    theme_color: '#FF5C00',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
