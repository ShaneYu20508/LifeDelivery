<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1.text-center 發布任務
    VDivider
    VCol(cols="12")
      VBtn(color="green" @click="openDialog()") 新增任務
    VCol(cols="12")
      VDataTableServer(
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
        hover
      )
        template(#top)
          VTextField(
            label="搜尋"
            append-icon="mdi-magnify"
            v-model="tableSearch"
            @click:append="tableApplySearch"
            @keydown.enter="tableApplySearch"
          )
        template(#[`item.image`]="{ item }")
          VImg(:src="item.image" height="50px")
        template(#[`item.sell`]="{ item }")
          VIcon(icon="mdi-check" v-if="item.sell")
        template(#[`item.edit`]="{ item }")
          VBtn(icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)")
VDialog(v-model="dialog" persistent width="500px")
  VForm(:disabled="isSubmitting" @submit.prevent="submit")
    VCard
      VCardTitle {{ dialogId === '' ? '新增任務' : '編輯任務' }}
      VCardText
        VTextField(
          label="任務標題"
          v-model="title.value.value"
          :error-messages="title.errorMessage.value"
        )
        VTextField(
          label="任務報酬/m"
          type="number" min="0"
          v-model="reward.value.value"
          :error-messages="reward.errorMessage.value"
        )
        VSelect(
          label="任務狀態"
          :items="isPublic"
          v-model="status.value.value"
          :error-messages="status.errorMessage.value"
        )
        VTextarea(
          label="任務說明"
          v-model="description.value.value"
          :error-messages="description.errorMessage.value"
        )
        VueFileAgent(
          v-model="fileRecords"
          v-model:rawModelValue="rawFileRecords"
          accept="image/jpeg,image/png"
          deletable
          :error-text="{type: '檔案格式不支援', size: '檔案超過 1MB 大小限制'}"
          help-text="選擇檔案或拖曳到這裡"
          :max-files="1"
          max-size="1MB"
          ref="fileAgent"
        )
      VCardActions
        VSpacer
        VBtn(color="red" :disabled="isSubmitting" @click="closeDialog") 取消
        VBtn(color="green" type="submit" :loading="isSubmitting") 送出
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

// 表單對話框的開啟狀態
const dialog = ref(false)
// 表單對話框正在編輯的商品 ID，空的話代表是新增商品
const dialogId = ref('')
// 打開編輯對話框
const openDialog = (item) => {
  if (item) {
    dialogId.value = item._id
    title.value.value = item.title
    reward.value.value = item.reward
    description.value.value = item.description
    status.value.value = item.isPublic
    // publisher.value.value = item.publisher
  } else {
    dialogId.value = ''
  }
  dialog.value = true
}
// 關閉對話框
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}

// 狀態
const isPublic = ['公開', '私人']

// 表單驗證
const schema = yup.object({
  title: yup
    .string()
    .required('請輸入任務標題'),
  reward: yup
    .number()
    .typeError('任務報酬格式錯誤')
    .required('請輸入任務報酬')
    .min(1, '任務報酬不能小於 1'),
  status: yup
    .string()
    .required('請選擇任務狀態')
    .test('is-public', '請選擇任務狀態', (value) => isPublic.includes(value)),
  description: yup
    .string()
    .required('請輸入任務說明')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    reward: 0,
    status: '公開',
    description: ''
  }
})
const title = useField('title')
const reward = useField('reward')
const status = useField('status')
const description = useField('description')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (dialogId.value === '' && fileRecords.value.length === 0) return
  try {
    // 建立 FormData 物件
    // 使用 fd.append(欄位, 值) 將資料放進去
    const fd = new FormData()
    for (const key in values) {
      fd.append(key, values[key])
    }

    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    if (dialogId.value === '') {
      await apiAuth.post('/missions', fd)
    } else {
      await apiAuth.patch('/missions/' + dialogId.value, fd)
    }

    createSnackbar({
      text: dialogId.value === '' ? '新增成功' : '編輯成功',
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

// 表格每頁幾個
const tableItemsPerPage = ref(10)
// 表格排序
const tableSortBy = ref([{ key: 'createdAt', order: 'desc' }])
// 表格頁碼
const tablePage = ref(1)
// 表格商品資料陣列
const tableProducts = ref([])
// 表格欄位設定
const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '任務標題', align: 'left', sortable: true, key: 'title' },
  { title: '任務報酬/m', align: 'left', sortable: true, key: 'reward' },
  { title: '任務狀態', align: 'left', sortable: true, key: 'status' },
  { title: '任務說明', align: 'left', sortable: true, key: 'description' },
  { title: '編輯', align: 'left', sortable: false, key: 'edit' }
]
// 表格載入狀態
const tableLoading = ref(true)
// 表格全部資料數
const tableItemsLength = ref(0)
// 表格搜尋文字
const tableSearch = ref('')
// 表格載入資料
const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/missions/all', {
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
    tableProducts.value.splice(
      0,
      tableProducts.value.length,
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
