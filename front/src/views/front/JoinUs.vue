<template>
<v-row class="bg-c1 align-center justify-center h-100">
  <v-col cols="12">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card class="pa-3 ma-auto" width="600" title="Join Us">
        <v-card-text>
          <v-row>
            <v-col>
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
            <v-col cols="5" class="d-flex justify-center align-center text-center">
              <v-text-field
              label="幹員代號"
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"></v-text-field>
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
          <v-textarea
            label="工作經驗"
            v-model="experience.value.value"
            :error-messages="experience.errorMessage.value"></v-textarea>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" :disabled="isSubmitting" @click="closeDialog">取消</v-btn>
        <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
      </v-card-actions>
      </v-card>
    </v-form>
  </v-col>
</v-row>


</template>

<script setup>
import validator from 'validator'
import { ref } from 'vue'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()

const router = useRouter()
const createSnackbar = useSnackbar()

// 表單驗證
const schema = yup.object({
  account: yup
    .string()
    .required('請輸入幹員代號')
    .min(1, '代號長度不符')
    .max(20, '代號長度不符'),
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
});

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    account: '',
    email: '',
    password: '',
    experience: '',
    skills: '',
  },
});
const account = useField('account');
const email = useField('email');
const password = useField('password');
const passwordConfirm = useField('passwordConfirm')
const experience = useField('experience');
const skills = useField('skills');

const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.post('/mailmans', {
      account: values.account,
      email: values.email,
      password: values.password
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
