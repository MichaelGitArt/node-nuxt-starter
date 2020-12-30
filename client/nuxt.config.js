import colors from 'vuetify/es5/util/colors';

export default {
  head: {
    titleTemplate: '%s - GP',
    title: 'Gitart Starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Gitart Starter' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },

  env: {
    SERVER_URL: process.env.SERVER_URL,
    TELEGRAM_BOT_NICKNAME: process.env.TELEGRAM_BOT_NICKNAME,
    TELEGRAM_AUTH_PATH: process.env.TELEGRAM_AUTH_PATH,
    GOOGLE_AUTH_PATH: process.env.GOOGLE_AUTH_PATH,
  },

  css: [
    '@/assets/scss/main.scss',
    'vue-toast-notification/dist/theme-sugar.css',
  ],

  styleResources: {
    scss: ['./assets/scss/meta/_vars.scss', './assets/scss/meta/_mixins.scss'],
  },

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/pwa', 'nuxt-i18n'],

  i18n: {
    defaultLocale: 'uk',
    locales: [
      {
        code: 'ru',
        file: 'ru-Ru.js',
      },
      {
        code: 'uk',
        file: 'uk-Ua.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    vueI18n: {
      silentTranslationWarn: true,
    },
  },

  plugins: [
    {
      src: '~plugins/vee-validate',
      mode: 'client',
    },
    {
      src: '~/plugins/vue-toast-notification',
      mode: 'client',
    },
  ],

  vuetify: {
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {
    transpile: ['vee-validate'],
  },
};
