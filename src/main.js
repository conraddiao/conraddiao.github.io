import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitterSquare, faLinkedin, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import shave from 'shave'


library.add(faTwitterSquare, faLinkedin, faInstagramSquare)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon).provide('shave', shave)
const vm = app.mount('#app')