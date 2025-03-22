import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'

import { clickOutside } from './directives/clickOutside'

import Snackbar from './plugins/SnackbarPlugin'
import ConfirmationDialog from './plugins/ConfirmationDialogPlugin'

const app = createApp(App)

// plugins
app.use(Snackbar)
app.use(ConfirmationDialog)

// diretivas
app.directive('click-outside', clickOutside)

app.mount('#app')
