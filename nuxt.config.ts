// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-icon'
  ],
  googleFonts: {
    display: 'swap',
    families: {
      Sora: true,
      'Open+Sans': true,
    }
  }
})
