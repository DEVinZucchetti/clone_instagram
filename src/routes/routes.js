import {createRouter, createWebHistory} from 'vue-router'

// Importar todas as telas/componentes 
import Home from '../views/Home/index.vue'
import Login from '../views/Login/Login.vue'
import SignUp from '../views/SignUp/SignUp.vue'

// criar o roteamento da aplicação

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
           path: '/',
           name: 'Login',
           component: Login
        },
        {
           path: '/cadastro',
           name: 'SignUp',
           component: SignUp
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        }
    ]
})

// exportar o router

export default router

