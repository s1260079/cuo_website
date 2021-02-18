import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Mypage from '../views/Mypage.vue'

const router = new Router({
    mode: "history",
    routes: [
        //ルーティングの設定
        {
            path: "/",
            component: Home,
            name: 'Home'
        },
        {
            path: "/about",
            component: About,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/mypage',
            component: Mypage,
        },
    ],
});

export default router