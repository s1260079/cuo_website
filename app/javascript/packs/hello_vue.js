/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.
import Vue from "vue";
import Vuex from "vuex"
import VueRouter from "vue-router";
import store from "../store/store.js";
import router from "../routes/router.js";
import App from "../app.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from 'firebase';


Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const config = {
    apiKey: "AIzaSyDgDuaqc1GIZjzyNgqwUgvoeaIqwjKhEoA",
    authDomain: "rails-85b56.firebaseapp.com",
    databaseURL: "https://rails-85b56-default-rtdb.firebaseio.com",
    projectId: "rails-85b56",
    storageBucket: "rails-85b56.appspot.com",
    messagingSenderId: "110232350617",
    appId: "1:110232350617:web:253053a2399a5cf8652d08",
    measurementId: "G-TVE51FLLQP"
}
firebase.initializeApp(config);

document.addEventListener("DOMContentLoaded", () => {
    const app = new Vue({
        store,
        router,
        render: (h) => h(App),
    }).$mount();
    document.body.appendChild(app.$el);
});



// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })