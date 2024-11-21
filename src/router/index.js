import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CategoryView from "@/views/CategoryView.vue";
import SingleQuizView from "@/views/SingleQuizView.vue";
import GlobalQuizView from "@/views/GlobalQuizView.vue";

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/home',
            redirect: '/',
        },
        {
            path: '/quiz',
            name: 'Quiz',
            component: GlobalQuizView,
            children: [
                {
                    path: '/quiz/:id',
                    name: 'SingleQuiz',
                    component: SingleQuizView
                },
                {
                    path: '/quiz/category',
                    name: 'Category',
                    component: CategoryView
                }
            ]
        }
    ]
})

export default routes