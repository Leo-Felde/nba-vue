import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'

import { clickOutside } from './directives/clickOutside'

import Snackbar from './plugins/SnackbarPlugin'

const app = createApp(App)

// plugins
app.use(Snackbar)

// diretivas
app.directive('click-outside', clickOutside)

app.mount('#app')
