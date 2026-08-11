import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';
import netlify from '@astrojs/netlify';

// Detecta os ambientes
const isVercel = process.env.VERCEL === '1';
const isNetlify = process.env.NETLIFY === 'true'; // Detecta se está no build real do Netlify
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
    output: 'static',

    // Só aplica adaptadores se NÃO estiver em modo dev ou se estiver explicitamente na Vercel/Netlify
    adapter: isVercel 
        ? vercel({
            webAnalytics: { enabled: true },
            imagesConfig: {
                sizes: [320, 640, 1280, 1920],
                formats: ['image/avif', 'image/webp'],
                minimumCacheTTL: 60 * 60 * 24 * 30,
            }
        }) 
        : (isNetlify ? netlify() : undefined), 

    integrations: [react()],

    vite: {
        plugins: [tailwindcss()],
        build: {
            cssMinify: 'lightningcss',
            chunkSizeWarningLimit: 500
        }
    }
});
