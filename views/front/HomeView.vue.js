/* __placeholder__ */

import { ref, onMounted, nextTick } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'
import gsap from 'gsap'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { api } = useApi()
const createSnackbar = useSnackbar()

const products = ref([])

// 發請求
onMounted(async () => {
  try {
    // 抓資料
    const { data } = await api.get('/products', {
      params: {
        itemsPerPage: -1
      }
    })
    // 把資料丟進陣列內
    products.value.push(...data.result.data)
    await nextTick()
    gsap
      .to('.product-card', { opacity: 1, duration: 0.5 })
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

const __VLS_componentsOption = {};

let __VLS_name!: 'HomeView';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {
};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {}
 & { 'product-card'?: boolean };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {}
& __VLS_WithComponent<'VContainer', typeof __VLS_localComponents, "VContainer", "vContainer", "v-container">
& __VLS_WithComponent<'VRow', typeof __VLS_localComponents, "VRow", "vRow", "v-row">
& __VLS_WithComponent<'VCol', typeof __VLS_localComponents, "VCol", "vCol", "v-col">
& __VLS_WithComponent<'VDivider', typeof __VLS_localComponents, "VDivider", "vDivider", "v-divider">
& __VLS_WithComponent<'ProductCard', typeof __VLS_localComponents, "ProductCard", "productCard", "product-card">
;
__VLS_components.VContainer;__VLS_components.VContainer;__VLS_components.vContainer;__VLS_components.vContainer;__VLS_components["v-container"];__VLS_components["v-container"];
// @ts-ignore
[VContainer,VContainer,];
__VLS_components.VRow;__VLS_components.VRow;__VLS_components.vRow;__VLS_components.vRow;__VLS_components["v-row"];__VLS_components["v-row"];
// @ts-ignore
[VRow,VRow,];
__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.VCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components.vCol;__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];__VLS_components["v-col"];
// @ts-ignore
[VCol,VCol,VCol,VCol,];
__VLS_intrinsicElements.h1;__VLS_intrinsicElements.h1;
__VLS_components.VDivider;__VLS_components.VDivider;__VLS_components.vDivider;__VLS_components.vDivider;__VLS_components["v-divider"];__VLS_components["v-divider"];
// @ts-ignore
[VDivider,VDivider,];
__VLS_components.ProductCard;__VLS_components.ProductCard;__VLS_components.productCard;__VLS_components.productCard;__VLS_components["product-card"];__VLS_components["product-card"];
// @ts-ignore
[ProductCard,ProductCard,];
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
}
for (const [product] of __VLS_getVForSourceType((__VLS_ctx.products)!)) {
{
const __VLS_25 = ({} as 'VCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.VCol }: 'vCol' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx.vCol }: 'v-col' extends keyof typeof __VLS_ctx ? { 'VCol': typeof __VLS_ctx["v-col"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCol;
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({...{ }, cols: ("12"), md: ("6"), lg: ("3"), key: ((product._id)), }));
({} as { VCol: typeof __VLS_25 }).VCol;
({} as { VCol: typeof __VLS_25 }).VCol;
const __VLS_27 = __VLS_26({ ...{ }, cols: ("12"), md: ("6"), lg: ("3"), key: ((product._id)), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{ }, cols: ("12"), md: ("6"), lg: ("3"), key: ((product._id)), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
{
const __VLS_30 = ({} as 'ProductCard' extends keyof typeof __VLS_ctx ? { 'ProductCard': typeof __VLS_ctx.ProductCard }: 'productCard' extends keyof typeof __VLS_ctx ? { 'ProductCard': typeof __VLS_ctx.productCard }: 'product-card' extends keyof typeof __VLS_ctx ? { 'ProductCard': typeof __VLS_ctx["product-card"] }: typeof __VLS_resolvedLocalAndGlobalComponents).ProductCard;
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({...{ }, ...(product), }));
({} as { ProductCard: typeof __VLS_30 }).ProductCard;
({} as { ProductCard: typeof __VLS_30 }).ProductCard;
const __VLS_32 = __VLS_31({ ...{ }, ...(product), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{ }, ...(product), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
}
(__VLS_28.slots!).default;
}
// @ts-ignore
[products,];
}
(__VLS_8.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!:{
};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
ProductCard: ProductCard as typeof ProductCard,
products: products as typeof products,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});
