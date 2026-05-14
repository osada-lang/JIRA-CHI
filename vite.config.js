import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        service: resolve(__dirname, 'service.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        flow: resolve(__dirname, 'flow.html'),
        faq: resolve(__dirname, 'faq.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        'portfolio/autorace': resolve(__dirname, 'portfolio/autorace.html'),
        'portfolio/jirachi-site': resolve(__dirname, 'portfolio/jirachi-site.html'),
        'portfolio/leader-diagnosis': resolve(__dirname, 'portfolio/leader-diagnosis.html'),
        'portfolio/nekozoroe': resolve(__dirname, 'portfolio/nekozoroe.html'),
        'portfolio/take-international': resolve(__dirname, 'portfolio/take-international.html'),
        'portfolio/vivre-card': resolve(__dirname, 'portfolio/vivre-card.html'),
        'portfolio/cookie': resolve(__dirname, 'portfolio/cookie.html'),
        'portfolio/cookie-support': resolve(__dirname, 'portfolio/cookie-support.html'),
        'portfolio/cookie-privacy': resolve(__dirname, 'portfolio/cookie-privacy.html'),
        'portfolio/autorace-support': resolve(__dirname, 'portfolio/autorace-support.html'),
        'portfolio/autorace-privacy': resolve(__dirname, 'portfolio/autorace-privacy.html'),
        'portfolio/nekozoroe-support': resolve(__dirname, 'portfolio/nekozoroe-support.html'),
        'portfolio/nekozoroe-privacy': resolve(__dirname, 'portfolio/nekozoroe-privacy.html'),
        'portfolio/vivre-card-support': resolve(__dirname, 'portfolio/vivre-card-support.html'),
        'portfolio/vivre-card-privacy': resolve(__dirname, 'portfolio/vivre-card-privacy.html'),
      },
    },
  },
});
