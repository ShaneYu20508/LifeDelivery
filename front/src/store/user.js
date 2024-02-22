import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { useApi } from '@/composables/axios'

// 保存使用者資訊
export const useUserStore = defineStore('user', () => {
// export const useAppStore = defineStore('app', () => {
  // 檔案名更改因此這裡也要改
  const { apiAuth } = useApi()

  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const role = ref(UserRole.USER)

  // 將後端傳過來的資料存入 ref 內(保存資訊)
  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    account.value = data.account
    email.value = data.email
    cart.value = data.cart
    role.value = data.role
  }

  // 判斷是否為登入狀態
  const isLogin = computed(() => {
    return token.value.length > 0
  })
  // 判斷是否為管理員
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  // 判斷是否為郵差
  const isMailman = computed(() => {
    return role.value === UserRole.MAILMAN
  })

  const getProfile = async () => {
    if (token.value.length === 0) return

    try {
      const { data } = await apiAuth.get('/users/me')
      login(data.result)
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    token.value = ''
    account.value = ''
    email.value = ''
    cart.value = 0
    role.value = UserRole.USER
  }

  return {
    token,
    account,
    email,
    cart,
    role,
    login,
    logout,
    isLogin,
    isAdmin,
    isMailman,
    getProfile
  }
}, {
  // 保存使用者資料
  persist: {
    key: 'lifedelivery',
    paths: ['token']
  }
})
