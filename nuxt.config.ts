// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: false },
  ssr: false, // SPA mode — this app is entirely client-driven (drag/drop, canvas export), no DB / server needed
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'You, Me & a Date 💌',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
        { name: 'description', content: 'A cute little invitation for your crush — pick food, pick a date, send it with love.' },
        { name: 'theme-color', content: '#F5F3FF' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Caveat:wght@600;700&family=Poppins:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },
  // hooks: {
  //   'vite:extendConfig'(config) {
  //     if (config.build?.rollupOptions?.input) {
  //       const input = config.build.rollupOptions.input as any
  //       if (typeof input === 'object' && !Array.isArray(input)) {
  //         if (input.entry && !input.server) {
  //           input.server = input.entry
  //         }
  //       }
  //     }
  //   }
  // }
})

