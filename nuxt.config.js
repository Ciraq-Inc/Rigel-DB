export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',

  server: {
    port: 3005
  },

  router: {
    base: "/test/"
  },

  head: {
    title: 'DataBase',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"

      }
    ],
    script: [
      { css: ['vuesax/dist/vuesax.css', 'boxicons/css/boxicons.min.css'], }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/scss/custom.scss",
    'bootstrap-icons/font/bootstrap-icons.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      mode: "client"
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyD_f528GXuAn4QgnvbGvkNnHnjAeVo3P-k",
          authDomain: "referral-system-5cebe.firebaseapp.com",
          projectId: "referral-system-5cebe",
          storageBucket: "referral-system-5cebe.appspot.com",
          messagingSenderId: "110599877750",
          appId: "1:110599877750:web:f8cb21ad5275d11d75db57",
          measurementId: "G-81Q9KWP8LW"
        },
        services: {
          storage: true,
        }
      }]
  ],


  
// GTAG_ID="G-HWD9X2F2E9"
// FIREBASE_API_KEY="AIzaSyD_f528GXuAn4QgnvbGvkNnHnjAeVo3P-k"
// FIREBASE_AUTH_DOMAIN="referral-system-5cebe.firebaseapp.com"
// FIREBASE_AUTH_DATABASE_URL="https://referral-system-5cebe-default-rtdb.europe-west1.firebasedatabase.app"
// FIREBASE_PROJECT_ID="referral-system-5cebe"
// FIREBASE_STORAGE_BUCKET="referral-system-5cebe.appspot.com"
// FIREBASE_MESSAGING_SENDER_ID="110599877750"
// FIREBASE_APP_ID="1:110599877750:web:f8cb21ad5275d11d75db57"
// FIREBASE_MEASUREMENT_ID="G-81Q9KWP8LW"


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: "nuxt/",
  },

  //   axios: {
  //     baseURL: '/updateronline/',
  //     withCredentials: true
  // },
}
