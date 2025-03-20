import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'

import Snackbar from './plugins/SnackbarPlugin'

const app = createApp(App)
app.use(Snackbar)
app.mount('#app')
