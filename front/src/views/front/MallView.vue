<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <h1>購物網</h1>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12" md="6" lg="3" v-for="product in products" :key="product._id">
      <product-card v-bind="product"></product-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'
import gsap from 'gsap'

const { api } = useApi()
const createSnackbar = useSnackbar()

const products = ref([])

// 發請求
onMounted(async () => {
  try {
    // 抓資料
    const { data } = await api.get('/products', {
      params: {
        itemsPerPage: -1
      }
    })
    // 把資料丟進陣列內
    products.value.push(...data.result.data)
    await nextTick()
    gsap
      .to('.product-card', { opacity: 1, duration: 0.5 })
  } catch (error) {
    console.log(error)
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

<style scoped>
.product-card{
  opacity: 0
}
</style>
