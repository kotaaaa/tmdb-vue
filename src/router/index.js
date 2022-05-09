import { createWebHistory, createRouter } from "vue-router";

import Top from "../views/Top.vue";
import Home from "../views/Home.vue";
import Trending from "../views/Trending.vue";
import Work from "../views/Work.vue"

const routes = [{
        path: "/",
        name: "Top",
        component: Top,
    }, {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/trending",
        name: "Trending",
        component: Trending,
    },
    {
        path: "/work/:id",
        name: "Work",
        component: Work,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;