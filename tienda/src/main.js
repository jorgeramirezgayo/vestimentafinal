import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

const socketConnection = SocketIO('http://localhost:4201/');

Vue.config.productionTip = false
Vue.prototype.$url = 'http://localhost:4201/api';
Vue.prototype.$token = localStorage.getItem('token');
Vue.prototype.$envio = 5;
Vue.prototype.$paises =  [
  "Albania",
  "Alemania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaiyán",
  "Bélgica",
  "Bielorrusia",
  "Bosnia y Herzegovina",
  "Bulgaria",
  "Chipre",
  "Croacia",
  "Dinamarca",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estonia",
  "Finlandia",
  "Francia",
  "Georgia",
  "Grecia",
  "Hungría",
  "Irlanda",
  "Islandia",
  "Italia",
  "Kazajistán",
  "Kosovo",
  "Letonia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Malta",
  "Moldavia",
  "Mónaco",
  "Montenegro",
  "Noruega",
  "Países Bajos",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Checa",
  "Rumania",
  "Rusia",
  "San Marino",
  "Serbia",
  "Suecia",
  "Suiza",
  "Ucrania",
  "Vaticano"
];

import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Notifications);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
