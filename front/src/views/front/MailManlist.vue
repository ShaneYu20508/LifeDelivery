<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>幹員列表</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="6" lg="3" v-for="mailman in mailmans" :key="mailman._id">
        <mailman-card v-bind="mailman"></mailman-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import MailmanCard from '@/components/MailmanCard.vue'
import gsap from 'gsap'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const mailmans = ref([])

onMounted(async () => {
  try {
    const { data } = await apiAuth.get('/mailmans', {
      params: {
        itemsPerPage: -1
      }
    })
    mailmans.value.push(...data.result.data)
    await nextTick()
    gsap
      .to('.mailman-card', { opacity: 1, duration: 0.5 })
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

<style>
.mailman-card{
  opacity: 0
}

</style>