// Composables
// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

// 路由
const routes = [
  {
    // 首頁
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        // 首頁
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '購物網'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '購物網 | 註冊'
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '購物網 | 登入'
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

export default router
