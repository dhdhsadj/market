import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StandDetail from '../views/StandDetail.vue';
import StandDetail1 from '../views/StandDetail1.vue';
import BancadasPage from '../views/BancadasPage.vue';
import CategoryView from '../components/Category.vue';
import ProductDetail from '../components/ProductDetail.vue'; // Importar a nova página de detalhes do produto

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/bancada/:id',
    name: 'stand-detail',
    component: StandDetail,
    props: true
  },
  {
    path: '/stand1/:id',
    name: 'stand-detail1',
    component: StandDetail1,
    props: true
  },
  {
    path: '/bancadas/:title',
    name: 'bancadas',
    component: BancadasPage,
    props: true
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: CategoryView,
  },
  {
    path: '/produto/:id',
    name: 'product-detail',
    component: ProductDetail,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
