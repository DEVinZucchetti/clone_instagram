import { createRouter, createWebHistory } from 'vue-router'

// Importar todas as telas/componentes 
import Home from '../views/Home/index.vue'
import Login from '../views/Login/Login.vue'
import SignUp from '../views/SignUp/SignUp.vue'
import NewPost from '../views/Posts/New/NewPost.vue'
import ListPost from '../views/Posts/List/ListPost.vue'
import DetailsPost from '../views/Posts/Details/DetailsPost.vue'

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
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: '/posts/novo',
            name: 'NewPost',
            component: NewPost,
            meta: { requiresAuth: true },
        },
        {
            path: '/posts/:id/visualizar',
            name: 'DetailsPost',
            component: DetailsPost,
            meta: { requiresAuth: true },
        },
        {
            path: '/posts',
            name: 'ListPost',
            component: ListPost,
            meta: { requiresAuth: true },
        }
    ]
})

router.beforeEach((to, from, next) => {
    // Verifique se a rota requer autenticação (marcada pela meta "requiresAuth")
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Verifique se o usuário está autenticado (por exemplo, usando Vuex ou outro método)
        const isAuthenticated = localStorage.getItem('instagram_token') // Implemente sua lógica de autenticação aqui

        if (isAuthenticated) {
            // Se o usuário estiver autenticado, permita a navegação
            next()
        } else {
            // Se o usuário não estiver autenticado, redirecione para a tela de login ou outra página de sua escolha
            next('/') 
        }
    } else {
        // Se a rota não requer autenticação, permita a navegação
        next()
    }
})





// exportar o router

export default router

