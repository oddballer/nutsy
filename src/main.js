import axios from 'axios'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Peer } from "peerjs";


// import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
const peer = new Peer();

app.use(pinia)
app.use(router)
app.use(peer)
app.mount('#app')
