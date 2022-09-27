import { createRouter, createWebHashHistory } from 'vue-router'

//Import Page
import DashboardPage from '../components/screens/DashboardPage.vue';

const routes = [
    {
        path: '/', 
        component: DashboardPage, 
        name: 'dashbaordPage'
    }
];

const Router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default Router;