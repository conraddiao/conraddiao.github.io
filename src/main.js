import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitterSquare, faLinkedin, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import shave from 'shave'

// Add icons to the library
library.add(faTwitterSquare, faLinkedin, faInstagramSquare)

// Create Vue app
const app = createApp(App)

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon)

// Register global properties
app.config.globalProperties.$shave = shave

// Mount the app
app.mount('#app')
