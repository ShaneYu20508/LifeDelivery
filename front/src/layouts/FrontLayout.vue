<!-- 前端版面 -->
<template>
  <!-- 手機版側欄 -->
  <VNavigationDrawer v-model="drawer" temporary location="left" v-if="isMobile" color="c1">
    <VList nav>
      <template v-for="item in navItems" :key="item.to">
        <VListItem :to="item.to" v-if="item.show">
          <template #prepend>
            <VIcon :icon="item.icon" ></VIcon>
          </template>
          <template #append>
            <v-badge color="error" :content="user.cart" v-if="item.to ==='/cart'" inline></v-badge>
          </template>
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </VListItem>
      </template>
      <VListItem v-if="user.isLogin" @click="logout">
        <template #prepend>
          <VIcon icon="mdi-logout" ></VIcon>
        </template>
        <VListItemTitle>登出</VListItemTitle>
      </VListItem>
    </VList>
  </VNavigationDrawer>
  <!-- 導覽列 -->
  <VAppBar color="c1">
    <VContainer class="d-flex align-center">
      <VBtn to="/" :active="false" color="c2">
        <VAppBarTitle>Life Delivery
        </VAppBarTitle>
      </VBtn>
      <VSpacer></VSpacer>

      <!-- 手機版導覽列 -->
      <template v-if="isMobile">
        <VAppBarNavIcon @click="drawer = true" ></VAppBarNavIcon>
      </template>

      <!-- 電腦版導覽列 --->
      <template v-else>
        <template v-for="item in navItems" :key="item.to">
          <VBtn :to="item.to" :prepend-icon="item.icon"  v-if="item.show"> {{ item.text }}
              <v-badge color="error" :content="user.cart" v-if="item.to ==='/cart'" floating></v-badge>
          </VBtn>
        </template>
        <VBtn prepend-icon="mdi-logout" v-if="user.isLogin"  @click="logout">登出</VBtn>
      </template>
    </VContainer>
  </VAppBar>
<!-- 頁面內容 類似 iframe -->
<VMain>
  <RouterView :key="$route.path            ">
  </RouterView>
</VMain>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
// 引入登入狀態
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// 引入路由
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()

// 引入路由
const router = useRouter()

const createSnackbar = useSnackbar()

const user = useUserStore()

// 手機版判斷式
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
// 手機側邊欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin },
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: user.isLogin },
    { to: '/orders', text: '訂單', icon: 'mdi-list-box', show: user.isLogin },
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    // 登出後導向回首頁
    router.push('/')
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
}

</script>
