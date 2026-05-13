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
      },
    },
  },
});
