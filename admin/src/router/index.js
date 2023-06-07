import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import jwt_decode from 'jwt-decode'
import LoginApp from '../views/LoginApp.vue'
import IndexColaboradorApp from '../views/colaboradores/IndexColaboradorApp'
import CreateColaboradorApp from '../views/colaboradores/CreateColaboradorApp'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'login', component: LoginApp, meta: {requiresAuth: false}},
  {path: '/colaboradores', name: 'colaboradores-index', component: IndexColaboradorApp, meta: {requiresAuth: true}},
  {path: '/colaboradores/create', name: 'colaboradores-create', component: CreateColaboradorApp, meta: {requiresAuth: true}},
  {path: '/colaboradores/edit/:id', name: 'colaboradores-edit', component: () => import('@/views/colaboradores/EditColaboradorApp.vue'), meta: {requiresAuth: true}},
  {path: '/inicio', name: 'inicio', component: () => import('@/views/InicioApp.vue'), meta: {requiresAuth: true}},
  // {path: '/about', name: 'about'}
  {path: '/productos', name: 'productos-index', component: () => import('@/views/productos/IndexProductoApp.vue'), meta: {requiresAuth: true}},
  {path: '/productos/create', name: 'productos-create', component: () => import('@/views/productos/CreateProductoApp.vue'), meta: {requiresAuth: true}},
  {path: '/productos/edit/:id', name: 'productos-edit', component: () => import('@/views/productos/EditProductoApp.vue'), meta: {requiresAuth: true}},
  {path: '/productos/galeria/:id', name: 'productos-galeria', component: () => import('@/views/productos/GaleriaProductoApp.vue'), meta: {requiresAuth: true}},

  {path: '/marcas', name: 'marcas-index', component: () => import('@/views/marcas/IndexMarcaApp.vue'), meta: {requiresAuth: true}},
  {path: '/marcas/create', name: 'marcas-create', component: () => import('@/views/marcas/CreateMarcaApp.vue'), meta: {requiresAuth: true}},
  {path: '/marcas/edit/:id', name: 'marcas-edit', component: () => import('@/views/marcas/EditMarcaApp.vue'), meta: {requiresAuth: true}},

  {path: '/categorias', name: 'categorias', component: () => import('@/views/categorias/IndexCategoriaApp.vue'), meta: {requiresAuth: true}},

  {path: '/ingresos', name: 'ingresos-index', component: () => import('@/views/ingreso/IndexIngresoApp.vue'), meta: {requiresAuth: true}},
  {path: '/ingresos/create', name: 'ingresos-create', component: () => import('@/views/ingreso/CreateIngresoApp.vue'), meta: {requiresAuth: true}},
  {path: '/ingresos/:id', name: 'ingresos-detalle', component: () => import('@/views/ingreso/DetalleIngresoApp.vue'), meta: {requiresAuth: true}},

  {path: '/ventas', name: 'ventas-index', component: () => import('@/views/ventas/IndexVentasApp.vue'), meta: {requiresAuth: true}},
  {path: '/ventas/:id', name: 'ventas-detalle', component: () => import('@/views/ventas/DetalleVentaApp.vue'), meta: {requiresAuth: true}}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.requiresAuth)) {
    if (!store.state.token) {
      next({
        name: 'login'
      })
    }

    try {
      jwt_decode(store.state.token)
    } catch (error) {
      next({
        name: 'login'
      })
    }

    if (jwt_decode(store.state.token).exp*1000 <= new Date().getTime()) {
      next({
        name: 'login'
      })
    }

    next();
  } else {
    next();
  }
})

export default router
