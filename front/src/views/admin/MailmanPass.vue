<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <h1 class="text-center">幹員管理</h1>
    </v-col>
    <v-col cols="12">
      <v-data-table-server
      v-model:items-per-page="tableItemsPerPage"
        v-model:sort-by="tableSortBy"
        v-model:page="tablePage"
        :items="tableMailmans"
        :headers="tableHeaders"
        :loading="tableLoading"
        :items-length="tableItemsLength"
        :search="tableSearch"
        @update:items-per-page="tableLoadItems"
        @update:sort-by="tableLoadItems"
        @update:page="tableLoadItems"
        hover
        >
        <template #top>
          <v-text-field
            label="搜尋"
            append-icon="mdi-magnify"
            v-model="tableSearch"
            @click:append="tableApplySearch"
            @keydown.enter="tableApplySearch"></v-text-field>
        </template>
        <template #[`item.image`]="{ item }">
          <v-img :src="item.image" height="60"></v-img>
        </template>
        <template #[`item.pass`]="{item}">
          <v-icon icon="mdi-check" v-if="item.pass"></v-icon>
        </template>
        <template #[`item.edit`]="{item}">
          <v-btn icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)"></v-btn>
        </template>
      </v-data-table-server>
    </v-col>
    <!-- ========================================================= -->
    <v-dialog v-model="dialog" persistent width="600px">
      <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card  class="pa-3 ma-auto" width="600">
        <v-card-title>編輯幹員</v-card-title>
        <v-card-text>
          <v-row cols="5">
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
              ref="fileAgent"></vue-file-agent>
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
            label="幹員專長"
            v-model="skills.value.value"
            :error-messages="skills.errorMessage.value"></v-text-field>
          <v-checkbox
            label="是否通過幹員考核"
            v-model="pass.value.value"
            :error-messages="pass.errorMessage.value"></v-checkbox>
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
  </v-dialog>
  </v-row>
</v-container>
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const fileAgent = ref(null)
const dialogId = ref('')
const dialog = ref(false)

const openDialog = (item) => {
  if (item) {
    dialogId.value = item._id
    account.value.value = item.account
    code.value.value = item.code
    email.value.value = item.email
    skills.value.value = item.skills
    experience.value.value = item.experience
    pass.value.value = item.pass
  } else {
    dialogId.value = ''
  }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}
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
    .required('信箱為必填欄位'),
  experience: yup
    .string()
    .required('請輸入工作經驗'),
  skills: yup
    .string()
    .required('請輸入幹員專長'),
  pass: yup
    .boolean()
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    account: '',
    code: '',
    email: '',
    experience: '',
    skills: '',
    pass: false
  }
})
const account = useField('account')
const code = useField('code')
const email = useField('email')
const experience = useField('experience')
const skills = useField('skills')
const pass = useField('pass')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (dialogId.value === '' && fileRecords.value.length === 0) return
  try {
    const fd = new FormData()
    for (const key in values) {
      fd.append(key, values[key])
    }

    if (fileRecords.value.length > 0) {
      if (fileRecords.value.length > 0 && fileRecords.value[0].file) {
        fd.append('image', fileRecords.value[0].file)
      }
    }
    if (dialogId.value === '') {
      await apiAuth.post('/mailmans', fd)
    } else {
      await apiAuth.patch('/mailmans/' + dialogId.value, fd)
    }
    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialog()
    tableApplySearch()
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

// 表格
// 一頁幾個
const tableItemsPerPage = ref(10)
// 排序
const tableSortBy = ref([
  { key: 'createAt', order: 'asc' }
])
// 目前第幾頁
const tablePage = ref(1)
// 所有幹員
const tableMailmans = ref([])
// 表單欄位
const tableHeaders = [
  // sortable 是否可以排序
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '代號', align: 'center', sortable: true, key: 'code' },
  { title: '專長', align: 'center', sortable: false, key: 'skills' },
  { title: '審核', align: 'center', sortable: true, key: 'pass' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' }
]
// 表格是否正在載入
const tableLoading = ref(true)
// 全部有幾個商品
const tableItemsLength = ref(0)
// 搜尋欄位
const tableSearch = ref('')

// 載入表格資料
const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/mailmans/all', {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN'
      },
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    tableMailmans.value.splice(
      0,
      tableMailmans.value.length,
      ...data.result.data
    )
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
