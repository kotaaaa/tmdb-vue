import { createWebHistory, createRouter } from "vue-router";

import Top from "../views/Top.vue";
import Home from "../views/Home.vue";
import Trending from "../views/Trending.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;