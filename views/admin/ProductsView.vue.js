/* __placeholder__ */

import { ref } from 'vue'
// 物件的資料格式驗證
import * as yup from 'yup'
// vue 的表單驗證工具
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

// 清除表單內的資料
const fileAgent = ref(null)

// 表單對話框的開啟狀態
const dialog = ref(false)
// 用來判斷要新增還是編輯
// 表單對話框正在編輯的商品 ID，空的話代表新增商品
const dialogId = ref('')

// 打開編輯對話框
const openDialog = (item) => {
  // 如果已經有東西，代表正在編輯
  // 自動將該商品的值代入
  if (item) {
    dialogId.value = item._id
    name.value.value = item.name
    price.value.value = item.price
    description.value.value = item.description
    category.value.value = item.category
    sell.value.value = item.sell
    // 如果 item 是空的，代表是新增
  } else {
    dialogId.value = ''
  }
  dialog.value = true
}

// 關閉編輯對話框
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
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
  // 如果有錯誤就不執行
  if (fileRecords.value[0]?.error) return
  // 如果 idalogId 的 value 是空的，但是並沒有選擇任何檔案，也不執行
  if (dialogId.value === '' && fileRecords.value.length === 0) return
  try {
    // 建立 FormData 物件
    // 使用 fd.append(欄位, 值) 將資料放進去
    const fd = new FormData()
    // 跑迴圈，把 value 的每個值都放進 FormData() 內
    for (const key in values) {
      fd.append(key, values[key])
    }
    // 如果有東西才會 push 進去，沒有就給 undefined
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    // 新增和編輯的路徑不同，因此要增加判斷
    if (dialogId.value === '') {
      await apiAuth.post('/products', fd)
    } else {
      await apiAuth.patch('/products/' + dialogId.value, fd)
    }

    createSnackbar({
      // 如果 value = 0 代表新增，反之則為編輯
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

// 表格
// 定義一頁幾個
const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  // 表格順序, desc 倒序
  { key: 'createdAt', order: 'desc' }
])

// 表格頁碼。目前第幾頁
const tablePage = ref(1)

// 表格商品資料陣列
const tableProducts = ref([1])

// 設定表格欄位
// sortable 為是否能依據該項目排序
const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '名稱', align: 'center', sortable: true, key: 'name' },
  { title: '價格', align: 'center', sortable: true, key: 'price' },
  // { title: '說明', align: 'center', sortable: true, key: 'description' }
  { title: '分類', align: 'center', sortable: true, key: 'category' },
  { title: '是否上架', align: 'center', sortable: true, key: 'sell' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' }
]
// 表格載入狀態
const tableLoading = ref(true)

// 表格全部資料數
const tableItemsLength = ref(0)

// 表格搜尋文字
const tableSearch = ref('')

// 表格載入資料，對後端發請求
const tableLoadItems = async () => {
  // 請求之前先設定表格為載入中
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/products/all', {
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
  // 請求完成後把載入中關閉
  tableLoading.value = false
}
tableLoadItems()

// 表格套用搜尋
const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

const __VLS_componentsOption = {};

let __VLS_name!: 'ProductsView';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {
};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {}
& __VLS_WithComponent<'VContainer', typeof __VLS_localComponents, "VContainer", "vContainer", "v-container">
& __VLS_WithComponent<'VRow', typeof __VLS_localComponents, "VRow", "vRow", "v-row">
& __VLS_WithComponent<'VCol', typeof __VLS_localComponents, "VCol", "vCol", "v-col">
& __VLS_WithComponent<'VDivider', typeof __VLS_localComponents, "VDivider", "vDivider", "v-divider">
& __VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "vBtn", "v-btn">
& __VLS_WithComponent<'VDataTableServer', typeof __VLS_localComponents, "VDataTableServer", "vDataTableServer", "v-data-table-server">
& __VLS_WithComponent<'VTextField', typeof __VLS_localComponents, "VTextField", "vTextField", "v-text-field">
& __VLS_WithComponent<'VImg', typeof __VLS_localComponents, "VImg", "vImg", "v-img">
& __VLS_WithComponent<'VIcon', typeof __VLS_localComponents, "VIcon", "vIcon", "v-icon">
& __VLS_WithComponent<'VDialog', typeof __VLS_localComponents, "VDialog", "vDialog", "v-dialog">
& __VLS_WithComponent<'VForm', typeof __VLS_localComponents, "VForm", "vForm", "v-form">
& __VLS_WithComponent<'VCard', typeof __VLS_localComponents, "VCard", "vCard", "v-card">
& __VLS_WithComponent<'VCardTitle', typeof __VLS_localComponents, "VCardTitle", "vCardTitle", "v-card-title">
& __VLS_WithComponent<'VCardText', typeof __VLS_localComponents, "VCardText", "vCardText", "v-card-text">
& __VLS_WithComponent<'VSelect', typeof __VLS_localComponents, "VSelect", "vSelect", "v-select">
& __VLS_WithComponent<'VCheckbox', typeof __VLS_localComponents, "VCheckbox", "vCheckbox", "v-checkbox">
& __VLS_WithComponent<'VTextarea', typeof __VLS_localComponents, "VTextarea", "vTextarea", "v-textarea">
& __VLS_WithComponent<'VueFileAgent', typeof __VLS_localComponents, "VueFileAgent", "vueFileAgent", "vue-file-agent">
& __VLS_WithComponent<'VCardActions', typeof __VLS_localComponents, "VCardActions", "vCardActions", "v-card-actions">
& __VLS_WithComponent<'VSpacer', typeof __VLS_localComponents, "VSpacer", "vSpacer", "v-spacer">
;
__VLS_components.VContainer;__VLS_components.VContainer;__VLS_components.vContainer;__VLS_components.vContainer;__VLS_components["v-container"];__VLS_components["v-container"];
// @ts-ignore
[VContainer,VContainer,];
__VLS_components.VRow;__VLS_components.VRow;__VLS_components.vRow;__VLS_components.vRow;__VLS_components["v-row"];__VLS_components["v-row"];
// @ts-ignore
[VRow,VRow,];
__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];
// @ts-ignore
[VCol,VCol,VCol,VCol,VCol,VCol,];
__VLS_intrinsicElements.h1;__VLS_intrinsicElements.h1;
__VLS_components.VDivider;__VLS_components.VDivider;__VLS_components.vDivider;__VLS_components.vDivider;__VLS_components["v-divider"];__VLS_components["v-divider"];
// @ts-ignore
[VDivider,VDivider,];
__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];
// @ts-ignore
[VBtn,VBtn,VBtn,VBtn,VBtn,VBtn,VBtn,VBtn,];
__VLS_components.VDataTableServer;__VLS_components.VDataTableServer;__VLS_components.vDataTableServer;__VLS_components.vDataTableServer;__VLS_components["v-data-table-server"];__VLS_components["v-data-table-server"];
// @ts-ignore
[VDataTableServer,VDataTableServer,];
__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;
__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.vTextField;__VLS_components.vTextField;__VLS_components.vTextField;__VLS_components.vTextField;__VLS_components.vTextField;__VLS_components.vTextField;__VLS_components["v-text-field"];__VLS_components["v-text-field"];__VLS_components["v-text-field"];__VLS_components["v-text-field"];__VLS_components["v-text-field"];__VLS_components["v-text-field"];
// @ts-ignore
[VTextField,VTextField,VTextField,VTextField,VTextField,VTextField,];
__VLS_components.VImg;__VLS_components.VImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components["v-img"];__VLS_components["v-img"];
// @ts-ignore
[VImg,VImg,];
__VLS_components.VIcon;__VLS_components.VIcon;__VLS_components.vIcon;__VLS_components.vIcon;__VLS_components["v-icon"];__VLS_components["v-icon"];
// @ts-ignore
[VIcon,VIcon,];
__VLS_components.VDialog;__VLS_components.VDialog;__VLS_components.vDialog;__VLS_components.vDialog;__VLS_components["v-dialog"];__VLS_components["v-dialog"];
// @ts-ignore
[VDialog,VDialog,];
__VLS_components.VForm;__VLS_components.VForm;__VLS_components.vForm;__VLS_components.vForm;__VLS_components["v-form"];__VLS_components["v-form"];
// @ts-ignore
[VForm,VForm,];
__VLS_components.VCard;__VLS_components.VCard;__VLS_components.vCard;__VLS_components.vCard;__VLS_components["v-card"];__VLS_components["v-card"];
// @ts-ignore
[VCard,VCard,];
__VLS_components.VCardTitle;__VLS_components.VCardTitle;__VLS_components.vCardTitle;__VLS_components.vCardTitle;__VLS_components["v-card-title"];__VLS_components["v-card-title"];
// @ts-ignore
[VCardTitle,VCardTitle,];
__VLS_components.VCardText;__VLS_components.VCardText;__VLS_components.vCardText;__VLS_components.vCardText;__VLS_components["v-card-text"];__VLS_components["v-card-text"];
// @ts-ignore
[VCardText,VCardText,];
__VLS_components.VSelect;__VLS_components.VSelect;__VLS_components.vSelect;__VLS_components.vSelect;__VLS_components["v-select"];__VLS_components["v-select"];
// @ts-ignore
[VSelect,VSelect,];
__VLS_components.VCheckbox;__VLS_components.VCheckbox;__VLS_components.vCheckbox;__VLS_components.vCheckbox;__VLS_components["v-checkbox"];__VLS_components["v-checkbox"];
// @ts-ignore
[VCheckbox,VCheckbox,];
__VLS_components.VTextarea;__VLS_components.VTextarea;__VLS_components.vTextarea;__VLS_components.vTextarea;__VLS_components["v-textarea"];__VLS_components["v-textarea"];
// @ts-ignore
[VTextarea,VTextarea,];
__VLS_components.VueFileAgent;__VLS_components.VueFileAgent;__VLS_components.vueFileAgent;__VLS_components.vueFileAgent;__VLS_components["vue-file-agent"];__VLS_components["vue-file-agent"];
// @ts-ignore
[VueFileAgent,VueFileAgent,];
__VLS_components.VCardActions;__VLS_components.VCardActions;__VLS_components.vCardActions;__VLS_components.vCardActions;__VLS_components["v-card-actions"];__VLS_components["v-card-actions"];
// @ts-ignore
[VCardActions,VCardActions,];
__VLS_components.VSpacer;__VLS_components.VSpacer;__VLS_components.vSpacer;__VLS_components.vSpacer;__VLS_components["v-spacer"];__VLS_components["v-spacer"];
// @ts-ignore
[VSpacer,VSpacer,];
{
const __VLS_0 = ({} as 'VContainer' extends keyof typeof __VLS_ctx ? { 'VContainer': typeof __VLS_ctx.VContainer }: 'vContainer' extends keyof typeof __VLS_ctx ? { 'VContainer': typeof __VLS_ctx.vContainer }: 'v-container' extends keyof typeof __VLS_ctx ? { 'VContainer': typeof __VLS_ctx["v-container"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VContainer;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({...{ }, }));
({} as { VContainer: typeof __VLS_0 }).VContainer;
({} as { VContainer: typeof __VLS_0 }).VContainer;
const __VLS_2 = __VLS_1({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = ({} as 'VRow' extends keyof typeof __VLS_ctx ? { 'VRow': typeof __VLS_ctx.VRow }: 'vRow' extends keyof typeof __VLS_ctx ? { 'VRow': typeof __VLS_ctx.vRow }: 'v-row' extends keyof typeof __VLS_ctx ? { 'VRow': typeof __VLS_ctx["v-row"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VRow;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, }));
({} as { VRow: typeof __VLS_5 }).VRow;
({} as { VRow: typeof __VLS_5 }).VRow;
const __VLS_7 = __VLS_6({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({...{ }, cols: ("12"), }));
({} as { VCol: typeof __VLS_10 }).VCol;
({} as { VCol: typeof __VLS_10 }).VCol;
const __VLS_12 = __VLS_11({ ...{ }, cols: ("12"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = __VLS_intrinsicElements["h1"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{ }, class: ('text-center'), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, class: ('text-center'), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
(__VLS_18.slots!).default;
}
(__VLS_13.slots!).default;
}
{
const __VLS_20 = ({} as 'VDivider' extends keyof typeof __VLS_ctx ? { 'VDivider': typeof __VLS_ctx.VDivider }: 'vDivider' extends keyof typeof __VLS_ctx ? { 'VDivider': typeof __VLS_ctx.vDivider }: 'v-divider' extends keyof typeof __VLS_ctx ? { 'VDivider': typeof __VLS_ctx["v-divider"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VDivider;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({...{ }, }));
({} as { VDivider: typeof __VLS_20 }).VDivider;
({} as { VDivider: typeof __VLS_20 }).VDivider;
const __VLS_22 = __VLS_21({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
(__VLS_23.slots!).default;
}
{
const __VLS_25 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({...{ }, cols: ("12"), }));
({} as { VCol: typeof __VLS_25 }).VCol;
({} as { VCol: typeof __VLS_25 }).VCol;
const __VLS_27 = __VLS_26({ ...{ }, cols: ("12"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
{
const __VLS_30 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({...{ onClick: {} as any, }, color: ("green"), }));
({} as { VBtn: typeof __VLS_30 }).VBtn;
({} as { VBtn: typeof __VLS_30 }).VBtn;
const __VLS_32 = __VLS_31({ ...{ onClick: {} as any, }, color: ("green"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, color: ("green"), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
let __VLS_35 = { 'click': __VLS_pickEvent(__VLS_34['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_31, typeof __VLS_32>).onClick) };
__VLS_35 = { click: $event => {
__VLS_ctx.openDialog();
// @ts-ignore
[openDialog,];
}
 };
(__VLS_33.slots!).default;
}
(__VLS_28.slots!).default;
}
{
const __VLS_36 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({...{ }, cols: ("12"), }));
({} as { VCol: typeof __VLS_36 }).VCol;
({} as { VCol: typeof __VLS_36 }).VCol;
const __VLS_38 = __VLS_37({ ...{ }, cols: ("12"), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_36, typeof __VLS_38> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), });
const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38)!;
let __VLS_40!: __VLS_NormalizeEmits<typeof __VLS_39.emit>;
{
const __VLS_41 = ({} as 'VDataTableServer' extends keyof typeof __VLS_ctx ? { 'VDataTableServer': typeof __VLS_ctx.VDataTableServer }: 'vDataTableServer' extends keyof typeof __VLS_ctx ? { 'VDataTableServer': typeof __VLS_ctx.vDataTableServer }: 'v-data-table-server' extends keyof typeof __VLS_ctx ? { 'VDataTableServer': typeof __VLS_ctx["v-data-table-server"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VDataTableServer;
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({...{ "onUpdate:itemsPerPage": {} as any, "onUpdate:sortBy": {} as any, "onUpdate:page": {} as any, }, itemsPerPage: ((__VLS_ctx.tableItemsPerPage)), sortBy: ((__VLS_ctx.tableSortBy)), page: ((__VLS_ctx.tablePage)), items: ((__VLS_ctx.tableProducts)), headers: ((__VLS_ctx.tableHeaders)), loading: ((__VLS_ctx.tableLoading)), itemsLength: ((__VLS_ctx.tableItemsLength)), search: ((__VLS_ctx.tableSearch)), hover: (true), }));
({} as { VDataTableServer: typeof __VLS_41 }).VDataTableServer;
({} as { VDataTableServer: typeof __VLS_41 }).VDataTableServer;
const __VLS_43 = __VLS_42({ ...{ "onUpdate:itemsPerPage": {} as any, "onUpdate:sortBy": {} as any, "onUpdate:page": {} as any, }, itemsPerPage: ((__VLS_ctx.tableItemsPerPage)), sortBy: ((__VLS_ctx.tableSortBy)), page: ((__VLS_ctx.tablePage)), items: ((__VLS_ctx.tableProducts)), headers: ((__VLS_ctx.tableHeaders)), loading: ((__VLS_ctx.tableLoading)), itemsLength: ((__VLS_ctx.tableItemsLength)), search: ((__VLS_ctx.tableSearch)), hover: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_41, typeof __VLS_43> & Record<string, unknown>) => void)({ ...{ "onUpdate:itemsPerPage": {} as any, "onUpdate:sortBy": {} as any, "onUpdate:page": {} as any, }, itemsPerPage: ((__VLS_ctx.tableItemsPerPage)), sortBy: ((__VLS_ctx.tableSortBy)), page: ((__VLS_ctx.tablePage)), items: ((__VLS_ctx.tableProducts)), headers: ((__VLS_ctx.tableHeaders)), loading: ((__VLS_ctx.tableLoading)), itemsLength: ((__VLS_ctx.tableItemsLength)), search: ((__VLS_ctx.tableSearch)), hover: (true), });
const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43)!;
let __VLS_45!: __VLS_NormalizeEmits<typeof __VLS_44.emit>;
let __VLS_46 = { 'update:items-per-page': __VLS_pickEvent(__VLS_45['update:items-per-page'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_42, typeof __VLS_43>)["onUpdate:itemsPerPage"]) };
__VLS_46 = { "update:items-per-page": (__VLS_ctx.tableLoadItems) };
let __VLS_47 = { 'update:sort-by': __VLS_pickEvent(__VLS_45['update:sort-by'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_42, typeof __VLS_43>)["onUpdate:sortBy"]) };
__VLS_47 = { "update:sort-by": (__VLS_ctx.tableLoadItems) };
let __VLS_48 = { 'update:page': __VLS_pickEvent(__VLS_45['update:page'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_42, typeof __VLS_43>)["onUpdate:page"]) };
__VLS_48 = { "update:page": (__VLS_ctx.tableLoadItems) };
{
const __VLS_49 = __VLS_intrinsicElements["template"];
const __VLS_50 = __VLS_elementAsFunctionalComponent(__VLS_49);
const __VLS_51 = __VLS_50({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_50));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_49, typeof __VLS_51> & Record<string, unknown>) => void)({ ...{ }, });
{
(__VLS_44.slots!).top;
{
const __VLS_52 = ({} as 'VTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.VTextField }: 'vTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.vTextField }: 'v-text-field' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx["v-text-field"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VTextField;
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({...{ "onClick:append": {} as any, onKeydown: {} as any, }, label: ("搜尋"), appendIcon: ("mdi-magnify"), modelValue: ((__VLS_ctx.tableSearch)), }));
({} as { VTextField: typeof __VLS_52 }).VTextField;
({} as { VTextField: typeof __VLS_52 }).VTextField;
const __VLS_54 = __VLS_53({ ...{ "onClick:append": {} as any, onKeydown: {} as any, }, label: ("搜尋"), appendIcon: ("mdi-magnify"), modelValue: ((__VLS_ctx.tableSearch)), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_52, typeof __VLS_54> & Record<string, unknown>) => void)({ ...{ "onClick:append": {} as any, onKeydown: {} as any, }, label: ("搜尋"), appendIcon: ("mdi-magnify"), modelValue: ((__VLS_ctx.tableSearch)), });
const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54)!;
let __VLS_56!: __VLS_NormalizeEmits<typeof __VLS_55.emit>;
let __VLS_57 = { 'click:append': __VLS_pickEvent(__VLS_56['click:append'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_53, typeof __VLS_54>)["onClick:append"]) };
__VLS_57 = { "click:append": (__VLS_ctx.tableApplySearch) };
let __VLS_58 = { 'keydown': __VLS_pickEvent(__VLS_56['keydown'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_53, typeof __VLS_54>).onKeydown) };
__VLS_58 = { keydown: (__VLS_ctx.tableApplySearch) };
}
// @ts-ignore
[tableItemsPerPage,tableSortBy,tablePage,tableProducts,tableHeaders,tableLoading,tableItemsLength,tableSearch,tableItemsPerPage,tableSortBy,tablePage,tableProducts,tableHeaders,tableLoading,tableItemsLength,tableSearch,tableItemsPerPage,tableSortBy,tablePage,tableProducts,tableHeaders,tableLoading,tableItemsLength,tableSearch,tableLoadItems,tableLoadItems,tableLoadItems,tableSearch,tableSearch,tableSearch,tableApplySearch,tableApplySearch,];
}
}
{
const __VLS_59 = __VLS_intrinsicElements["template"];
const __VLS_60 = __VLS_elementAsFunctionalComponent(__VLS_59);
const __VLS_61 = __VLS_60({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_60));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_59, typeof __VLS_61> & Record<string, unknown>) => void)({ ...{ }, });
{
const [{item}] = __VLS_getSlotParams((__VLS_44.slots!)[`item.image`]);
{
const __VLS_62 = ({} as 'VImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.VImg }: 'vImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.vImg }: 'v-img' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx["v-img"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VImg;
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({...{ }, src: ((item.image)), height: ("50px"), }));
({} as { VImg: typeof __VLS_62 }).VImg;
({} as { VImg: typeof __VLS_62 }).VImg;
const __VLS_64 = __VLS_63({ ...{ }, src: ((item.image)), height: ("50px"), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_62, typeof __VLS_64> & Record<string, unknown>) => void)({ ...{ }, src: ((item.image)), height: ("50px"), });
const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64)!;
let __VLS_66!: __VLS_NormalizeEmits<typeof __VLS_65.emit>;
}
}
}
{
const __VLS_67 = __VLS_intrinsicElements["template"];
const __VLS_68 = __VLS_elementAsFunctionalComponent(__VLS_67);
const __VLS_69 = __VLS_68({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_68));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_67, typeof __VLS_69> & Record<string, unknown>) => void)({ ...{ }, });
{
const [{item}] = __VLS_getSlotParams((__VLS_44.slots!)[`item.sell`]);
if (item.sell) {
{
const __VLS_70 = ({} as 'VIcon' extends keyof typeof __VLS_ctx ? { 'VIcon': typeof __VLS_ctx.VIcon }: 'vIcon' extends keyof typeof __VLS_ctx ? { 'VIcon': typeof __VLS_ctx.vIcon }: 'v-icon' extends keyof typeof __VLS_ctx ? { 'VIcon': typeof __VLS_ctx["v-icon"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VIcon;
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({...{ }, icon: ("mdi-check"), }));
({} as { VIcon: typeof __VLS_70 }).VIcon;
({} as { VIcon: typeof __VLS_70 }).VIcon;
const __VLS_72 = __VLS_71({ ...{ }, icon: ("mdi-check"), }, ...__VLS_functionalComponentArgsRest(__VLS_71));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_70, typeof __VLS_72> & Record<string, unknown>) => void)({ ...{ }, icon: ("mdi-check"), });
const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72)!;
let __VLS_74!: __VLS_NormalizeEmits<typeof __VLS_73.emit>;
}
}
}
}
{
const __VLS_75 = __VLS_intrinsicElements["template"];
const __VLS_76 = __VLS_elementAsFunctionalComponent(__VLS_75);
const __VLS_77 = __VLS_76({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_76));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_75, typeof __VLS_77> & Record<string, unknown>) => void)({ ...{ }, });
{
const [{item}] = __VLS_getSlotParams((__VLS_44.slots!)[`item.edit`]);
{
const __VLS_78 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({...{ onClick: {} as any, }, icon: ("mdi-pencil"), variant: ("text"), color: ("gray"), }));
({} as { VBtn: typeof __VLS_78 }).VBtn;
({} as { VBtn: typeof __VLS_78 }).VBtn;
const __VLS_80 = __VLS_79({ ...{ onClick: {} as any, }, icon: ("mdi-pencil"), variant: ("text"), color: ("gray"), }, ...__VLS_functionalComponentArgsRest(__VLS_79));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_78, typeof __VLS_80> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, icon: ("mdi-pencil"), variant: ("text"), color: ("gray"), });
const __VLS_81 = __VLS_pickFunctionalComponentCtx(__VLS_78, __VLS_80)!;
let __VLS_82!: __VLS_NormalizeEmits<typeof __VLS_81.emit>;
let __VLS_83 = { 'click': __VLS_pickEvent(__VLS_82['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_79, typeof __VLS_80>).onClick) };
__VLS_83 = { click: $event => {
__VLS_ctx.openDialog(item);
// @ts-ignore
[openDialog,];
}
 };
}
}
}
}
(__VLS_39.slots!).default;
}
(__VLS_8.slots!).default;
}
(__VLS_3.slots!).default;
}
{
const __VLS_84 = ({} as 'VDialog' extends keyof typeof __VLS_ctx ? { 'VDialog': typeof __VLS_ctx.VDialog }: 'vDialog' extends keyof typeof __VLS_ctx ? { 'VDialog': typeof __VLS_ctx.vDialog }: 'v-dialog' extends keyof typeof __VLS_ctx ? { 'VDialog': typeof __VLS_ctx["v-dialog"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VDialog;
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({...{ }, modelValue: ((__VLS_ctx.dialog)), persistent: (true), width: ("500px"), }));
({} as { VDialog: typeof __VLS_84 }).VDialog;
({} as { VDialog: typeof __VLS_84 }).VDialog;
const __VLS_86 = __VLS_85({ ...{ }, modelValue: ((__VLS_ctx.dialog)), persistent: (true), width: ("500px"), }, ...__VLS_functionalComponentArgsRest(__VLS_85));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_84, typeof __VLS_86> & Record<string, unknown>) => void)({ ...{ }, modelValue: ((__VLS_ctx.dialog)), persistent: (true), width: ("500px"), });
const __VLS_87 = __VLS_pickFunctionalComponentCtx(__VLS_84, __VLS_86)!;
let __VLS_88!: __VLS_NormalizeEmits<typeof __VLS_87.emit>;
{
const __VLS_89 = ({} as 'VForm' extends keyof typeof __VLS_ctx ? { 'VForm': typeof __VLS_ctx.VForm }: 'vForm' extends keyof typeof __VLS_ctx ? { 'VForm': typeof __VLS_ctx.vForm }: 'v-form' extends keyof typeof __VLS_ctx ? { 'VForm': typeof __VLS_ctx["v-form"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VForm;
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), }));
({} as { VForm: typeof __VLS_89 }).VForm;
({} as { VForm: typeof __VLS_89 }).VForm;
const __VLS_91 = __VLS_90({ ...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), }, ...__VLS_functionalComponentArgsRest(__VLS_90));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_89, typeof __VLS_91> & Record<string, unknown>) => void)({ ...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), });
const __VLS_92 = __VLS_pickFunctionalComponentCtx(__VLS_89, __VLS_91)!;
let __VLS_93!: __VLS_NormalizeEmits<typeof __VLS_92.emit>;
let __VLS_94 = { 'submit': __VLS_pickEvent(__VLS_93['submit'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_90, typeof __VLS_91>).onSubmit) };
__VLS_94 = { submit: (__VLS_ctx.submit) };
{
const __VLS_95 = ({} as 'VCard' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx.VCard }: 'vCard' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx.vCard }: 'v-card' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx["v-card"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCard;
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({...{ }, }));
({} as { VCard: typeof __VLS_95 }).VCard;
({} as { VCard: typeof __VLS_95 }).VCard;
const __VLS_97 = __VLS_96({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_96));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_95, typeof __VLS_97> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_98 = __VLS_pickFunctionalComponentCtx(__VLS_95, __VLS_97)!;
let __VLS_99!: __VLS_NormalizeEmits<typeof __VLS_98.emit>;
{
const __VLS_100 = ({} as 'VCardTitle' extends keyof typeof __VLS_ctx ? { 'VCardTitle': typeof __VLS_ctx.VCardTitle }: 'vCardTitle' extends keyof typeof __VLS_ctx ? { 'VCardTitle': typeof __VLS_ctx.vCardTitle }: 'v-card-title' extends keyof typeof __VLS_ctx ? { 'VCardTitle': typeof __VLS_ctx["v-card-title"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCardTitle;
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({...{ }, }));
({} as { VCardTitle: typeof __VLS_100 }).VCardTitle;
({} as { VCardTitle: typeof __VLS_100 }).VCardTitle;
const __VLS_102 = __VLS_101({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_101));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_100, typeof __VLS_102> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_103 = __VLS_pickFunctionalComponentCtx(__VLS_100, __VLS_102)!;
let __VLS_104!: __VLS_NormalizeEmits<typeof __VLS_103.emit>;
( __VLS_ctx.dialogId === '' ? '新增商品' : '編輯商品' );
(__VLS_103.slots!).default;
}
{
const __VLS_105 = ({} as 'VCardText' extends keyof typeof __VLS_ctx ? { 'VCardText': typeof __VLS_ctx.VCardText }: 'vCardText' extends keyof typeof __VLS_ctx ? { 'VCardText': typeof __VLS_ctx.vCardText }: 'v-card-text' extends keyof typeof __VLS_ctx ? { 'VCardText': typeof __VLS_ctx["v-card-text"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCardText;
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({...{ }, }));
({} as { VCardText: typeof __VLS_105 }).VCardText;
({} as { VCardText: typeof __VLS_105 }).VCardText;
const __VLS_107 = __VLS_106({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_106));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_105, typeof __VLS_107> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_108 = __VLS_pickFunctionalComponentCtx(__VLS_105, __VLS_107)!;
let __VLS_109!: __VLS_NormalizeEmits<typeof __VLS_108.emit>;
{
const __VLS_110 = ({} as 'VTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.VTextField }: 'vTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.vTextField }: 'v-text-field' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx["v-text-field"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VTextField;
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({...{ }, label: ("名稱"), modelValue: ((__VLS_ctx.name.value.value)), errorMessages: ((__VLS_ctx.name.errorMessage.value)), }));
({} as { VTextField: typeof __VLS_110 }).VTextField;
({} as { VTextField: typeof __VLS_110 }).VTextField;
const __VLS_112 = __VLS_111({ ...{ }, label: ("名稱"), modelValue: ((__VLS_ctx.name.value.value)), errorMessages: ((__VLS_ctx.name.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_111));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_110, typeof __VLS_112> & Record<string, unknown>) => void)({ ...{ }, label: ("名稱"), modelValue: ((__VLS_ctx.name.value.value)), errorMessages: ((__VLS_ctx.name.errorMessage.value)), });
const __VLS_113 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112)!;
let __VLS_114!: __VLS_NormalizeEmits<typeof __VLS_113.emit>;
}
{
const __VLS_115 = ({} as 'VTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.VTextField }: 'vTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.vTextField }: 'v-text-field' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx["v-text-field"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VTextField;
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({...{ }, label: ("價格"), type: ("number"), min: ("0"), modelValue: ((__VLS_ctx.price.value.value)), errorMessages: ((__VLS_ctx.price.errorMessage.value)), }));
({} as { VTextField: typeof __VLS_115 }).VTextField;
({} as { VTextField: typeof __VLS_115 }).VTextField;
const __VLS_117 = __VLS_116({ ...{ }, label: ("價格"), type: ("number"), min: ("0"), modelValue: ((__VLS_ctx.price.value.value)), errorMessages: ((__VLS_ctx.price.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_116));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_115, typeof __VLS_117> & Record<string, unknown>) => void)({ ...{ }, label: ("價格"), type: ("number"), min: ("0"), modelValue: ((__VLS_ctx.price.value.value)), errorMessages: ((__VLS_ctx.price.errorMessage.value)), });
const __VLS_118 = __VLS_pickFunctionalComponentCtx(__VLS_115, __VLS_117)!;
let __VLS_119!: __VLS_NormalizeEmits<typeof __VLS_118.emit>;
}
{
const __VLS_120 = ({} as 'VSelect' extends keyof typeof __VLS_ctx ? { 'VSelect': typeof __VLS_ctx.VSelect }: 'vSelect' extends keyof typeof __VLS_ctx ? { 'VSelect': typeof __VLS_ctx.vSelect }: 'v-select' extends keyof typeof __VLS_ctx ? { 'VSelect': typeof __VLS_ctx["v-select"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VSelect;
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({...{ }, label: ("分類"), items: ((__VLS_ctx.categories)), modelValue: ((__VLS_ctx.category.value.value)), errorMessages: ((__VLS_ctx.category.errorMessage.value)), }));
({} as { VSelect: typeof __VLS_120 }).VSelect;
({} as { VSelect: typeof __VLS_120 }).VSelect;
const __VLS_122 = __VLS_121({ ...{ }, label: ("分類"), items: ((__VLS_ctx.categories)), modelValue: ((__VLS_ctx.category.value.value)), errorMessages: ((__VLS_ctx.category.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_121));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_120, typeof __VLS_122> & Record<string, unknown>) => void)({ ...{ }, label: ("分類"), items: ((__VLS_ctx.categories)), modelValue: ((__VLS_ctx.category.value.value)), errorMessages: ((__VLS_ctx.category.errorMessage.value)), });
const __VLS_123 = __VLS_pickFunctionalComponentCtx(__VLS_120, __VLS_122)!;
let __VLS_124!: __VLS_NormalizeEmits<typeof __VLS_123.emit>;
}
{
const __VLS_125 = ({} as 'VCheckbox' extends keyof typeof __VLS_ctx ? { 'VCheckbox': typeof __VLS_ctx.VCheckbox }: 'vCheckbox' extends keyof typeof __VLS_ctx ? { 'VCheckbox': typeof __VLS_ctx.vCheckbox }: 'v-checkbox' extends keyof typeof __VLS_ctx ? { 'VCheckbox': typeof __VLS_ctx["v-checkbox"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCheckbox;
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({...{ }, label: ("上架"), modelValue: ((__VLS_ctx.sell.value.value)), errorMessages: ((__VLS_ctx.sell.errorMessage.value)), }));
({} as { VCheckbox: typeof __VLS_125 }).VCheckbox;
({} as { VCheckbox: typeof __VLS_125 }).VCheckbox;
const __VLS_127 = __VLS_126({ ...{ }, label: ("上架"), modelValue: ((__VLS_ctx.sell.value.value)), errorMessages: ((__VLS_ctx.sell.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_126));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_125, typeof __VLS_127> & Record<string, unknown>) => void)({ ...{ }, label: ("上架"), modelValue: ((__VLS_ctx.sell.value.value)), errorMessages: ((__VLS_ctx.sell.errorMessage.value)), });
const __VLS_128 = __VLS_pickFunctionalComponentCtx(__VLS_125, __VLS_127)!;
let __VLS_129!: __VLS_NormalizeEmits<typeof __VLS_128.emit>;
}
{
const __VLS_130 = ({} as 'VTextarea' extends keyof typeof __VLS_ctx ? { 'VTextarea': typeof __VLS_ctx.VTextarea }: 'vTextarea' extends keyof typeof __VLS_ctx ? { 'VTextarea': typeof __VLS_ctx.vTextarea }: 'v-textarea' extends keyof typeof __VLS_ctx ? { 'VTextarea': typeof __VLS_ctx["v-textarea"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VTextarea;
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({...{ }, label: ("說明"), modelValue: ((__VLS_ctx.description.value.value)), errorMessages: ((__VLS_ctx.description.errorMessage.value)), }));
({} as { VTextarea: typeof __VLS_130 }).VTextarea;
({} as { VTextarea: typeof __VLS_130 }).VTextarea;
const __VLS_132 = __VLS_131({ ...{ }, label: ("說明"), modelValue: ((__VLS_ctx.description.value.value)), errorMessages: ((__VLS_ctx.description.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_131));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_130, typeof __VLS_132> & Record<string, unknown>) => void)({ ...{ }, label: ("說明"), modelValue: ((__VLS_ctx.description.value.value)), errorMessages: ((__VLS_ctx.description.errorMessage.value)), });
const __VLS_133 = __VLS_pickFunctionalComponentCtx(__VLS_130, __VLS_132)!;
let __VLS_134!: __VLS_NormalizeEmits<typeof __VLS_133.emit>;
}
{
const __VLS_135 = ({} as 'VueFileAgent' extends keyof typeof __VLS_ctx ? { 'VueFileAgent': typeof __VLS_ctx.VueFileAgent }: 'vueFileAgent' extends keyof typeof __VLS_ctx ? { 'VueFileAgent': typeof __VLS_ctx.vueFileAgent }: 'vue-file-agent' extends keyof typeof __VLS_ctx ? { 'VueFileAgent': typeof __VLS_ctx["vue-file-agent"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VueFileAgent;
const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({...{ }, modelValue: ((__VLS_ctx.fileRecords)), rawModelValue: ((__VLS_ctx.rawFileRecords)), accept: ("image/jpeg,image/png"), deletable: (true), errorText: (({type: '檔案格式不支援', size: '檔案超過 1MB 大小限制'})), helpText: ("選擇檔案或將檔案拖曳到這裡"), maxFiles: ((1)), maxSize: ("1MB"), ref: ("fileAgent"), }));
({} as { VueFileAgent: typeof __VLS_135 }).VueFileAgent;
({} as { VueFileAgent: typeof __VLS_135 }).VueFileAgent;
const __VLS_137 = __VLS_136({ ...{ }, modelValue: ((__VLS_ctx.fileRecords)), rawModelValue: ((__VLS_ctx.rawFileRecords)), accept: ("image/jpeg,image/png"), deletable: (true), errorText: (({type: '檔案格式不支援', size: '檔案超過 1MB 大小限制'})), helpText: ("選擇檔案或將檔案拖曳到這裡"), maxFiles: ((1)), maxSize: ("1MB"), ref: ("fileAgent"), }, ...__VLS_functionalComponentArgsRest(__VLS_136));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_135, typeof __VLS_137> & Record<string, unknown>) => void)({ ...{ }, modelValue: ((__VLS_ctx.fileRecords)), rawModelValue: ((__VLS_ctx.rawFileRecords)), accept: ("image/jpeg,image/png"), deletable: (true), errorText: (({type: '檔案格式不支援', size: '檔案超過 1MB 大小限制'})), helpText: ("選擇檔案或將檔案拖曳到這裡"), maxFiles: ((1)), maxSize: ("1MB"), ref: ("fileAgent"), });
const __VLS_138 = __VLS_pickFunctionalComponentCtx(__VLS_135, __VLS_137)!;
let __VLS_139!: __VLS_NormalizeEmits<typeof __VLS_138.emit>;
// @ts-ignore
(__VLS_ctx.fileAgent);
}
(__VLS_108.slots!).default;
}
{
const __VLS_140 = ({} as 'VCardActions' extends keyof typeof __VLS_ctx ? { 'VCardActions': typeof __VLS_ctx.VCardActions }: 'vCardActions' extends keyof typeof __VLS_ctx ? { 'VCardActions': typeof __VLS_ctx.vCardActions }: 'v-card-actions' extends keyof typeof __VLS_ctx ? { 'VCardActions': typeof __VLS_ctx["v-card-actions"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCardActions;
const __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({...{ }, }));
({} as { VCardActions: typeof __VLS_140 }).VCardActions;
({} as { VCardActions: typeof __VLS_140 }).VCardActions;
const __VLS_142 = __VLS_141({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_141));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_140, typeof __VLS_142> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_143 = __VLS_pickFunctionalComponentCtx(__VLS_140, __VLS_142)!;
let __VLS_144!: __VLS_NormalizeEmits<typeof __VLS_143.emit>;
{
const __VLS_145 = ({} as 'VSpacer' extends keyof typeof __VLS_ctx ? { 'VSpacer': typeof __VLS_ctx.VSpacer }: 'vSpacer' extends keyof typeof __VLS_ctx ? { 'VSpacer': typeof __VLS_ctx.vSpacer }: 'v-spacer' extends keyof typeof __VLS_ctx ? { 'VSpacer': typeof __VLS_ctx["v-spacer"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VSpacer;
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({...{ }, }));
({} as { VSpacer: typeof __VLS_145 }).VSpacer;
({} as { VSpacer: typeof __VLS_145 }).VSpacer;
const __VLS_147 = __VLS_146({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_146));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_145, typeof __VLS_147> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_148 = __VLS_pickFunctionalComponentCtx(__VLS_145, __VLS_147)!;
let __VLS_149!: __VLS_NormalizeEmits<typeof __VLS_148.emit>;
}
{
const __VLS_150 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({...{ onClick: {} as any, }, color: ("red"), disabled: ((__VLS_ctx.isSubmitting)), }));
({} as { VBtn: typeof __VLS_150 }).VBtn;
({} as { VBtn: typeof __VLS_150 }).VBtn;
const __VLS_152 = __VLS_151({ ...{ onClick: {} as any, }, color: ("red"), disabled: ((__VLS_ctx.isSubmitting)), }, ...__VLS_functionalComponentArgsRest(__VLS_151));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_150, typeof __VLS_152> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, color: ("red"), disabled: ((__VLS_ctx.isSubmitting)), });
const __VLS_153 = __VLS_pickFunctionalComponentCtx(__VLS_150, __VLS_152)!;
let __VLS_154!: __VLS_NormalizeEmits<typeof __VLS_153.emit>;
let __VLS_155 = { 'click': __VLS_pickEvent(__VLS_154['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_151, typeof __VLS_152>).onClick) };
__VLS_155 = { click: (__VLS_ctx.closeDialog) };
(__VLS_153.slots!).default;
}
{
const __VLS_156 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({...{ }, color: ("green"), type: ("submit"), loading: ((__VLS_ctx.isSubmitting)), }));
({} as { VBtn: typeof __VLS_156 }).VBtn;
({} as { VBtn: typeof __VLS_156 }).VBtn;
const __VLS_158 = __VLS_157({ ...{ }, color: ("green"), type: ("submit"), loading: ((__VLS_ctx.isSubmitting)), }, ...__VLS_functionalComponentArgsRest(__VLS_157));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_156, typeof __VLS_158> & Record<string, unknown>) => void)({ ...{ }, color: ("green"), type: ("submit"), loading: ((__VLS_ctx.isSubmitting)), });
const __VLS_159 = __VLS_pickFunctionalComponentCtx(__VLS_156, __VLS_158)!;
let __VLS_160!: __VLS_NormalizeEmits<typeof __VLS_159.emit>;
(__VLS_159.slots!).default;
}
(__VLS_143.slots!).default;
}
(__VLS_98.slots!).default;
}
(__VLS_92.slots!).default;
}
(__VLS_87.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!:{
};
// @ts-ignore
[dialog,dialog,dialog,isSubmitting,isSubmitting,isSubmitting,submit,dialogId,name,name,name,name,name,name,price,price,price,price,price,price,categories,category,category,categories,category,category,categories,category,category,sell,sell,sell,sell,sell,sell,description,description,description,description,description,description,fileRecords,rawFileRecords,fileRecords,rawFileRecords,fileRecords,rawFileRecords,fileAgent,isSubmitting,isSubmitting,isSubmitting,closeDialog,isSubmitting,isSubmitting,isSubmitting,];
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
fileAgent: fileAgent as typeof fileAgent,
dialog: dialog as typeof dialog,
dialogId: dialogId as typeof dialogId,
openDialog: openDialog as typeof openDialog,
closeDialog: closeDialog as typeof closeDialog,
categories: categories as typeof categories,
isSubmitting: isSubmitting as typeof isSubmitting,
name: name as typeof name,
price: price as typeof price,
description: description as typeof description,
category: category as typeof category,
sell: sell as typeof sell,
fileRecords: fileRecords as typeof fileRecords,
rawFileRecords: rawFileRecords as typeof rawFileRecords,
submit: submit as typeof submit,
tableItemsPerPage: tableItemsPerPage as typeof tableItemsPerPage,
tableSortBy: tableSortBy as typeof tableSortBy,
tablePage: tablePage as typeof tablePage,
tableProducts: tableProducts as typeof tableProducts,
tableHeaders: tableHeaders as typeof tableHeaders,
tableLoading: tableLoading as typeof tableLoading,
tableItemsLength: tableItemsLength as typeof tableItemsLength,
tableSearch: tableSearch as typeof tableSearch,
tableLoadItems: tableLoadItems as typeof tableLoadItems,
tableApplySearch: tableApplySearch as typeof tableApplySearch,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});
