/* __placeholder__ */

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/store/user'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute()
const router = useRouter()
const { api, apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()

const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: ''
})

const schema = yup.object({
  quantity: yup.number().typeError('缺少數量').required('缺少數量').min(1, '數量最小為 1')
})
const { isSubmitting, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    quantity: 1
  }
})
const quantity = useField('quantity')

const submit = handleSubmit(async (values) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: product.value._id,
      quantity: values.quantity
    })
    user.cart = data.result
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

onMounted(async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product.value._id = data.result._id
    product.value.name = data.result.name
    product.value.price = data.result.price
    product.value.description = data.result.description
    product.value.image = data.result.image
    product.value.sell = data.result.sell
    product.value.category = data.result.category

    document.title = `購物網 | ${product.value.name}`
  } catch (error) {
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
    router.push('/')
  }
})

const __VLS_componentsOption = {};

let __VLS_name!: 'ProductView';
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
& __VLS_WithComponent<'VImg', typeof __VLS_localComponents, "VImg", "vImg", "v-img">
& __VLS_WithComponent<'VForm', typeof __VLS_localComponents, "VForm", "vForm", "v-form">
& __VLS_WithComponent<'VTextField', typeof __VLS_localComponents, "VTextField", "vTextField", "v-text-field">
& __VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "vBtn", "v-btn">
& __VLS_WithComponent<'VOverlay', typeof __VLS_localComponents, "VOverlay", "vOverlay", "v-overlay">
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
__VLS_intrinsicElements.h1;__VLS_intrinsicElements.h1;__VLS_intrinsicElements.h1;__VLS_intrinsicElements.h1;
__VLS_components.VImg;__VLS_components.VImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components["v-img"];__VLS_components["v-img"];
// @ts-ignore
[VImg,VImg,];
__VLS_intrinsicElements.p;__VLS_intrinsicElements.p;__VLS_intrinsicElements.p;__VLS_intrinsicElements.p;
__VLS_components.VForm;__VLS_components.VForm;__VLS_components.vForm;__VLS_components.vForm;__VLS_components["v-form"];__VLS_components["v-form"];
// @ts-ignore
[VForm,VForm,];
__VLS_components.VTextField;__VLS_components.VTextField;__VLS_components.vTextField;__VLS_components.vTextField;__VLS_components["v-text-field"];__VLS_components["v-text-field"];
// @ts-ignore
[VTextField,VTextField,];
__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];
// @ts-ignore
[VBtn,VBtn,VBtn,VBtn,];
__VLS_components.VOverlay;__VLS_components.VOverlay;__VLS_components.vOverlay;__VLS_components.vOverlay;__VLS_components["v-overlay"];__VLS_components["v-overlay"];
// @ts-ignore
[VOverlay,VOverlay,];
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
const __VLS_17 = __VLS_16({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
( __VLS_ctx.product.name );
(__VLS_18.slots!).default;
}
(__VLS_13.slots!).default;
}
{
const __VLS_20 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({...{ }, cols: ("12"), md: ("6"), }));
({} as { VCol: typeof __VLS_20 }).VCol;
({} as { VCol: typeof __VLS_20 }).VCol;
const __VLS_22 = __VLS_21({ ...{ }, cols: ("12"), md: ("6"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), md: ("6"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
{
const __VLS_25 = ({} as 'VImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.VImg }: 'vImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.vImg }: 'v-img' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx["v-img"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VImg;
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({...{ }, src: ((__VLS_ctx.product.image)), }));
({} as { VImg: typeof __VLS_25 }).VImg;
({} as { VImg: typeof __VLS_25 }).VImg;
const __VLS_27 = __VLS_26({ ...{ }, src: ((__VLS_ctx.product.image)), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{ }, src: ((__VLS_ctx.product.image)), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
}
(__VLS_23.slots!).default;
}
{
const __VLS_30 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({...{ }, cols: ("12"), md: ("6"), }));
({} as { VCol: typeof __VLS_30 }).VCol;
({} as { VCol: typeof __VLS_30 }).VCol;
const __VLS_32 = __VLS_31({ ...{ }, cols: ("12"), md: ("6"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), md: ("6"), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
{
const __VLS_35 = __VLS_intrinsicElements["p"];
const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
const __VLS_37 = __VLS_36({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
( __VLS_ctx.product.price );
(__VLS_38.slots!).default;
}
{
const __VLS_40 = __VLS_intrinsicElements["p"];
const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
const __VLS_42 = __VLS_41({ ...{ }, style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_40, typeof __VLS_42> & Record<string, unknown>) => void)({ ...{ }, style: ({}), });
const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42)!;
let __VLS_44!: __VLS_NormalizeEmits<typeof __VLS_43.emit>;
( __VLS_ctx.product.description );
(__VLS_43.slots!).default;
}
{
const __VLS_45 = ({} as 'VForm' extends keyof typeof __VLS_ctx ? { 'VForm': typeof __VLS_ctx.VForm }: 'vForm' extends keyof typeof __VLS_ctx ? { 'VForm': typeof __VLS_ctx.vForm }: 'v-form' extends keyof typeof __VLS_ctx ? { 'VForm': typeof __VLS_ctx["v-form"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VForm;
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), }));
({} as { VForm: typeof __VLS_45 }).VForm;
({} as { VForm: typeof __VLS_45 }).VForm;
const __VLS_47 = __VLS_46({ ...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_45, typeof __VLS_47> & Record<string, unknown>) => void)({ ...{ onSubmit: {} as any, }, disabled: ((__VLS_ctx.isSubmitting)), });
const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47)!;
let __VLS_49!: __VLS_NormalizeEmits<typeof __VLS_48.emit>;
let __VLS_50 = { 'submit': __VLS_pickEvent(__VLS_49['submit'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_46, typeof __VLS_47>).onSubmit) };
__VLS_50 = { submit: (__VLS_ctx.submit) };
{
const __VLS_51 = ({} as 'VTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.VTextField }: 'vTextField' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx.vTextField }: 'v-text-field' extends keyof typeof __VLS_ctx ? { 'VTextField': typeof __VLS_ctx["v-text-field"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VTextField;
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({...{ }, type: ("number"), min: ("0"), modelValue: ((__VLS_ctx.quantity.value.value)), errorMessages: ((__VLS_ctx.quantity.errorMessage.value)), }));
({} as { VTextField: typeof __VLS_51 }).VTextField;
({} as { VTextField: typeof __VLS_51 }).VTextField;
const __VLS_53 = __VLS_52({ ...{ }, type: ("number"), min: ("0"), modelValue: ((__VLS_ctx.quantity.value.value)), errorMessages: ((__VLS_ctx.quantity.errorMessage.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_51, typeof __VLS_53> & Record<string, unknown>) => void)({ ...{ }, type: ("number"), min: ("0"), modelValue: ((__VLS_ctx.quantity.value.value)), errorMessages: ((__VLS_ctx.quantity.errorMessage.value)), });
const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53)!;
let __VLS_55!: __VLS_NormalizeEmits<typeof __VLS_54.emit>;
}
{
const __VLS_56 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({...{ }, type: ("submit"), prependIcon: ("mdi-cart"), loading: ((__VLS_ctx.isSubmitting)), }));
({} as { VBtn: typeof __VLS_56 }).VBtn;
({} as { VBtn: typeof __VLS_56 }).VBtn;
const __VLS_58 = __VLS_57({ ...{ }, type: ("submit"), prependIcon: ("mdi-cart"), loading: ((__VLS_ctx.isSubmitting)), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_56, typeof __VLS_58> & Record<string, unknown>) => void)({ ...{ }, type: ("submit"), prependIcon: ("mdi-cart"), loading: ((__VLS_ctx.isSubmitting)), });
const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58)!;
let __VLS_60!: __VLS_NormalizeEmits<typeof __VLS_59.emit>;
(__VLS_59.slots!).default;
}
(__VLS_48.slots!).default;
}
(__VLS_33.slots!).default;
}
(__VLS_8.slots!).default;
}
(__VLS_3.slots!).default;
}
{
const __VLS_61 = ({} as 'VOverlay' extends keyof typeof __VLS_ctx ? { 'VOverlay': typeof __VLS_ctx.VOverlay }: 'vOverlay' extends keyof typeof __VLS_ctx ? { 'VOverlay': typeof __VLS_ctx.vOverlay }: 'v-overlay' extends keyof typeof __VLS_ctx ? { 'VOverlay': typeof __VLS_ctx["v-overlay"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VOverlay;
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({...{ }, class: ("align-center justify-center text-center"), modelValue: ((!__VLS_ctx.product.sell)), persistent: (true), }));
({} as { VOverlay: typeof __VLS_61 }).VOverlay;
({} as { VOverlay: typeof __VLS_61 }).VOverlay;
const __VLS_63 = __VLS_62({ ...{ }, class: ("align-center justify-center text-center"), modelValue: ((!__VLS_ctx.product.sell)), persistent: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_61, typeof __VLS_63> & Record<string, unknown>) => void)({ ...{ }, class: ("align-center justify-center text-center"), modelValue: ((!__VLS_ctx.product.sell)), persistent: (true), });
const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63)!;
let __VLS_65!: __VLS_NormalizeEmits<typeof __VLS_64.emit>;
{
const __VLS_66 = __VLS_intrinsicElements["h1"];
const __VLS_67 = __VLS_elementAsFunctionalComponent(__VLS_66);
const __VLS_68 = __VLS_67({ ...{ }, class: ("text-red text-h1"), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_66, typeof __VLS_68> & Record<string, unknown>) => void)({ ...{ }, class: ("text-red text-h1"), });
const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68)!;
let __VLS_70!: __VLS_NormalizeEmits<typeof __VLS_69.emit>;
(__VLS_69.slots!).default;
}
{
const __VLS_71 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({...{ }, to: ("/"), color: ("green"), }));
({} as { VBtn: typeof __VLS_71 }).VBtn;
({} as { VBtn: typeof __VLS_71 }).VBtn;
const __VLS_73 = __VLS_72({ ...{ }, to: ("/"), color: ("green"), }, ...__VLS_functionalComponentArgsRest(__VLS_72));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_71, typeof __VLS_73> & Record<string, unknown>) => void)({ ...{ }, to: ("/"), color: ("green"), });
const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_71, __VLS_73)!;
let __VLS_75!: __VLS_NormalizeEmits<typeof __VLS_74.emit>;
(__VLS_74.slots!).default;
}
(__VLS_64.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!:{
};
// @ts-ignore
[product,product,product,product,product,product,isSubmitting,isSubmitting,isSubmitting,submit,quantity,quantity,quantity,quantity,quantity,quantity,isSubmitting,isSubmitting,isSubmitting,product,product,product,];
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
product: product as typeof product,
isSubmitting: isSubmitting as typeof isSubmitting,
quantity: quantity as typeof quantity,
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
