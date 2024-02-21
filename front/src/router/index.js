// Composables
// import { createRouter, createWebHistory } from 'vue-router'
// START_LOCALTION 代表進到頁面之後的第一次跳轉
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

// 路由
const routes = [
  {
    // 使用者頁面
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        // 首頁
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '購物網',
          // 非登入狀態也可以看
          login: false,
          // 非管理員也可以看
          admin: false
        }
      },
      {
        // 註冊頁
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '購物網 | 註冊',
          login: false,
          admin: false
        }
      },
      {
        // 登入頁
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '購物網 | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'products/:id',
        name: 'Product',
        component: () => import('@/views/front/ProductView.vue'),
        meta: {
          title: '購物網 | 商品',
          login: false,
          admin: false
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/front/CartView.vue'),
        meta: {
          title: '購物網 | 購物車',
          login: true,
          admin: false
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/front/OrdersView.vue'),
        meta: {
          title: '購物網 | 訂單',
          login: true,
          admin: false
        }
      }
    ]
  },
  // 管理員頁面
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '購物網 | 管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsView.vue'),
        meta: {
          title: '購物網 | 商品管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrdersView.vue'),
        meta: {
          title: '購物網 | 訂單管理',
          login: true,
          admin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 進到每一頁之後執行一個 function
// 把頁面的標題改為所到頁面的標題
router.afterEach((to, from) => {
  document.title = to.meta.title
})

// 登入之後的動作
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  if (from === START_LOCATION) {
    await user.getProfile()
  }

  // 如果使用者已經登入了，而且要去的路徑是註冊或登入頁的話
  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    // 重新導向回首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 如果要去的頁面需要登入，但是沒有登入，重新導向回登入頁
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    // 如果要去的頁面需要管理員權限，但不是管理員，重新導向回首頁
    next('/')
  } else {
    // 不重新導向
    next()
  }
})

export default router
