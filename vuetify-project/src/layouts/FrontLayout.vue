<!-- 前端版面 -->
<template>
  <!-- 手機版側欄 -->
  <VNavigationDrawer v-model="drawer" temporary location="left" v-if="isMobile">
    <VList nav>
      <template v-for="item in navItems" :key="item.to">
        <VListItem :to="item.to">
          <template #prepend>
            <VIcon :icon="item.icon"></VIcon>
            <VListItemTitle>{{ item.text }}</VListItemTitle>
          </template>
        </VListItem>
      </template>
    </VList>
  </VNavigationDrawer>
  <!-- 導覽列 -->
  <VAppBar color="primary">
    <VContainer class="d-flex align-center">
      <VBtn to="/" :active="false">購物網
        <VAppBarTitle>
        </VAppBarTitle>
      </VBtn>
      <VSpacer></VSpacer>

      <!-- 手機版 -->
      <template v-if="isMobile">
        <VAppBarNavIcon @click="drawer = true"></VAppBarNavIcon>
      </template>

      <!-- 電腦版 --->
      <template v-else>
        <template v-for="item in navItems" :key="item.to">
          <VBtn :to="item.to" :prepend-icon="item.icon"> {{ item.text }}</VBtn>
        </template>
      </template>
    </VContainer>
  </VAppBar>
<!-- 頁面內容 類似 iframe -->
<VMain>
  <RouterView>

  </RouterView>
</VMain>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { ref,computed } from 'vue';

// 手機版判斷式
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
// 手機側邊欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = [
  {to:'/register', text:'註冊',icon:'mdi-account-plus'},
  {to:'/login', text:'登入',icon:'mdi-login'},
]
</script>