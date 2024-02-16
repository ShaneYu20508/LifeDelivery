<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class='text-center'>商品管理</h1>
      </v-col>
      <v-divider><!-- 分隔線  --></v-divider>
      <v-col cols="12">
        <v-btn color="green" @click="openDialog">新增商品</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" persistent width="500px"> <!-- persistent 代表點擊對話框外不會使其消失 -->
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ dialogId === '' ? '新增商品' : '編輯商品' }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="名稱"
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"></v-text-field>
          <v-text-field
            label="價格"
            type="number" min="0"
            v-model="price.value.value"
            :error-messages="price.errorMessage.value"></v-text-field>
          <v-select
            label="分類"
            :items="categories"
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"></v-select>
          <v-checkbox
            label="上架"
            v-model="sell.value.value"
            :error-messages="sell.errorMessage.value"></v-checkbox>
          <v-textarea
            label="說明"
            v-model="description.value.value"
            :error-messages="description.errorMessage.value"></v-textarea>
          <vue-file-agent
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            :erroeText="{type:'檔案格式不支援',size: '檔案超過 1MB 大小限制'}"
            help-text="選擇檔案或將檔案拖曳到這裡"
            :maxFiles="1"
            max-size="1MB"></vue-file-agent>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" :disabled="isSubmitting">取消</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
// 物件的資料格式驗證
import * as yup from 'yup'
// vue 的表單驗證工具
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

// 表單對話框的開啟狀態
const dialog = ref(false)
// 用來判斷要新增還是編輯
// 表單對話框正在編輯的商品 ID，空的話代表新增商品
const dialogId = ref('')

// 打開編輯對話框
const openDialog = () => {
  dialogId.value = ''
  dialog.value = true
}

// 分類
const categories = ['衣服', '食品', '3C', '遊戲']

const schema = yup.object({
  name: yup
    .string()
    .required('缺少商品名稱'),
  price: yup
    .number()
    .typeError('商品價格格式錯誤')
    .required('缺少商品價格')
    .min(0, '商品價格不能小於 0'),
  description: yup
    .string()
    .required('缺少商品說明'),
  category: yup
    .string()
    .required('缺少商品分類')
    .test('isCategory', '商品分類錯誤', value => categories.includes(value)),
  sell: yup
    .boolean()
})

// { 處理表單送出, 檢查是否正在送出, 重設表單 }
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false
  }
})
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')

const fileRecords = ref([])
const rawFileRecords = ref([])

// 把 form 內的資料送出
const submit = handleSubmit(async (values) => {
  // 如果長度是 0，或是有錯誤則 return
  if (fileRecords.value.length === 0 || fileRecords.value[0].error) return
  try {
    // 建立 FormData 物件
    // 使用 fd.append(欄位, 值) 將資料放進去
    const fd = new FormData()
    // 跑迴圈，把 value 的每個值都放進 FormData() 內
    for (const key in values) {
      fd.append(key, values[key])
    }
    fd.append('image', fileRecords.value[0].file)

    await apiAuth.post('/products', fd)

    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
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
