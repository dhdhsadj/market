import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import auth from "./auth";
import StandDetail1 from '../views/StandDetail1.vue';
import BancadasPage from '../views/BancadasPage.vue';
import CategoryView from '../components/Category.vue';
import ProductDetail from '../components/ProductDetail.vue'; 
import Signup from '../views/Signup.vue'; 
import UserAccount from "../views/UserAccount.vue";
import Login from "../views/Login.vue";

// Importar páginas adicionais para links do rodapé
import HowItWorks from '../views/HowItWorks.vue';
import OurHistory from '../views/OurHistory.vue';
import TermsOfUse from '../views/TermsOfUse.vue';
import PaymentOptions from '../views/PaymentOptions.vue';
import Returns from '../views/Returns.vue';
import Warranty from '../views/Warranty.vue';

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, isLoginPage: true },
  },
  {
    path: '/stand1/:id',
    name: 'stand-detail1',
    component: StandDetail1,
    props: true,
    meta: { requiresAuth: true }, // Exige autenticação
  },
  {
    path: '/account',
    name: 'UserAccount',
    component: () => import(/* webpackChunkName: "user-account" */ '../views/UserAccount.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bancadas/:title',
    name: 'bancadas',
    component: BancadasPage,
    props: true,
    meta: { requiresAuth: true }, // Exige autenticação
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: CategoryView,
    meta: { requiresAuth: true }, // Exige autenticação
  },
  {
    path: '/produto/:id',
    name: 'product-detail',
    component: ProductDetail,
    props: true,
    meta: { requiresAuth: true }, // Exige autenticação
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresAuth: false, isLoginPage: true },
  },
  // Adicionando rotas para os links do footer
  {
    path: '/como-funciona',
    name: 'HowItWorks',
    component: HowItWorks,
    meta: { requiresAuth: false },
  },
  {
    path: '/nossa-historia',
    name: 'OurHistory',
    component: OurHistory,
    meta: { requiresAuth: false },
  },
  {
    path: '/termos-de-uso',
    name: 'TermsOfUse',
    component: TermsOfUse,
    meta: { requiresAuth: false },
  },
  {
    path: '/opcoes-de-pagamento',
    name: 'PaymentOptions',
    component: PaymentOptions,
    meta: { requiresAuth: false },
  },
  {
    path: '/devolucoes',
    name: 'Returns',
    component: Returns,
    meta: { requiresAuth: false },
  },
  {
    path: '/garantia',
    name: 'Warranty',
    component: Warranty,
    meta: { requiresAuth: false },
  },
  // Rota catch-all corrigida
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  },
];

const router = createRouter({
  base: "/store1/",
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = router.app ? router.app.config.globalProperties.$auth : null;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth || !auth.isLoggedIn) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.isLoginPage)) {
    if (auth && auth.isLoggedIn) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;