import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [{
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
];



const routerr = createRouter({
    history: createWebHistory(),
    routes,
});

export default routerr;