import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/matiere',
        component: () => import('../components/Matiere.vue')
    },
    {
        path: '/cout-direct',
        component: () => import('../components/CoutDirect.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
