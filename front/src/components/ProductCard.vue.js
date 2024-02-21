/* __placeholder__ */

import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

// 定義卡片當中的項目
const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell'])

// 加入購物車
const addCart = async () => {
  // 如果沒有登入，則帶到登入頁面
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: props._id,
      quantity: 1
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
}

const __VLS_componentsOption = {};

let __VLS_name!: 'ProductCard';
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
& __VLS_WithComponent<'VCard', typeof __VLS_localComponents, "VCard", "vCard", "v-card">
& __VLS_WithComponent<'VImg', typeof __VLS_localComponents, "VImg", "vImg", "v-img">
& __VLS_WithComponent<'VCardTitle', typeof __VLS_localComponents, "VCardTitle", "vCardTitle", "v-card-title">
& __VLS_WithComponent<'RouterLink', typeof __VLS_localComponents, "RouterLink", "routerLink", "router-link">
& __VLS_WithComponent<'VCardSubtitle', typeof __VLS_localComponents, "VCardSubtitle", "vCardSubtitle", "v-card-subtitle">
& __VLS_WithComponent<'VCardText', typeof __VLS_localComponents, "VCardText", "vCardText", "v-card-text">
& __VLS_WithComponent<'VCardActions', typeof __VLS_localComponents, "VCardActions", "vCardActions", "v-card-actions">
& __VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "vBtn", "v-btn">
;
__VLS_components.VCard;__VLS_components.VCard;__VLS_components.vCard;__VLS_components.vCard;__VLS_components["v-card"];__VLS_components["v-card"];
// @ts-ignore
[VCard,VCard,];
__VLS_components.VImg;__VLS_components.VImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components["v-img"];__VLS_components["v-img"];
// @ts-ignore
[VImg,VImg,];
__VLS_components.VCardTitle;__VLS_components.VCardTitle;__VLS_components.vCardTitle;__VLS_components.vCardTitle;__VLS_components["v-card-title"];__VLS_components["v-card-title"];
// @ts-ignore
[VCardTitle,VCardTitle,];
__VLS_components.RouterLink;__VLS_components.RouterLink;__VLS_components.routerLink;__VLS_components.routerLink;__VLS_components["router-link"];__VLS_components["router-link"];
// @ts-ignore
[RouterLink,RouterLink,];
__VLS_components.VCardSubtitle;__VLS_components.VCardSubtitle;__VLS_components.vCardSubtitle;__VLS_components.vCardSubtitle;__VLS_components["v-card-subtitle"];__VLS_components["v-card-subtitle"];
// @ts-ignore
[VCardSubtitle,VCardSubtitle,];
__VLS_components.VCardText;__VLS_components.VCardText;__VLS_components.vCardText;__VLS_components.vCardText;__VLS_components["v-card-text"];__VLS_components["v-card-text"];
// @ts-ignore
[VCardText,VCardText,];
__VLS_components.VCardActions;__VLS_components.VCardActions;__VLS_components.vCardActions;__VLS_components.vCardActions;__VLS_components["v-card-actions"];__VLS_components["v-card-actions"];
// @ts-ignore
[VCardActions,VCardActions,];
__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.vBtn;__VLS_components.vBtn;__VLS_components["v-btn"];__VLS_components["v-btn"];
// @ts-ignore
[VBtn,VBtn,];
{
const __VLS_0 = ({} as 'VCard' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx.VCard }: 'vCard' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx.vCard }: 'v-card' extends keyof typeof __VLS_ctx ? { 'VCard': typeof __VLS_ctx["v-card"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCard;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({...{ }, class: ("product-card"), }));
({} as { VCard: typeof __VLS_0 }).VCard;
({} as { VCard: typeof __VLS_0 }).VCard;
const __VLS_2 = __VLS_1({ ...{ }, class: ("product-card"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ }, class: ("product-card"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = ({} as 'VImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.VImg }: 'vImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.vImg }: 'v-img' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx["v-img"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VImg;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, src: ((__VLS_ctx.image)), cover: (true), height: ("200"), }));
({} as { VImg: typeof __VLS_5 }).VImg;
({} as { VImg: typeof __VLS_5 }).VImg;
const __VLS_7 = __VLS_6({ ...{ }, src: ((__VLS_ctx.image)), cover: (true), height: ("200"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, src: ((__VLS_ctx.image)), cover: (true), height: ("200"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
}
{
const __VLS_10 = ({} as 'VCardTitle' extends keyof typeof __VLS_ctx ? { 'VCardTitle': typeof __VLS_ctx.VCardTitle }: 'vCardTitle' extends keyof typeof __VLS_ctx ? { 'VCardTitle': typeof __VLS_ctx.vCardTitle }: 'v-card-title' extends keyof typeof __VLS_ctx ? { 'VCardTitle': typeof __VLS_ctx["v-card-title"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCardTitle;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({...{ }, }));
({} as { VCardTitle: typeof __VLS_10 }).VCardTitle;
({} as { VCardTitle: typeof __VLS_10 }).VCardTitle;
const __VLS_12 = __VLS_11({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = ({} as 'RouterLink' extends keyof typeof __VLS_ctx ? { 'RouterLink': typeof __VLS_ctx.RouterLink }: 'routerLink' extends keyof typeof __VLS_ctx ? { 'RouterLink': typeof __VLS_ctx.routerLink }: 'router-link' extends keyof typeof __VLS_ctx ? { 'RouterLink': typeof __VLS_ctx["router-link"] }: typeof __VLS_resolvedLocalAndGlobalComponents).RouterLink;
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({...{ }, class: ("text-primary text-decoration-none"), to: (('/products/' + __VLS_ctx._id)), }));
({} as { RouterLink: typeof __VLS_15 }).RouterLink;
({} as { RouterLink: typeof __VLS_15 }).RouterLink;
const __VLS_17 = __VLS_16({ ...{ }, class: ("text-primary text-decoration-none"), to: (('/products/' + __VLS_ctx._id)), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, class: ("text-primary text-decoration-none"), to: (('/products/' + __VLS_ctx._id)), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
( __VLS_ctx.name );
(__VLS_18.slots!).default;
}
(__VLS_13.slots!).default;
}
{
const __VLS_20 = ({} as 'VCardSubtitle' extends keyof typeof __VLS_ctx ? { 'VCardSubtitle': typeof __VLS_ctx.VCardSubtitle }: 'vCardSubtitle' extends keyof typeof __VLS_ctx ? { 'VCardSubtitle': typeof __VLS_ctx.vCardSubtitle }: 'v-card-subtitle' extends keyof typeof __VLS_ctx ? { 'VCardSubtitle': typeof __VLS_ctx["v-card-subtitle"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCardSubtitle;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({...{ }, }));
({} as { VCardSubtitle: typeof __VLS_20 }).VCardSubtitle;
({} as { VCardSubtitle: typeof __VLS_20 }).VCardSubtitle;
const __VLS_22 = __VLS_21({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
( __VLS_ctx.price );
(__VLS_23.slots!).default;
}
{
const __VLS_25 = ({} as 'VCardText' extends keyof typeof __VLS_ctx ? { 'VCardText': typeof __VLS_ctx.VCardText }: 'vCardText' extends keyof typeof __VLS_ctx ? { 'VCardText': typeof __VLS_ctx.vCardText }: 'v-card-text' extends keyof typeof __VLS_ctx ? { 'VCardText': typeof __VLS_ctx["v-card-text"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCardText;
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({...{ }, style: ({}), }));
({} as { VCardText: typeof __VLS_25 }).VCardText;
({} as { VCardText: typeof __VLS_25 }).VCardText;
const __VLS_27 = __VLS_26({ ...{ }, style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{ }, style: ({}), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
( __VLS_ctx.description );
(__VLS_28.slots!).default;
}
{
const __VLS_30 = ({} as 'VCardActions' extends keyof typeof __VLS_ctx ? { 'VCardActions': typeof __VLS_ctx.VCardActions }: 'vCardActions' extends keyof typeof __VLS_ctx ? { 'VCardActions': typeof __VLS_ctx.vCardActions }: 'v-card-actions' extends keyof typeof __VLS_ctx ? { 'VCardActions': typeof __VLS_ctx["v-card-actions"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VCardActions;
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({...{ }, }));
({} as { VCardActions: typeof __VLS_30 }).VCardActions;
({} as { VCardActions: typeof __VLS_30 }).VCardActions;
const __VLS_32 = __VLS_31({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
{
const __VLS_35 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn }: 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx["v-btn"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({...{ onClick: {} as any, }, color: ("primary"), prependIcon: ("mdi-cart"), }));
({} as { VBtn: typeof __VLS_35 }).VBtn;
({} as { VBtn: typeof __VLS_35 }).VBtn;
const __VLS_37 = __VLS_36({ ...{ onClick: {} as any, }, color: ("primary"), prependIcon: ("mdi-cart"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, color: ("primary"), prependIcon: ("mdi-cart"), });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
let __VLS_40 = { 'click': __VLS_pickEvent(__VLS_39['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_36, typeof __VLS_37>).onClick) };
__VLS_40 = { click: (__VLS_ctx.addCart) };
(__VLS_38.slots!).default;
}
(__VLS_33.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!:{
};
// @ts-ignore
[image,image,image,_id,_id,_id,name,price,description,addCart,];
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
$props: __VLS_makeOptional(props),
...props,
addCart: addCart as typeof addCart,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
$props: __VLS_makeOptional(props),
...props,
};
},
});
