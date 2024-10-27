// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxtjs/color-mode',
    "@prisma/nuxt",
    "@nuxt/image",
    '@nuxt/content'
  ],

  // Configuration du projet
  runtimeConfig: {

    // Database
    dbHost: "localhost",
    dbUser: "root",
    dbPassword: "",
    dbName: "goodwater_fournil",

    // Authentification
    oauth_by:{
      github: true,
      google: false,
      microsoft: false,
      discord: false
    },
    oauth: {
      github: {
        clientId: '',
        clientSecret: ''
      },
      google: {
        clientId: '',
        clientSecret: '',
        redirectURL: '',
      },
      microsoft: {
        clientId: '',
        clientSecret: '',
        tenant: '',
        scope: [],
        authorizationURL: '',
        tokenURL: '',
        userURL: '',
        redirectURL: '',
      },
      discord: {
        clientId: '',
        clientSecret: '',
        redirectURL: '',
      }
    },

    // Public
    public: {

    }
  }
})