<template>
<v-container class="text-center">
  <v-col cols="12">
    <h1>購物車</h1>
  </v-col>
  <v-divider></v-divider>
  <v-col cols="12" >
    <v-data-table :items="cart" :headers="headers">
      <template #[`item.product.name`]="{ item }">
        <span v-if="item.product.sell">{{ item.product.name }}</span>
        <span class="text-red text-decoration-line-through" v-else>{{ item.product.name }} (已下架)</span>
      </template>
      <template #[`item.quantity`]="{item}">
        <v-btn variant="text" icon="mdi-minus" color="red" @click="addCart(item.product._id, -1)"></v-btn>
          {{ item.quantity }}
        <v-btn variant="text" icon="mdi-plus" color="green" @click="addCart(item.product._id, 1)"></v-btn>
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn variant="text" icon="mdi-delete" color="red" @click="addCart(item.product._id, item.quantity * -1)"></v-btn>
      </template>
    </v-data-table>
  </v-col>
  <v-col cols="12" class="text-center">
    <p>總金額: {{ total }}</p>
    <v-btn color="green" :disabled="!canCheckout" :loading="isSubmitting" @click="checkout">結帳</v-btn>
  </v-col>
</v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

const cart = ref([])
const headers = [
  { title: '商品名稱', key: 'product.name' },
  { title: '單價', key: 'product.price' },
  { title: '數量', key: 'quantity' },
  { title: '總價', key: 'total', value: item => item.product.price * item.quantity },
  { title: '操作', key: 'action' }
]

// 總價格
const total = computed(() => {
  return cart.value.reduce((total, current) => {
    // 目前累加值 + 目前項目的數量 * 目前項目的商品價格
    return total + current.quantity * current.product.price
  }, 0)
})

// 能否結帳
const canCheckout = computed(() => {
  // 如果購物車內的物品數 > 0 && 購物車內的沒有被下架的商品
  return cart.value.length > 0 && !cart.value.some(item => !item.product.sell)
})

// 新增購物車
const addCart = async (product, quantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product,
      quantity
    })
    user.cart = data.result
    createSnackbar({
      text: '修改成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    const idx = cart.value.findIndex(item => item.product._id === product)
    cart.value[idx].quantity += quantity
    if (cart.value[idx].quantity <= 0) {
      cart.value.splice(idx, 1)
    }
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

const isSubmitting = ref(false)
const checkout = async () => {
  isSubmitting.value = true
  try {
    await apiAuth.post('/orders')
    user.cart = 0
    router.push('/orders')
    createSnackbar({
      text: '結帳成功',
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
  isSubmitting.value = false
}

onMounted(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value.push(...data.result)
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
})
</script>
