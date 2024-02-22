<template>
  <VRow id="login-home" class="bg-c1 align-center justify-center">
    <VCol cols="12">
      <v-card
        id="card"
        class="pa-3 ma-auto"
        width="450"
        title="Login"
      >
        <!-- :disable 送出的時候將表單停用，當表單 @submit 時，執行叫做 submit 的 function -->
        <VForm :disabled="isSubmitting" @submit.prevent="submit">
          <!-- counter 為計數器 --->
          <VTextField
            label="使用者名稱"
            minlength="4"
            maxlength="20"
            counter
            v-model="account.value.value"
            :error-messages="account.errorMessage.value">
          </VTextField>
          <VTextField
            label="密碼"
            minlength="4"
            maxlength="20"
            counter
            type="password"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value">
          </VTextField>
          <VBtn type="submit" color="green">登入</VBtn>
        </VForm>
      </v-card>
    </VCol>
  </VRow>
</template>

<style scoped>
#login-home{
  height: calc(100% + 12px);
}
</style>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// useRoute(r) 有 r 是跳頁，沒有 r 代表取路由的資訊
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'

import { useApi } from '@/composables/axios'
// 儲存資料
import { useUserStore } from '@/store/user'

const { api } = useApi()

// 路由
const router = useRouter()
// 彈出提示
const createSnackbar = useSnackbar()

// 儲存資料
const user = useUserStore()

// 定義註冊表單的資料格式
const schema = yup.object({
  // 帳號欄位
  account: yup
  // 文字
    .string()
  // 必填
    .required('名稱為必填欄位')
    .min(4, '使用者名稱長度不符')
    .max(20, '使用者名稱長度不符'),

  // 密碼欄位
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符')
})

// { 送出表單後呼叫語法去執行 , 是否正在送出表單(以免重複送出請求) }
const { handleSubmit, isSubmitting } = useForm({
  // 使用上面定義的 schema 來設定表單
  validationSchema: schema
})

// 註冊每個表單的欄位， useField('此處的內容要和 schema 的欄位名稱對應')
const account = useField('account')
const password = useField('password')

// submit 叫 useForm 裡的 handleSubmit 去做事
// values 代表表單裡所有欄位的值
const submit = handleSubmit(async (values) => {
  try {
    // 資料 = post('檔案位置', 要送出的資料)
    const { data } = await api.post('/users/login', {
      account: values.account,
      password: values.password
    })
    // 登入成功後儲存使用者資料
    user.login(data.result)
    // 彈出的資訊: 註冊成功， 2 秒後消失， 背景為綠色， 位置在底下
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    // 完成後把使用者換到登入頁
    router.push('/')
    // 錯誤提示
  } catch (error) {
    console.log(error)
    // 偵測是什麼錯誤並給予回覆(後端 controllers 中的 users.js) || 其他問題
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
