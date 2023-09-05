import './assets/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
})

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker)

app.
use(router)
.use(vuetify)
.mount('#app')
