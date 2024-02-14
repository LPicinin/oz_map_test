import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from "./routes/router"
import App from './App.vue'

const app = createApp(App)

app.use(router);
app.use(createPinia())

app.mount('#app')
