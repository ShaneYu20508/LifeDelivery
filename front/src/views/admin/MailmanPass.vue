<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <h1 class="text-center">幹員管理</h1>
    </v-col>
    <v-divider></v-divider>
    <v-data-table-server         
      v-model:items-per-page="tableItemsPerPage"
      v-model:sort-by="tableSortBy"
      v-model:page="tablePage"
      :items="tableProducts"
      :headers="tableHeaders"
      :loading="tableLoading"
      :items-length="tableItemsLength"
      :search="tableSearch"
      @update:items-per-page="tableLoadItems"
      @update:sort-by="tableLoadItems"
      @update:page="tableLoadItems"
      hover>
    </v-data-table-server>
  </v-row>
</v-container>
</template>

<script setup>
import validator from 'validator'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

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
    pass: true
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

const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  {key:'createAt', order:'desc'}
])

const tablePage = ref(1)

const tableProducts = ref([])

const tableHeaders = [
  { text: '幹員代號', key: 'code' },
  { text: '帳號', key: 'account' },
  { text: '信箱', key: 'email' },
  { text: '工作經驗', key: 'experience' },
  { text: '專長', key: 'skills' },
  { text: '狀態', key: 'pass' },
  { text: '操作', key: 'actions', sortable: false }
]

const tableLoading = ref(true)

const tableItemsLength = ref(0)

const tableSearch = ref('')

const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const {data} = await apiAuth.get('/mailmans/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    tableProducts.value.splice(0, tableProducts.value.length, ...data.result.data)
    tableItemsLength.value = data.result.total
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
  tableLoading.value = false
}
tableLoadItems()
// 表格套用搜尋
const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

</script>
