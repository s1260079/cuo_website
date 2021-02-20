import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Home from "../views/Home.vue";
import LiveInfo from "../views/LiveInfo.vue";
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Mypage from '../views/Mypage.vue'
import Member from '../views/Member.vue'
import Movie from '../views/Movie.vue'
import Band from '../views/Band.vue'

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
            path: "/liveinfo",
            component: LiveInfo,
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
            path: '/mypage/:id(\\d+)',
            component: Mypage,
        },
        {
            path: '/member',
            component: Member,
        },
        {
            path: '/movie',
            component: Movie,
        },
        {
            path: '/band',
            component: Band,
        },
    ],
});

export default router