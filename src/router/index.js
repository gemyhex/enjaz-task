// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from '../pages/index.vue'
import Users from '../pages/users.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Dashboard
    },
    {path: '/users', name: 'Users', component: Users},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router