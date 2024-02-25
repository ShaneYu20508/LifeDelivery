<template>
  <VRow id="register-home" class="bg-c1 align-center justify-center">
    <VCol cols="12">
      <v-card
      class="pa-3 ma-auto"
      width="450"
      title="Register"
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
            :error-messages="account.errorMessage.value"
          >
          </VTextField>
          <VTextField
            label="信箱"
            type="email"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
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
          <VTextField
            label="確認密碼"
            minlength="4"
            maxlength="20"
            counter
            type="password"
            v-model="passwordConfirm.value.value"
            :error-messages="passwordConfirm.errorMessage.value"
          >
          </VTextField>
          <VBtn type="submit" color="green">註冊</VBtn>
        </VForm>
      </v-card>
    </VCol>
  </VRow>
</template>

<style scoped>
#register-home{
  height: calc(100% + 12px);
}
</style>

<script setup>
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// useRoute(r) 有 r 是跳頁，沒有 r 代表取路由的資訊
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const { api } = useApi()

// 路由
const router = useRouter()
// 彈出提示
const createSnackbar = useSnackbar()

// 定義註冊表單的資料格式
const schema = yup.object({
  // 帳號欄位
  account: yup
    // 文字
    .string()
    // 必填
    .required('使用者名稱為必填欄位')
    .min(4, '使用者名稱長度不符')
    .max(20, '使用者名稱長度不符'),

  // 信箱欄位
  email: yup
    .string()
    .required('信箱為必填欄位')
    // .test(自訂驗證名稱, 錯誤訊息, 驗證的 function)
    .test(
      'isEmail', '信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),

  // 密碼欄位
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符'),

  // 確認密碼欄位
  passwordConfirm: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符')
    // .oneOf 只允許符合陣列內其中一個值
    // .oneOf(陣列, 錯誤訊息)
    // .ref('password') 代表這個 schema 的 password 欄位值
    .oneOf([yup.ref('password')], '密碼不一致')
})

// { 送出表單後呼叫語法去執行 , 是否正在送出表單(以免重複送出請求) }
const { handleSubmit, isSubmitting } = useForm({
  // 使用上面定義的 schema 來設定表單
  validationSchema: schema
})

// 註冊每個表單的欄位， useField('此處的內容要和 schema 的欄位名稱對應')
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

// submit 叫 useForm 裡的 handleSubmit 去做事
// values 代表表單裡所有欄位的值
const submit = handleSubmit(async (values) => {
  try {
    // post('檔案位置', 要送出的資料)
    // 這裡的 users 是連到 controllers 資料夾
    await api.post('/users', {
      account: values.account,
      email: values.email,
      password: values.password
    })
    // 彈出的資訊: 註冊成功， 2 秒後消失， 背景為綠色， 位置在底下
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    // 完成後把使用者換到登入頁
    router.push('/login')
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
