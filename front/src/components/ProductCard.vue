<template>
<v-card class="product-card">
  <v-img :src="image" cover height="200"></v-img>
  <v-card-title>
    <router-link class="text-primary text-decoration-none" :to="'/products/' + _id">{{ name }}
    </router-link>
  </v-card-title>
  <v-card-subtitle>{{ price }}</v-card-subtitle>
  <v-card-text style="white-space: pre;"> {{ description }}</v-card-text>
  <v-card-actions>
    <v-btn color="primary" prepend-icon="mdi-cart" @click="addCart">加入購物車</v-btn>
  </v-card-actions>
</v-card>
</template>

<script setup>
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

// 定義卡片當中的項目
const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell'])

// 加入購物車
const addCart = async () => {
  // 如果沒有登入，則帶到登入頁面
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: props._id,
      quantity: 1
    })
    user.cart = data.result
    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
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
