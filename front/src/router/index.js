// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: 'Life Delivery | 首頁',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: 'Life Delivery | 註冊',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: 'Life Delivery | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'join',
        name: 'Join Us',
        component: () => import('@/views/front/JoinUs.vue'),
        meta: {
          title: 'Life Delivery | 加入我們',
          login: false,
          admin: false
        }
      },
      {
        path: 'post',
        name: 'Post',
        component: () => import('@/views/front/PostMissions.vue'),
        meta: {
          title: 'Life Delivery | 發布任務',
          login: true,
          admin: false
        }
      },
      {
        path: 'mailmans',
        name: 'MailMans',
        component: () => import('@/views/front/MailManlist.vue'),
        meta: {
          title: 'Life Delivery | 幹員列表',
          login: true,
          admin: false
        }
      },
      {
        path: 'mailmans/:id',
        name: 'Mailman',
        component: () => import('@/views/front/MailmanView.vue'),
        meta: {
          title: 'Life Delivery | 幹員',
          login: true,
          admin: false
        }
      },
      {
        path: 'missionlist',
        name: 'MissionsList',
        component: () => import('@/views/mailman/MissionList.vue'),
        meta: {
          title: 'Life Delivery | 任務清單',
          login: true,
          admin: false,
          mailman: true
        }
      },
      {
        path: 'missionpage',
        name: 'Missions',
        component: () => import('@/views/mailman/MissionPage.vue'),
        meta: {
          title: 'Life Delivery | 執行中任務',
          login: true,
          admin: false,
          mailman: true
        }
      }
    ]
  },
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
        path: 'mailmanpass',
        name: 'MailmanPass',
        component: () => import('@/views/admin/MailmanPass.vue'),
        meta: {
          title: 'Life Delivery | 幹員管理',
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

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  if (from === START_LOCATION) {
    await user.getProfile()
  }

  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    // 如果有登入，要去註冊或登入頁，重新導向回首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 如果要去的頁面要登入，但是沒登入，重新導向回登入頁
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    // 如果要去的頁面要管理員，但是不是管理員，重新導向回首頁
    next('/')
  } else {
    // 不重新導向
    next()
  }
})

export default router
