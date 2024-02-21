/* __placeholder__ */

import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// 有 r 是跳頁，沒有 r 代表取路由的資訊
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'

import { useApi } from '@/composables/axios'
// 儲存資料
import { useUserStore } from '@/store/user'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { api } = useApi()

// 路由
const router = useRouter()
// 彈出提示
const createSnackbar = useSnackbar()

// 儲存資料
const user = useUserStore()

// 定義註冊表單的資料格式
const schema = yup.object({
  // 帳號欄位
  account: yup
  // 文字
    .string()
  // 必填
    .required('帳號為必填欄位')
    .min(4, '使用者帳號長度不符')
    .max(20, '使用者帳號長度不符'),

  // 密碼欄位
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符')
})

// { 送出表單後呼叫語法去執行 , 是否正在送出表單(以免重複送出請求) }
const { handleSubmit, isSubmitting } = useForm({
  // 使用上面定義的 schema 來設定表單
  validationSchema: schema
})

// 註冊每個表單的欄位， useField('此處的內容要和 schema 的欄位名稱對應')
const account = useField('account')
const password = useField('password')

// submit 叫 useForm 裡的 handleSubmit 去做事
// values 代表表單裡所有欄位的值
const submit = handleSubmit(async (values) => {
  try {
    // 資料 = post('檔案位置', 要送出的資料)
    const { data } = await api.post('/users/login', {
      account: values.account,
      password: values.password
    })
    // 登入成功後儲存使用者資料
    user.login(data.result)
    // 彈出的資訊: 註冊成功， 2 秒後消失， 背景為綠色， 位置在底下
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    // 完成後把使用者換到登入頁
    router.push('/')
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

const __VLS_componentsOption = {};

let __VLS_name!: 'LoginView';
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
& __VLS_WithComponent<'VRow', typeof __VLS_localComponents, "VRow", "VRow", "VRow">
& __VLS_WithComponent<'VCol', typeof __VLS_localComponents, "VCol", "VCol", "VCol">
& __VLS_WithComponent<'VCard', typeof __VLS_localComponents, "VCard", "vCard", "v-card">
& __VLS_WithComponent<'VForm', typeof __VLS_localComponents, "VForm", "VForm", "VForm">
& __VLS_WithComponent<'VTextField', typeof __VLS_localComponents, "VTextField", "VTextField", "VTextField">
& __VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "VBtn", "VBtn">
;
__VLS_components.VRow;__VLS_components.VRow;
// @ts-ignore
[VRow,VRow,];
__VLS_components.VCol;__VLS_components.VCol;
// @ts-ignore
[VCol,VCol,];
__VLS_components.VCard;__VLS_components.VCard;__VLS_components.vCard;__VLS_components.vCard;__VLS_components["v-card"];__VLS_components["v-card"];
// @ts-ignore
[VCard,VCard,];
__VLS_components.VForm;__VLS_components.VForm;
// @ts-ignore
[VForm,VForm,];
__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.VTextField;
// @ts-ignore
[VTextField,VTextField,VTextField,VTextField,];
__VLS_components.VBtn;__VLS_components.VBtn;
// @ts-ignore
[VBtn,VBtn,];
{
const __VLS_0 = ({} as 'VRow' extends keyof typeof __VLS_ctx ? { 'VRow': typeof __VLS_ctx.VRow }: typeof __VLS_resolvedLocalAndGlobalComponents).VRow;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({...{ }, id: ("login-home"), class: ("bg-c1 align-center justify-center"), }));
({} as { VRow: typeof __VLS_0 }).VRow;
({} as { VRow: typeof __VLS_0 }).VRow;
const __VLS_2 = __VLS_1({ ...{ }, id: ("login-home"), class: ("bg-c1 align-center justify-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ }, id: ("login-home"), class: ("bg-c1 align-center justify-center"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, cols: ("12"), }));
({} as { VCol: typeof __VLS_5 }).VCol;
({} as { VCol: typeof __VLS_5 }).VCol;
const __VLS_7 = __VLS_6({ ...{ }, cols: ("12"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = ({} as 'VCard' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx.VCard }: 'vCard' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx.vCard }: 'v-card' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx["v-card"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCard;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({...{ }, id: ("card"), class: ("pa-3 ma-auto"), width: ("450"), title: ("Login"), }));
({} as { VCard: typeof __VLS_10 }).VCard;
({} as { VCard: typeof __VLS_10 }).VCard;
const __VLS_12 = __VLS_11({ ...{ }, id: ("card"), class: ("pa-3 ma-auto"), width: ("450"), title: ("Login"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, id: ("card"), class: ("pa-3 ma-auto"), width: ("450"), title: ("Login"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = ({} as 'VForm' extends keyof typeof __VLS_ctx ? { 'VForm': typeof __VLS_ctx.VForm }: typeof __VLS_resolvedLocalAndGlobalComponents).VForm;
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), }));
({} as { VForm: typeof __VLS_15 }).VForm;
({} as { VForm: typeof __VLS_15 }).VForm;
const __VLS_17 = __VLS_16({ ...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
let __VLS_20 = { 'submit': __VLS_pickEvent(__VLS_19['submit'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_16, typeof __VLS_17>).onSubmit) };
__VLS_20 = { submit: (__VLS_ctx.submit) };
{
const __VLS_21 = ({} as 'VTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.VTextField }: typeof __VLS_resolvedLocalAndGlobalComponents).VTextField;
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({...{ }, label: ("帳號"), minlength: ("4"), maxlength: ("20"), counter: (true), modelValue: ((__VLS_ctx.account.value.value)), errorMessages: ((__VLS_ctx.account.errorMessage.value)), }));
({} as { VTextField: typeof __VLS_21 }).VTextField;
({} as { VTextField: typeof __VLS_21 }).VTextField;
const __VLS_23 = __VLS_22({ ...{ }, label: ("帳號"), minlength: ("4"), maxlength: ("20"), counter: (true), modelValue: ((__VLS_ctx.account.value.value)), errorMessages: ((__VLS_ctx.account.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_22));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_21, typeof __VLS_23> & Record<string, unknown>) => void)({ ...{ }, label: ("帳號"), minlength: ("4"), maxlength: ("20"), counter: (true), modelValue: ((__VLS_ctx.account.value.value)), errorMessages: ((__VLS_ctx.account.errorMessage.value)), });
const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23)!;
let __VLS_25!: __VLS_NormalizeEmits<typeof __VLS_24.emit>;
}
{
const __VLS_26 = ({} as 'VTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.VTextField }: typeof __VLS_resolvedLocalAndGlobalComponents).VTextField;
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({...{ }, label: ("密碼"), minlength: ("4"), maxlength: ("20"), counter: (true), type: ("password"), modelValue: ((__VLS_ctx.password.value.value)), errorMessages: ((__VLS_ctx.password.errorMessage.value)), }));
({} as { VTextField: typeof __VLS_26 }).VTextField;
({} as { VTextField: typeof __VLS_26 }).VTextField;
const __VLS_28 = __VLS_27({ ...{ }, label: ("密碼"), minlength: ("4"), maxlength: ("20"), counter: (true), type: ("password"), modelValue: ((__VLS_ctx.password.value.value)), errorMessages: ((__VLS_ctx.password.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_26, typeof __VLS_28> & Record<string, unknown>) => void)({ ...{ }, label: ("密碼"), minlength: ("4"), maxlength: ("20"), counter: (true), type: ("password"), modelValue: ((__VLS_ctx.password.value.value)), errorMessages: ((__VLS_ctx.password.errorMessage.value)), });
const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28)!;
let __VLS_30!: __VLS_NormalizeEmits<typeof __VLS_29.emit>;
}
{
const __VLS_31 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({...{ }, type: ("submit"), color: ("green"), }));
({} as { VBtn: typeof __VLS_31 }).VBtn;
({} as { VBtn: typeof __VLS_31 }).VBtn;
const __VLS_33 = __VLS_32({ ...{ }, type: ("submit"), color: ("green"), }, ...__VLS_functionalComponentArgsRest(__VLS_32));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_31, typeof __VLS_33> & Record<string, unknown>) => void)({ ...{ }, type: ("submit"), color: ("green"), });
const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33)!;
let __VLS_35!: __VLS_NormalizeEmits<typeof __VLS_34.emit>;
(__VLS_34.slots!).default;
}
(__VLS_18.slots!).default;
}
(__VLS_13.slots!).default;
}
(__VLS_8.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["bg-c1"];
__VLS_styleScopedClasses["align-center"];
__VLS_styleScopedClasses["justify-center"];
__VLS_styleScopedClasses["pa-3"];
__VLS_styleScopedClasses["ma-auto"];
}
var __VLS_slots!:{
};
// @ts-ignore
[isSubmitting,isSubmitting,isSubmitting,submit,account,account,account,account,account,account,password,password,password,password,password,password,];
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
isSubmitting: isSubmitting as typeof isSubmitting,
account: account as typeof account,
password: password as typeof password,
submit: submit as typeof submit,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});
