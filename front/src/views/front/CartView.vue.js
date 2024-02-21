/* __placeholder__ */

import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

const cart = ref([])
const headers = [
  { title: '商品名稱', key: 'product.name' },
  { title: '單價', key: 'product.price' },
  { title: '數量', key: 'quantity' },
  { title: '總價', key: 'total', value: item => item.product.price * item.quantity },
  { title: '操作', key: 'action' }
]

const total = computed(() => {
  return cart.value.reduce((total, current) => {
    return total + current.quantity * current.product.price
  }, 0)
})

const canCheckout = computed(() => {
  return cart.value.length > 0 && !cart.value.some(item => !item.product.sell)
})

const addCart = async (product, quantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product,
      quantity
    })
    user.cart = data.result
    createSnackbar({
      text: '修改成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    const idx = cart.value.findIndex(item => item.product._id === product)
    cart.value[idx].quantity += quantity
    if (cart.value[idx].quantity <= 0) {
      cart.value.splice(idx, 1)
    }
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
}

const isSubmitting = ref(false)
const checkout = async () => {
  isSubmitting.value = true
  try {
    await apiAuth.post('/orders')
    user.cart = 0
    router.push('/orders')
    createSnackbar({
      text: '結帳成功',
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
  isSubmitting.value = false
}

onMounted(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value.push(...data.result)
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

const __VLS_componentsOption = {};

let __VLS_name!: 'CartView';
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
& __VLS_WithComponent<'VCol', typeof __VLS_localComponents, "VCol", "vCol", "v-col">
& __VLS_WithComponent<'VDivider', typeof __VLS_localComponents, "VDivider", "vDivider", "v-divider">
& __VLS_WithComponent<'VDataTable', typeof __VLS_localComponents, "VDataTable", "vDataTable", "v-data-table">
& __VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "vBtn", "v-btn">
;
__VLS_components.VContainer;__VLS_components.VContainer;__VLS_components.vContainer;__VLS_components.vContainer;__VLS_components["v-container"];__VLS_components["v-container"];
// @ts-ignore
[VContainer,VContainer,];
__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];
// @ts-ignore
[VCol,VCol,VCol,VCol,VCol,VCol,];
__VLS_intrinsicElements.h1;__VLS_intrinsicElements.h1;
__VLS_components.VDivider;__VLS_components.VDivider;__VLS_components.vDivider;__VLS_components.vDivider;__VLS_components["v-divider"];__VLS_components["v-divider"];
// @ts-ignore
[VDivider,VDivider,];
__VLS_components.VDataTable;__VLS_components.VDataTable;__VLS_components.vDataTable;__VLS_components.vDataTable;__VLS_components["v-data-table"];__VLS_components["v-data-table"];
// @ts-ignore
[VDataTable,VDataTable,];
__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;
__VLS_intrinsicElements.span;__VLS_intrinsicElements.span;__VLS_intrinsicElements.span;__VLS_intrinsicElements.span;
__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];__VLS_components["v-btn"];
// @ts-ignore
[VBtn,VBtn,VBtn,VBtn,VBtn,VBtn,VBtn,VBtn,];
__VLS_intrinsicElements.p;__VLS_intrinsicElements.p;
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
const __VLS_5 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, cols: ("12"), }));
({} as { VCol: typeof __VLS_5 }).VCol;
({} as { VCol: typeof __VLS_5 }).VCol;
const __VLS_7 = __VLS_6({ ...{ }, cols: ("12"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = __VLS_intrinsicElements["h1"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
(__VLS_13.slots!).default;
}
(__VLS_8.slots!).default;
}
{
const __VLS_15 = ({} as 'VDivider' extends keyof typeof __VLS_ctx ? { 'VDivider': typeof __VLS_ctx.VDivider }: 'vDivider' extends keyof typeof __VLS_ctx ? { 'VDivider': typeof __VLS_ctx.vDivider }: 'v-divider' extends keyof typeof __VLS_ctx ? { 'VDivider': typeof __VLS_ctx["v-divider"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VDivider;
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({...{ }, }));
({} as { VDivider: typeof __VLS_15 }).VDivider;
({} as { VDivider: typeof __VLS_15 }).VDivider;
const __VLS_17 = __VLS_16({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
}
{
const __VLS_20 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({...{ }, cols: ("12"), }));
({} as { VCol: typeof __VLS_20 }).VCol;
({} as { VCol: typeof __VLS_20 }).VCol;
const __VLS_22 = __VLS_21({ ...{ }, cols: ("12"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
{
const __VLS_25 = ({} as 'VDataTable' extends keyof typeof __VLS_ctx ? { 'VDataTable': typeof __VLS_ctx.VDataTable }: 'vDataTable' extends keyof typeof __VLS_ctx ? { 'VDataTable': typeof __VLS_ctx.vDataTable }: 'v-data-table' extends keyof typeof __VLS_ctx ? { 'VDataTable': typeof __VLS_ctx["v-data-table"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VDataTable;
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({...{ }, items: ((__VLS_ctx.cart)), headers: ((__VLS_ctx.headers)), }));
({} as { VDataTable: typeof __VLS_25 }).VDataTable;
({} as { VDataTable: typeof __VLS_25 }).VDataTable;
const __VLS_27 = __VLS_26({ ...{ }, items: ((__VLS_ctx.cart)), headers: ((__VLS_ctx.headers)), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{ }, items: ((__VLS_ctx.cart)), headers: ((__VLS_ctx.headers)), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
{
const __VLS_30 = __VLS_intrinsicElements["template"];
const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
const __VLS_32 = __VLS_31({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{ }, });
if (__VLS_ctx.item.product.sell) {
{
const __VLS_33 = __VLS_intrinsicElements["span"];
const __VLS_34 = __VLS_elementAsFunctionalComponent(__VLS_33);
const __VLS_35 = __VLS_34({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_34));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_33, typeof __VLS_35> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_36 = __VLS_pickFunctionalComponentCtx(__VLS_33, __VLS_35)!;
let __VLS_37!: __VLS_NormalizeEmits<typeof __VLS_36.emit>;
( __VLS_ctx.item.product.name );
(__VLS_36.slots!).default;
}
// @ts-ignore
[cart,headers,cart,headers,cart,headers,item,item,];
}
else {
{
const __VLS_38 = __VLS_intrinsicElements["span"];
const __VLS_39 = __VLS_elementAsFunctionalComponent(__VLS_38);
const __VLS_40 = __VLS_39({ ...{ }, class: ("text-red text-decoration-line-through"), }, ...__VLS_functionalComponentArgsRest(__VLS_39));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_38, typeof __VLS_40> & Record<string, unknown>) => void)({ ...{ }, class: ("text-red text-decoration-line-through"), });
const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40)!;
let __VLS_42!: __VLS_NormalizeEmits<typeof __VLS_41.emit>;
( __VLS_ctx.item.product.name );
(__VLS_41.slots!).default;
}
// @ts-ignore
[item,];
}
(__VLS_28.slots!).default;
}
{
const __VLS_43 = __VLS_intrinsicElements["template"];
const __VLS_44 = __VLS_elementAsFunctionalComponent(__VLS_43);
const __VLS_45 = __VLS_44({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_44));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_43, typeof __VLS_45> & Record<string, unknown>) => void)({ ...{ }, });
{
const [{ item }] = __VLS_getSlotParams((__VLS_28.slots!)[`item.quantity`]);
{
const __VLS_46 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-minus"), color: ("red"), }));
({} as { VBtn: typeof __VLS_46 }).VBtn;
({} as { VBtn: typeof __VLS_46 }).VBtn;
const __VLS_48 = __VLS_47({ ...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-minus"), color: ("red"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_46, typeof __VLS_48> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-minus"), color: ("red"), });
const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48)!;
let __VLS_50!: __VLS_NormalizeEmits<typeof __VLS_49.emit>;
let __VLS_51 = { 'click': __VLS_pickEvent(__VLS_50['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_47, typeof __VLS_48>).onClick) };
__VLS_51 = { click: $event => {
__VLS_ctx.addCart(item.product._id, -1);
// @ts-ignore
[addCart,];
}
 };
( item.quantity );
(__VLS_49.slots!).default;
}
{
const __VLS_52 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-plus"), color: ("green"), }));
({} as { VBtn: typeof __VLS_52 }).VBtn;
({} as { VBtn: typeof __VLS_52 }).VBtn;
const __VLS_54 = __VLS_53({ ...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-plus"), color: ("green"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_52, typeof __VLS_54> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-plus"), color: ("green"), });
const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54)!;
let __VLS_56!: __VLS_NormalizeEmits<typeof __VLS_55.emit>;
let __VLS_57 = { 'click': __VLS_pickEvent(__VLS_56['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_53, typeof __VLS_54>).onClick) };
__VLS_57 = { click: $event => {
__VLS_ctx.addCart(item.product._id, 1);
// @ts-ignore
[addCart,];
}
 };
}
}
}
{
const __VLS_58 = __VLS_intrinsicElements["template"];
const __VLS_59 = __VLS_elementAsFunctionalComponent(__VLS_58);
const __VLS_60 = __VLS_59({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_59));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_58, typeof __VLS_60> & Record<string, unknown>) => void)({ ...{ }, });
{
const [{ item }] = __VLS_getSlotParams((__VLS_28.slots!)[`item.action`]);
{
const __VLS_61 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-delete"), color: ("red"), }));
({} as { VBtn: typeof __VLS_61 }).VBtn;
({} as { VBtn: typeof __VLS_61 }).VBtn;
const __VLS_63 = __VLS_62({ ...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-delete"), color: ("red"), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_61, typeof __VLS_63> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, variant: ("text"), icon: ("mdi-delete"), color: ("red"), });
const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63)!;
let __VLS_65!: __VLS_NormalizeEmits<typeof __VLS_64.emit>;
let __VLS_66 = { 'click': __VLS_pickEvent(__VLS_65['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_62, typeof __VLS_63>).onClick) };
__VLS_66 = { click: $event => {
__VLS_ctx.addCart(item.product._id, item.quantity * -1);
// @ts-ignore
[addCart,];
}
 };
}
}
}
}
(__VLS_23.slots!).default;
}
{
const __VLS_67 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({...{ }, cols: ("12"), class: ("text-center"), }));
({} as { VCol: typeof __VLS_67 }).VCol;
({} as { VCol: typeof __VLS_67 }).VCol;
const __VLS_69 = __VLS_68({ ...{ }, cols: ("12"), class: ("text-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_68));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_67, typeof __VLS_69> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), class: ("text-center"), });
const __VLS_70 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69)!;
let __VLS_71!: __VLS_NormalizeEmits<typeof __VLS_70.emit>;
{
const __VLS_72 = __VLS_intrinsicElements["p"];
const __VLS_73 = __VLS_elementAsFunctionalComponent(__VLS_72);
const __VLS_74 = __VLS_73({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_73));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_72, typeof __VLS_74> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74)!;
let __VLS_76!: __VLS_NormalizeEmits<typeof __VLS_75.emit>;
( __VLS_ctx.total );
(__VLS_75.slots!).default;
}
{
const __VLS_77 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({...{ onClick: {} as any, }, color: ("green"), disabled: ((!__VLS_ctx.canCheckout)), loading: ((__VLS_ctx.isSubmitting)), }));
({} as { VBtn: typeof __VLS_77 }).VBtn;
({} as { VBtn: typeof __VLS_77 }).VBtn;
const __VLS_79 = __VLS_78({ ...{ onClick: {} as any, }, color: ("green"), disabled: ((!__VLS_ctx.canCheckout)), loading: ((__VLS_ctx.isSubmitting)), }, ...__VLS_functionalComponentArgsRest(__VLS_78));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_77, typeof __VLS_79> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, color: ("green"), disabled: ((!__VLS_ctx.canCheckout)), loading: ((__VLS_ctx.isSubmitting)), });
const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_77, __VLS_79)!;
let __VLS_81!: __VLS_NormalizeEmits<typeof __VLS_80.emit>;
let __VLS_82 = { 'click': __VLS_pickEvent(__VLS_81['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_78, typeof __VLS_79>).onClick) };
__VLS_82 = { click: (__VLS_ctx.checkout) };
(__VLS_80.slots!).default;
}
(__VLS_70.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!:{
};
// @ts-ignore
[total,canCheckout,isSubmitting,canCheckout,isSubmitting,canCheckout,isSubmitting,checkout,];
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
cart: cart as typeof cart,
headers: headers as typeof headers,
total: total as typeof total,
canCheckout: canCheckout as typeof canCheckout,
addCart: addCart as typeof addCart,
isSubmitting: isSubmitting as typeof isSubmitting,
checkout: checkout as typeof checkout,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});
