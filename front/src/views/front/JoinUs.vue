<template>
<v-row class="bg-c1 align-center justify-center h-100">
  <v-col cols="12">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card class="pa-3 ma-auto" width="600" title="Join Us">
        <v-card-text>
          <v-row>
            <v-col cols="5">
              <vue-file-agent class="ma-2"
              v-model="fileRecords"
              v-model:rawModelValue="rawFileRecords"
              accept="image/jpeg,image/png"
              deletable
              :error-text="{type: '檔案格式不支援', size: '檔案超過 1MB 大小限制'}"
              help-text="選擇檔案或拖曳到這裡"
              :max-files="1"
              max-size="1MB"
              ref="fileAgent"
              ></vue-file-agent>
            </v-col>
            <v-col class="d-flex justify-center align-center flex-column">
              <v-text-field class="w-100"
              label="帳號" counter
              minlength="4" maxlength="20"
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"></v-text-field>
              <v-text-field class="w-100"
              label="幹員代號"
              v-model="code.value.value"
              :error-messages="code.errorMessage.value"></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            label="信箱"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"></v-text-field>
          <v-text-field
            label="密碼"
            v-model="password.value.value" counter minlength="4" maxlength="20"
            :error-messages="password.errorMessage.value"></v-text-field>
          <v-text-field
            label="確認密碼"
            v-model="passwordConfirm.value.value" counter minlength="4" maxlength="20"
            :error-messages="passwordConfirm.errorMessage.value"></v-text-field>
          <v-text-field
            label="幹員專長"
            v-model="skills.value.value"
            :error-messages="skills.errorMessage.value"></v-text-field>
          <v-checkbox
            label="是否通過幹員考核"
            v-model="pass.value.value" v-show="user.isAdmin"
            :error-messages="pass.errorMessage.value"></v-checkbox>
          <v-textarea
            label="工作經驗"
            v-model="experience.value.value"
            :error-messages="experience.errorMessage.value"></v-textarea>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
      </v-card-actions>
      </v-card>
    </v-form>
  </v-col>
</v-row>

</template>

<script setup>
import validator from 'validator'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'

const user = useUserStore()

const { apiAuth } = useApi()

const createSnackbar = useSnackbar()
const router = useRouter()

const fileAgent = ref(null)

// 表單驗證
const schema = yup.object({
  account: yup
    .string()
    .required('請輸入帳號')
    .min(4, '帳號長度不符')
    .max(20, '帳號長度不符'),
  code: yup
    .string()
    .required('請輸入幹員代號')
    .min(1, '幹員代號長度不符')
    .max(20, '幹員代號長度不符'),
  email: yup
    .string()
    .required('信箱為必填欄位')
    .test(
      'isEmail', '信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符'),
  passwordConfirm: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符')
    .oneOf([yup.ref('password')], '密碼不一致'),
  experience: yup
    .string()
    .required('請輸入工作經驗'),
  skills: yup
    .string()
    .required('請輸入幹員專長'),
  pass: yup
    .boolean()
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    account: '',
    code: '',
    email: '',
    password: '',
    experience: '',
    skills: '',
    pass: false
  }
})
const account = useField('account')
const code = useField('code')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')
const experience = useField('experience')
const skills = useField('skills')
const pass = useField('pass')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (fileRecords.value.length === 0) return
  try {
    const fd = new FormData()
    for (const key in values) {
      fd.append(key, values[key])
    }

    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    await apiAuth.post('/mailmans', fd)

    await apiAuth.post('/users', {
      account: values.account,
      email: values.email,
      password: values.password,
      role: 2
    })
    createSnackbar({
      text: '申請成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/login')
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
