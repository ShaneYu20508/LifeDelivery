/* __placeholder__ */

import { useUserStore } from '@/store/user'
import { computed } from 'vue'


const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const user = useUserStore()
const navItems = [
  { to: '/admin/products', text: '商品管理', icon: 'mdi-shopping' },
  { to: '/admin/orders', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

const prependAvatar = computed(() => {
  return `http://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})

const __VLS_componentsOption = {};

let __VLS_name!: 'AdminLayout';
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
& __VLS_WithComponent<'VDivider', typeof __VLS_localComponents, "VDivider", "VDivider", "VDivider">
& __VLS_WithComponent<'VMain', typeof __VLS_localComponents, "VMain", "VMain", "VMain">
& __VLS_WithComponent<'RouterView', typeof __VLS_localComponents, "RouterView", "RouterView", "RouterView">
;
__VLS_components.VNavigationDrawer;__VLS_components.VNavigationDrawer;
// @ts-ignore
[VNavigationDrawer,VNavigationDrawer,];
__VLS_components.VList;__VLS_components.VList;__VLS_components.VList;__VLS_components.VList;
// @ts-ignore
[VList,VList,VList,VList,];
__VLS_components.VListItem;__VLS_components.VListItem;__VLS_components.VListItem;__VLS_components.VListItem;
// @ts-ignore
[VListItem,VListItem,VListItem,VListItem,];
__VLS_components.VDivider;__VLS_components.VDivider;
// @ts-ignore
[VDivider,VDivider,];
__VLS_components.VMain;__VLS_components.VMain;
// @ts-ignore
[VMain,VMain,];
__VLS_components.RouterView;__VLS_components.RouterView;
// @ts-ignore
[RouterView,RouterView,];
{
const __VLS_0 = ({} as 'VNavigationDrawer' extends keyof typeof __VLS_ctx ? { 'VNavigationDrawer': typeof __VLS_ctx.VNavigationDrawer }: typeof __VLS_resolvedLocalAndGlobalComponents).VNavigationDrawer;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({...{ }, permanent: (true), }));
({} as { VNavigationDrawer: typeof __VLS_0 }).VNavigationDrawer;
({} as { VNavigationDrawer: typeof __VLS_0 }).VNavigationDrawer;
const __VLS_2 = __VLS_1({ ...{ }, permanent: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ }, permanent: (true), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = ({} as 'VList' extends keyof typeof __VLS_ctx ? { 'VList': typeof __VLS_ctx.VList }: typeof __VLS_resolvedLocalAndGlobalComponents).VList;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, }));
({} as { VList: typeof __VLS_5 }).VList;
({} as { VList: typeof __VLS_5 }).VList;
const __VLS_7 = __VLS_6({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = ({} as 'VListItem' extends keyof typeof __VLS_ctx ? { 'VListItem': typeof __VLS_ctx.VListItem }: typeof __VLS_resolvedLocalAndGlobalComponents).VListItem;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({...{ }, prependAvatar: ({}), title: ((__VLS_ctx.user.account)), }));
({} as { VListItem: typeof __VLS_10 }).VListItem;
({} as { VListItem: typeof __VLS_10 }).VListItem;
const __VLS_12 = __VLS_11({ ...{ }, prependAvatar: ({}), title: ((__VLS_ctx.user.account)), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, prependAvatar: ({}), title: ((__VLS_ctx.user.account)), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
}
(__VLS_8.slots!).default;
}
{
const __VLS_15 = ({} as 'VDivider' extends keyof typeof __VLS_ctx ? { 'VDivider': typeof __VLS_ctx.VDivider }: typeof __VLS_resolvedLocalAndGlobalComponents).VDivider;
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({...{ }, }));
({} as { VDivider: typeof __VLS_15 }).VDivider;
({} as { VDivider: typeof __VLS_15 }).VDivider;
const __VLS_17 = __VLS_16({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
}
{
const __VLS_20 = ({} as 'VList' extends keyof typeof __VLS_ctx ? { 'VList': typeof __VLS_ctx.VList }: typeof __VLS_resolvedLocalAndGlobalComponents).VList;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({...{ }, }));
({} as { VList: typeof __VLS_20 }).VList;
({} as { VList: typeof __VLS_20 }).VList;
const __VLS_22 = __VLS_21({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems)!)) {
{
const __VLS_25 = ({} as 'VListItem' extends keyof typeof __VLS_ctx ? { 'VListItem': typeof __VLS_ctx.VListItem }: typeof __VLS_resolvedLocalAndGlobalComponents).VListItem;
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({...{ }, key: ((item.to)), to: ((item.to)), title: ((item.text)), prependIcon: ((item.icon)), }));
({} as { VListItem: typeof __VLS_25 }).VListItem;
({} as { VListItem: typeof __VLS_25 }).VListItem;
const __VLS_27 = __VLS_26({ ...{ }, key: ((item.to)), to: ((item.to)), title: ((item.text)), prependIcon: ((item.icon)), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{ }, key: ((item.to)), to: ((item.to)), title: ((item.text)), prependIcon: ((item.icon)), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
}
// @ts-ignore
[user,user,user,navItems,];
}
(__VLS_23.slots!).default;
}
(__VLS_3.slots!).default;
}
{
const __VLS_30 = ({} as 'VMain' extends keyof typeof __VLS_ctx ? { 'VMain': typeof __VLS_ctx.VMain }: typeof __VLS_resolvedLocalAndGlobalComponents).VMain;
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({...{ }, }));
({} as { VMain: typeof __VLS_30 }).VMain;
({} as { VMain: typeof __VLS_30 }).VMain;
const __VLS_32 = __VLS_31({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
{
const __VLS_35 = ({} as 'RouterView' extends keyof typeof __VLS_ctx ? { 'RouterView': typeof __VLS_ctx.RouterView }: typeof __VLS_resolvedLocalAndGlobalComponents).RouterView;
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({...{ }, }));
({} as { RouterView: typeof __VLS_35 }).RouterView;
({} as { RouterView: typeof __VLS_35 }).RouterView;
const __VLS_37 = __VLS_36({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
}
(__VLS_33.slots!).default;
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
navItems: navItems as typeof navItems,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});
