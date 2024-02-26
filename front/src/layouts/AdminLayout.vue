<template>
  <VNavigationDrawer permanent>
    <VList>
      <VListItem :prepend-avatar :title="user.account">
      </VListItem>
    </VList>
    <VDivider>

    </VDivider>
    <VList>
      <VListItem
      v-for="item in navItems" :key="item.to"
      :to="item.to" :title="item.text" :prepend-icon="item.icon">
      </VListItem>
    </VList>
  </VNavigationDrawer>
  <VMain>
    <RouterView>

    </RouterView>
  </VMain>
  </template>

<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'

const user = useUserStore()

const navItems = [
  // { to: '/admin/missions', text: '任務列表', icon: 'mdi-shopping' },
  { to: '/admin/MailmanPass', text: '幹員管理', icon: 'mdi-account' },
  // { to: '/admin/orders', text: '任務管理', icon: 'mdi-list-box' },
  // { to: '/admin/members', text: '會員管理', icon: 'mdi-account' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})
</script>
