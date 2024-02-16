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
  <v-dialog v-model="dialog" persistent> <!-- persistent 代表點擊對話框外不會使其消失 -->
    <v-form>
      <v-card>
        <v-card-title>{{dialogId === '' ? '新增商品' : '編輯商品'}}</v-card-title>
        <v-card-text>
          <v-text-field label="名稱"></v-text-field>
          <v-text-field label="價格" type="number" min="0"></v-text-field>
          <v-select label="分類" :items="categories"></v-select>
          <v-checkbox label="上架"></v-checkbox>
          <v-textarea label="說明"></v-textarea>
          <vue-file-agent></vue-file-agent>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red">取消</v-btn>
          <v-btn color="green">送出</v-btn>
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

// {處理表單送出, 檢查是否正在送出, 是的話暫時停用表單}
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
</script>
