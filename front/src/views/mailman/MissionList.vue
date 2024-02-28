<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>任務列表</h1>
      </v-col>
      <v-divider></v-divider>
      <v-data-table
      v-model:items-per-page="tableItemsPerPage"
        v-model:sort-by="tableSortBy"
        v-model:page="tablePage"
        :items="tableMissions"
        :headers="tableHeaders"
        :loading="tableLoading"
        :items-length="tableItemsLength"
        :search="tableSearch"
        @update:items-per-page="tableLoadItems"
        @update:sort-by="tableLoadItems"
        @update:page="tableLoadItems"
        hover>
        <template #[`item.image`]="{ item }">
          <v-img :src="item.image" height="60"></v-img>
        </template>
        <template #[`item.accept`]="{item}">
          <v-btn icon="mdi-check" variant="text" color="blue" @click="openDialog(item)"></v-btn>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'


const { apiAuth } = useApi()

const createSnackbar = useSnackbar()

const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  { key:'createdAt',order:'desc'}
])
const tablePage = ref(1)
const tableMissions = ref([])
const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')

const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '任務標題', align: 'center', sortable: true, key: 'title' },
  { title: '任務報酬/m', align: 'center', sortable: false, key: 'reward' },
  { title: '任務內容', align: 'center', sortable: false, key: 'description' },
  { title: '發布日期', align: 'center', sortable: false, key: 'createdAt' },
  { title: '接受任務', align: 'center', sortable: false, key: 'accept' },
]

const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/missions', {
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
    tableMissions.value.splice(
      0,
      tableMissions.value.length,
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

</script>
