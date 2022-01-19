import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@view/HomePage.vue";
import Buy from "@view/Buy.vue";
import Register from "@view/Register.vue";
import Store from "@view/Store.vue";
import Offer from "@view/Offer.vue";
import Survey from "@view/Survey.vue";
import Branch from "@view/Branch.vue";
import Bonus from "@view/Bonus.vue";
import Notifications from "@view/Notifications.vue";
import Login from "@view/Login.vue";
import Profile from "@view/Profile.vue";
import Notice from "@view/Notice.vue";
import Scores from "@view/Scores.vue";
import Rules from "@view/Rules.vue";
import About from "@view/About.vue";
import StoreShop from "@view/StoreShop.vue";
import UploadProf from "@view/UploadProf.vue";
import SingUp from "@view/SignUp.vue";
import Tickets from "@view/Tickets.vue";
import Ticket from "@view/Ticket.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: HomePage,
        meta: { auth: true },
    },
    {
        path: "/user/buy/:id",
        name: "Buy",
        component: Buy,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/user/register/:id",
        name: "Register",
        component: Register,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/user/store/:id",
        name: "Store",
        component: Store,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/user/store/:shopId/offer/:id",
        name: "Offer",
        component: Offer,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/user/:shopId/survey/:id",
        name: "Survey",
        component: Survey,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/user/store/:id/branch/:idx",
        name: "Branch",
        component: Branch,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/user/store/:id/bonus/:shopId",
        name: "Bonus",
        component: Bonus,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/user/notification",
        name: "Notifications",
        component: Notifications,
        meta: { auth: true },
    },
    {
        path: "/user/edit",
        name: "EditProfile",
        component: Profile,
        meta: { auth: true },
    },
    {
        path: "/user/message/:id",
        name: "Notice",
        component: Notice,
        props: true,
        meta: { auth: true },
    },
    {
        path: "/store/scores",
        name: "Scores",
        component: Scores,
        meta: { auth: true },
    },
    {
        path: "/store/Rules",
        name: "Rules",
        component: Rules,
        meta: { auth: true },
    },
    {
        path: "/store/about",
        name: "About",
        component: About,
        meta: { auth: true },
    },
    {
        path: "/user/login",
        name: "Login",
        component: Login,
        meta: { auth: false },
    },
    {
        path: "/user/store",
        name: "StoreShop",
        component: StoreShop,
        meta: { auth: true },
    },
    {
        path: "/user/upload",
        name: "Upload",
        component: UploadProf,
        meta: { auth: true },
    },
    {
        path: "/user/signup",
        name: "SignUp",
        component: SingUp,
        meta: { auth: true },
    },
    {
        path: "/user/ticket",
        name: "Tickets",
        component: Tickets,
        meta: { auth: true },
    },
    {
        path: "/user/ticket/:id",
        name: "Ticket",
        component: Ticket,
        meta: { auth: true },
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
        return { top: 0 };
    },
    routes,
});

router.beforeEach((to, from, next) => {
    // if (to.meta.auth && !localStorage.getItem("userAccessToken")) {
    //     return next({ name: "Login" });
    // } else if (!to.meta.auth && localStorage.getItem("userAccessToken")) {
    //     return next({ name: "Home" });
    // } else {
    //     next(false);
    // }
});

export default router;