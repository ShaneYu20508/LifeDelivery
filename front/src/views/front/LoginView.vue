<template>
  <VRow id="login-home" class="bg-c1 align-center justify-center h-100">
    <VCol cols="12">
      <v-card id="card" class="pa-3 ma-auto" width="450" title="Login">
        <!-- :disable 送出的時候將表單停用，當表單 @submit 時，執行叫做 submit 的 function -->
        <VForm :disabled="isSubmitting" @submit.prevent="submit">
          <!-- counter 為計數器 --->
          <VTextField
            label="使用者名稱"
            minlength="4"
            maxlength="20"
            counter
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
          >
          </VTextField>
          <VTextField
            label="密碼"
            minlength="4"
            maxlength="20"
            counter
            type="password"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
          >
          </VTextField>
          <VBtn type="submit" color="green">登入</VBtn>
        </VForm>
      </v-card>
    </VCol>
  </VRow>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'

const { api } = useApi()

const router = useRouter()
const createSnackbar = useSnackbar()

const user = useUserStore()

// 定義註冊表單的資料格式
const schema = yup.object({
  account: yup
    .string()
    .required('帳號為必填欄位')
    .min(4, '使用者帳號長度不符')
    .max(20, '使用者帳號長度不符'),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/users/login', {
      account: values.account,
      password: values.password
    })
    user.login(data.result)
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/')
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
