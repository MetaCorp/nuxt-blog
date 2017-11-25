var tailwindcss = require('tailwindcss')
var autoprefixer = require('autoprefixer')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/css/main.css',
    'quill/dist/quill.snow.css',
  	'quill/dist/quill.bubble.css',
  	'quill/dist/quill.core.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo'
  ],
  manifest: {
    name: 'Nuxt Blog',
    lang: 'en',
    theme_color: '#3B8070'
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  plugins: [
    '~plugins/filters.js',
    { src: '~plugins/vue-quill-editor.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    postcss: [
      tailwindcss('./tailwindcss.config.js'),
      autoprefixer
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
