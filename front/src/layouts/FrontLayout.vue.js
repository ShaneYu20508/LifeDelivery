/* __placeholder__ */

import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
// 引入登入狀態
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// 引入路由
import { useRouter } from 'vue-router'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { apiAuth } = useApi()

// 引入路由
const router = useRouter()

const createSnackbar = useSnackbar()

const user = useUserStore()
// 手機版判斷式
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
// 手機側邊欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin },
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: user.isLogin },
    { to: '/orders', text: '訂單', icon: 'mdi-list-box', show: user.isLogin },
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    // 登出後導向回首頁
    router.push('/')
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

let __VLS_name!: 'FrontLayout';
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
& __VLS_WithComponent<'VNavigationDrawer', typeof __VLS_localComponents, "VNavigationDrawer", "VNavigationDrawer", "VNavigationDrawer">
& __VLS_WithComponent<'VList', typeof __VLS_localComponents, "VList", "VList", "VList">
& __VLS_WithComponent<'VListItem', typeof __VLS_localComponents, "VListItem", "VListItem", "VListItem">
& __VLS_WithComponent<'VIcon', typeof __VLS_localComponents, "VIcon", "VIcon", "VIcon">
& __VLS_WithComponent<'VListItemTitle', typeof __VLS_localComponents, "VListItemTitle", "VListItemTitle", "VListItemTitle">
& __VLS_WithComponent<'VAppBar', typeof __VLS_localComponents, "VAppBar", "VAppBar", "VAppBar">
& __VLS_WithComponent<'VContainer', typeof __VLS_localComponents, "VContainer", "VContainer", "VContainer">
& __VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "VBtn", "VBtn">
& __VLS_WithComponent<'VAppBarTitle', typeof __VLS_localComponents, "VAppBarTitle", "VAppBarTitle", "VAppBarTitle">
& __VLS_WithComponent<'VSpacer', typeof __VLS_localComponents, "VSpacer", "VSpacer", "VSpacer">
& __VLS_WithComponent<'VAppBarNavIcon', typeof __VLS_localComponents, "VAppBarNavIcon", "VAppBarNavIcon", "VAppBarNavIcon">
& __VLS_WithComponent<'VMain', typeof __VLS_localComponents, "VMain", "VMain", "VMain">
& __VLS_WithComponent<'RouterView', typeof __VLS_localComponents, "RouterView", "RouterView", "RouterView">
;
__VLS_components.VNavigationDrawer;__VLS_components.VNavigationDrawer;
// @ts-ignore
[VNavigationDrawer,VNavigationDrawer,];
__VLS_components.VList;__VLS_components.VList;
// @ts-ignore
[VList,VList,];
__VLS_components.VListItem;__VLS_components.VListItem;__VLS_components.VListItem;__VLS_components.VListItem;
// @ts-ignore
[VListItem,VListItem,VListItem,VListItem,];
__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;__VLS_intrinsicElements.template;
__VLS_components.VIcon;__VLS_components.VIcon;__VLS_components.VIcon;__VLS_components.VIcon;
// @ts-ignore
[VIcon,VIcon,VIcon,VIcon,];
__VLS_components.VListItemTitle;__VLS_components.VListItemTitle;__VLS_components.VListItemTitle;__VLS_components.VListItemTitle;
// @ts-ignore
[VListItemTitle,VListItemTitle,VListItemTitle,VListItemTitle,];
__VLS_components.VAppBar;__VLS_components.VAppBar;
// @ts-ignore
[VAppBar,VAppBar,];
__VLS_components.VContainer;__VLS_components.VContainer;
// @ts-ignore
[VContainer,VContainer,];
__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;__VLS_components.VBtn;
// @ts-ignore
[VBtn,VBtn,VBtn,VBtn,VBtn,VBtn,];
__VLS_components.VAppBarTitle;__VLS_components.VAppBarTitle;
// @ts-ignore
[VAppBarTitle,VAppBarTitle,];
__VLS_components.VSpacer;__VLS_components.VSpacer;
// @ts-ignore
[VSpacer,VSpacer,];
__VLS_components.VAppBarNavIcon;__VLS_components.VAppBarNavIcon;
// @ts-ignore
[VAppBarNavIcon,VAppBarNavIcon,];
__VLS_components.VMain;__VLS_components.VMain;
// @ts-ignore
[VMain,VMain,];
__VLS_components.RouterView;__VLS_components.RouterView;
// @ts-ignore
[RouterView,RouterView,];
if (__VLS_ctx.isMobile) {
{
const __VLS_0 = ({} as 'VNavigationDrawer' extends keyof typeof __VLS_ctx ? { 'VNavigationDrawer': typeof __VLS_ctx.VNavigationDrawer }: typeof __VLS_resolvedLocalAndGlobalComponents).VNavigationDrawer;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({...{ }, modelValue: ((__VLS_ctx.drawer)), temporary: (true), location: ("left"), }));
({} as { VNavigationDrawer: typeof __VLS_0 }).VNavigationDrawer;
({} as { VNavigationDrawer: typeof __VLS_0 }).VNavigationDrawer;
const __VLS_2 = __VLS_1({ ...{ }, modelValue: ((__VLS_ctx.drawer)), temporary: (true), location: ("left"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ }, modelValue: ((__VLS_ctx.drawer)), temporary: (true), location: ("left"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = ({} as 'VList' extends keyof typeof __VLS_ctx ? { 'VList': typeof __VLS_ctx.VList }: typeof __VLS_resolvedLocalAndGlobalComponents).VList;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, nav: (true), }));
({} as { VList: typeof __VLS_5 }).VList;
({} as { VList: typeof __VLS_5 }).VList;
const __VLS_7 = __VLS_6({ ...{ }, nav: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, nav: (true), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems)!)) {
if (item.show) {
{
const __VLS_10 = ({} as 'VListItem' extends keyof typeof __VLS_ctx ? { 'VListItem': typeof __VLS_ctx.VListItem }: typeof __VLS_resolvedLocalAndGlobalComponents).VListItem;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({...{ }, to: ((item.to)), }));
({} as { VListItem: typeof __VLS_10 }).VListItem;
({} as { VListItem: typeof __VLS_10 }).VListItem;
const __VLS_12 = __VLS_11({ ...{ }, to: ((item.to)), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, to: ((item.to)), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = __VLS_intrinsicElements["template"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, });
{
(__VLS_13.slots!).prepend;
{
const __VLS_18 = ({} as 'VIcon' extends keyof typeof __VLS_ctx ? { 'VIcon': typeof __VLS_ctx.VIcon }: typeof __VLS_resolvedLocalAndGlobalComponents).VIcon;
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({...{ }, icon: ((item.icon)), }));
({} as { VIcon: typeof __VLS_18 }).VIcon;
({} as { VIcon: typeof __VLS_18 }).VIcon;
const __VLS_20 = __VLS_19({ ...{ }, icon: ((item.icon)), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_18, typeof __VLS_20> & Record<string, unknown>) => void)({ ...{ }, icon: ((item.icon)), });
const __VLS_21 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20)!;
let __VLS_22!: __VLS_NormalizeEmits<typeof __VLS_21.emit>;
}
// @ts-ignore
[isMobile,drawer,drawer,drawer,navItems,];
}
}
{
const __VLS_23 = ({} as 'VListItemTitle' extends keyof typeof __VLS_ctx ? { 'VListItemTitle': typeof __VLS_ctx.VListItemTitle }: typeof __VLS_resolvedLocalAndGlobalComponents).VListItemTitle;
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({...{ }, }));
({} as { VListItemTitle: typeof __VLS_23 }).VListItemTitle;
({} as { VListItemTitle: typeof __VLS_23 }).VListItemTitle;
const __VLS_25 = __VLS_24({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_24));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_23, typeof __VLS_25> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_26 = __VLS_pickFunctionalComponentCtx(__VLS_23, __VLS_25)!;
let __VLS_27!: __VLS_NormalizeEmits<typeof __VLS_26.emit>;
( item.text );
(__VLS_26.slots!).default;
}
}
}
}
if (__VLS_ctx.user.isLogin) {
{
const __VLS_28 = ({} as 'VListItem' extends keyof typeof __VLS_ctx ? { 'VListItem': typeof __VLS_ctx.VListItem }: typeof __VLS_resolvedLocalAndGlobalComponents).VListItem;
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({...{ onClick: {} as any, }, }));
({} as { VListItem: typeof __VLS_28 }).VListItem;
({} as { VListItem: typeof __VLS_28 }).VListItem;
const __VLS_30 = __VLS_29({ ...{ onClick: {} as any, }, }, ...__VLS_functionalComponentArgsRest(__VLS_29));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_28, typeof __VLS_30> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, });
const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_28, __VLS_30)!;
let __VLS_32!: __VLS_NormalizeEmits<typeof __VLS_31.emit>;
let __VLS_33 = { 'click': __VLS_pickEvent(__VLS_32['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_29, typeof __VLS_30>).onClick) };
__VLS_33 = { click: (__VLS_ctx.logout) };
{
const __VLS_34 = __VLS_intrinsicElements["template"];
const __VLS_35 = __VLS_elementAsFunctionalComponent(__VLS_34);
const __VLS_36 = __VLS_35({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_35));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_34, typeof __VLS_36> & Record<string, unknown>) => void)({ ...{ }, });
{
(__VLS_31.slots!).prepend;
{
const __VLS_37 = ({} as 'VIcon' extends keyof typeof __VLS_ctx ? { 'VIcon': typeof __VLS_ctx.VIcon }: typeof __VLS_resolvedLocalAndGlobalComponents).VIcon;
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({...{ }, icon: ("mdi-logout"), }));
({} as { VIcon: typeof __VLS_37 }).VIcon;
({} as { VIcon: typeof __VLS_37 }).VIcon;
const __VLS_39 = __VLS_38({ ...{ }, icon: ("mdi-logout"), }, ...__VLS_functionalComponentArgsRest(__VLS_38));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_37, typeof __VLS_39> & Record<string, unknown>) => void)({ ...{ }, icon: ("mdi-logout"), });
const __VLS_40 = __VLS_pickFunctionalComponentCtx(__VLS_37, __VLS_39)!;
let __VLS_41!: __VLS_NormalizeEmits<typeof __VLS_40.emit>;
}
// @ts-ignore
[user,logout,];
}
}
{
const __VLS_42 = ({} as 'VListItemTitle' extends keyof typeof __VLS_ctx ? { 'VListItemTitle': typeof __VLS_ctx.VListItemTitle }: typeof __VLS_resolvedLocalAndGlobalComponents).VListItemTitle;
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({...{ }, }));
({} as { VListItemTitle: typeof __VLS_42 }).VListItemTitle;
({} as { VListItemTitle: typeof __VLS_42 }).VListItemTitle;
const __VLS_44 = __VLS_43({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_42, typeof __VLS_44> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44)!;
let __VLS_46!: __VLS_NormalizeEmits<typeof __VLS_45.emit>;
(__VLS_45.slots!).default;
}
}
}
(__VLS_8.slots!).default;
}
(__VLS_3.slots!).default;
}
}
{
const __VLS_47 = ({} as 'VAppBar' extends keyof typeof __VLS_ctx ? { 'VAppBar': typeof __VLS_ctx.VAppBar }: typeof __VLS_resolvedLocalAndGlobalComponents).VAppBar;
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({...{ }, color: ("c1"), }));
({} as { VAppBar: typeof __VLS_47 }).VAppBar;
({} as { VAppBar: typeof __VLS_47 }).VAppBar;
const __VLS_49 = __VLS_48({ ...{ }, color: ("c1"), }, ...__VLS_functionalComponentArgsRest(__VLS_48));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_47, typeof __VLS_49> & Record<string, unknown>) => void)({ ...{ }, color: ("c1"), });
const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_47, __VLS_49)!;
let __VLS_51!: __VLS_NormalizeEmits<typeof __VLS_50.emit>;
{
const __VLS_52 = ({} as 'VContainer' extends keyof typeof __VLS_ctx ? { 'VContainer': typeof __VLS_ctx.VContainer }: typeof __VLS_resolvedLocalAndGlobalComponents).VContainer;
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({...{ }, class: ("d-flex align-center"), }));
({} as { VContainer: typeof __VLS_52 }).VContainer;
({} as { VContainer: typeof __VLS_52 }).VContainer;
const __VLS_54 = __VLS_53({ ...{ }, class: ("d-flex align-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_52, typeof __VLS_54> & Record<string, unknown>) => void)({ ...{ }, class: ("d-flex align-center"), });
const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54)!;
let __VLS_56!: __VLS_NormalizeEmits<typeof __VLS_55.emit>;
{
const __VLS_57 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({...{ }, to: ("/"), active: ((false)), }));
({} as { VBtn: typeof __VLS_57 }).VBtn;
({} as { VBtn: typeof __VLS_57 }).VBtn;
const __VLS_59 = __VLS_58({ ...{ }, to: ("/"), active: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_58));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_57, typeof __VLS_59> & Record<string, unknown>) => void)({ ...{ }, to: ("/"), active: ((false)), });
const __VLS_60 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59)!;
let __VLS_61!: __VLS_NormalizeEmits<typeof __VLS_60.emit>;
{
const __VLS_62 = ({} as 'VAppBarTitle' extends keyof typeof __VLS_ctx ? { 'VAppBarTitle': typeof __VLS_ctx.VAppBarTitle }: typeof __VLS_resolvedLocalAndGlobalComponents).VAppBarTitle;
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({...{ }, }));
({} as { VAppBarTitle: typeof __VLS_62 }).VAppBarTitle;
({} as { VAppBarTitle: typeof __VLS_62 }).VAppBarTitle;
const __VLS_64 = __VLS_63({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_63));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_62, typeof __VLS_64> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64)!;
let __VLS_66!: __VLS_NormalizeEmits<typeof __VLS_65.emit>;
(__VLS_65.slots!).default;
}
(__VLS_60.slots!).default;
}
{
const __VLS_67 = ({} as 'VSpacer' extends keyof typeof __VLS_ctx ? { 'VSpacer': typeof __VLS_ctx.VSpacer }: typeof __VLS_resolvedLocalAndGlobalComponents).VSpacer;
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({...{ }, }));
({} as { VSpacer: typeof __VLS_67 }).VSpacer;
({} as { VSpacer: typeof __VLS_67 }).VSpacer;
const __VLS_69 = __VLS_68({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_68));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_67, typeof __VLS_69> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_70 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69)!;
let __VLS_71!: __VLS_NormalizeEmits<typeof __VLS_70.emit>;
}
if (__VLS_ctx.isMobile) {
{
const __VLS_72 = ({} as 'VAppBarNavIcon' extends keyof typeof __VLS_ctx ? { 'VAppBarNavIcon': typeof __VLS_ctx.VAppBarNavIcon }: typeof __VLS_resolvedLocalAndGlobalComponents).VAppBarNavIcon;
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({...{ onClick: {} as any, }, }));
({} as { VAppBarNavIcon: typeof __VLS_72 }).VAppBarNavIcon;
({} as { VAppBarNavIcon: typeof __VLS_72 }).VAppBarNavIcon;
const __VLS_74 = __VLS_73({ ...{ onClick: {} as any, }, }, ...__VLS_functionalComponentArgsRest(__VLS_73));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_72, typeof __VLS_74> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, });
const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74)!;
let __VLS_76!: __VLS_NormalizeEmits<typeof __VLS_75.emit>;
let __VLS_77 = { 'click': __VLS_pickEvent(__VLS_76['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_73, typeof __VLS_74>).onClick) };
__VLS_77 = { click: $event => {
if (!((__VLS_ctx.isMobile))) return;
__VLS_ctx.drawer = true;
// @ts-ignore
[isMobile,drawer,];
}
 };
}
}
else {
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems)!)) {
if (item.show) {
{
const __VLS_78 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({...{ }, to: ((item.to)), prependIcon: ((item.icon)), }));
({} as { VBtn: typeof __VLS_78 }).VBtn;
({} as { VBtn: typeof __VLS_78 }).VBtn;
const __VLS_80 = __VLS_79({ ...{ }, to: ((item.to)), prependIcon: ((item.icon)), }, ...__VLS_functionalComponentArgsRest(__VLS_79));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_78, typeof __VLS_80> & Record<string, unknown>) => void)({ ...{ }, to: ((item.to)), prependIcon: ((item.icon)), });
const __VLS_81 = __VLS_pickFunctionalComponentCtx(__VLS_78, __VLS_80)!;
let __VLS_82!: __VLS_NormalizeEmits<typeof __VLS_81.emit>;
( item.text );
(__VLS_81.slots!).default;
}
// @ts-ignore
[navItems,];
}
}
if (__VLS_ctx.user.isLogin) {
{
const __VLS_83 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn }: typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({...{ onClick: {} as any, }, prependIcon: ("mdi-logout"), }));
({} as { VBtn: typeof __VLS_83 }).VBtn;
({} as { VBtn: typeof __VLS_83 }).VBtn;
const __VLS_85 = __VLS_84({ ...{ onClick: {} as any, }, prependIcon: ("mdi-logout"), }, ...__VLS_functionalComponentArgsRest(__VLS_84));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_83, typeof __VLS_85> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, prependIcon: ("mdi-logout"), });
const __VLS_86 = __VLS_pickFunctionalComponentCtx(__VLS_83, __VLS_85)!;
let __VLS_87!: __VLS_NormalizeEmits<typeof __VLS_86.emit>;
let __VLS_88 = { 'click': __VLS_pickEvent(__VLS_87['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_84, typeof __VLS_85>).onClick) };
__VLS_88 = { click: (__VLS_ctx.logout) };
(__VLS_86.slots!).default;
}
// @ts-ignore
[user,logout,];
}
}
(__VLS_55.slots!).default;
}
(__VLS_50.slots!).default;
}
{
const __VLS_89 = ({} as 'VMain' extends keyof typeof __VLS_ctx ? { 'VMain': typeof __VLS_ctx.VMain }: typeof __VLS_resolvedLocalAndGlobalComponents).VMain;
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({...{ }, }));
({} as { VMain: typeof __VLS_89 }).VMain;
({} as { VMain: typeof __VLS_89 }).VMain;
const __VLS_91 = __VLS_90({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_90));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_89, typeof __VLS_91> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_92 = __VLS_pickFunctionalComponentCtx(__VLS_89, __VLS_91)!;
let __VLS_93!: __VLS_NormalizeEmits<typeof __VLS_92.emit>;
{
const __VLS_94 = ({} as 'RouterView' extends keyof typeof __VLS_ctx ? { 'RouterView': typeof __VLS_ctx.RouterView }: typeof __VLS_resolvedLocalAndGlobalComponents).RouterView;
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({...{ }, }));
({} as { RouterView: typeof __VLS_94 }).RouterView;
({} as { RouterView: typeof __VLS_94 }).RouterView;
const __VLS_96 = __VLS_95({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_95));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_94, typeof __VLS_96> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_97 = __VLS_pickFunctionalComponentCtx(__VLS_94, __VLS_96)!;
let __VLS_98!: __VLS_NormalizeEmits<typeof __VLS_97.emit>;
}
(__VLS_92.slots!).default;
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
user: user as typeof user,
isMobile: isMobile as typeof isMobile,
drawer: drawer as typeof drawer,
navItems: navItems as typeof navItems,
logout: logout as typeof logout,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});
