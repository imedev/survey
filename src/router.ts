import {createRouter, createWebHistory, NavigationGuard, NavigationHookAfter, RouteRecordRaw} from 'vue-router';
import Begin from "@/views/begin.vue"
import First from "@/components/first.vue"
import Driving from "@/components/driving_license.vue"
import Car from "@/components/car.vue"
import FirstCar from "@/components/firstCar.vue"

import Home from "@/views/home.vue"

export const defaultRoutes = [

    {
        path: "/",
        name:"home",
        component: Home
    },
    {
        path: "/begin",
        name:"begin",
        component: Begin,
        redirect:"/first"
    },
   /* {
        path: "/start",
        name:"start",
        component: First
    },*/
    {
        path: "/first",
        name:"first",
        component: First
    },
    {
        path: "/driving",
        name:"driving",
        component: Driving
    },
    {
        path: "/car",
        name:"car",
        component: Car
    },
    {
        path: "/first-car",
        name:"first-car",
        component: FirstCar
    }




];

export const router = createRouter({
    history: createWebHistory(),
    routes: defaultRoutes
});



