/* __placeholder__ */

const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');

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
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {}
& __VLS_WithComponent<'VMain', typeof __VLS_localComponents, "VMain", "vMain", "v-main">
& __VLS_WithComponent<'VImg', typeof __VLS_localComponents, "VImg", "vImg", "v-img">
;
__VLS_components.VMain;__VLS_components.VMain;__VLS_components.vMain;__VLS_components.vMain;__VLS_components["v-main"];__VLS_components["v-main"];
// @ts-ignore
[VMain,VMain,];
__VLS_components.VImg;__VLS_components.VImg;__VLS_components.VImg;__VLS_components.VImg;__VLS_components.VImg;__VLS_components.VImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components.vImg;__VLS_components["v-img"];__VLS_components["v-img"];__VLS_components["v-img"];__VLS_components["v-img"];__VLS_components["v-img"];__VLS_components["v-img"];
// @ts-ignore
[VImg,VImg,VImg,VImg,VImg,VImg,];
{
const __VLS_0 = ({} as 'VMain' extends keyof typeof __VLS_ctx ? { 'VMain': typeof __VLS_ctx.VMain }: 'vMain' extends keyof typeof __VLS_ctx ? { 'VMain': typeof __VLS_ctx.vMain }: 'v-main' extends keyof typeof __VLS_ctx ? { 'VMain': typeof __VLS_ctx["v-main"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VMain;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({...{ }, id: ("scene"), class: ("pa-0"), }));
({} as { VMain: typeof __VLS_0 }).VMain;
({} as { VMain: typeof __VLS_0 }).VMain;
const __VLS_2 = __VLS_1({ ...{ }, id: ("scene"), class: ("pa-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ }, id: ("scene"), class: ("pa-0"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = ({} as 'VImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.VImg }: 'vImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.vImg }: 'v-img' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx["v-img"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VImg;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, id: ("big-pic"), dataDepth: ("-0.6"), src: ("../../../imgs/detective.jfif"), }));
({} as { VImg: typeof __VLS_5 }).VImg;
({} as { VImg: typeof __VLS_5 }).VImg;
const __VLS_7 = __VLS_6({ ...{ }, id: ("big-pic"), dataDepth: ("-0.6"), src: ("../../../imgs/detective.jfif"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, id: ("big-pic"), dataDepth: ("-0.6"), src: ("../../../imgs/detective.jfif"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
}
{
const __VLS_10 = ({} as 'VImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.VImg }: 'vImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.vImg }: 'v-img' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx["v-img"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VImg;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({...{ }, id: ("sm-pic01"), dataDepth: ("0.25"), src: ("../../../imgs/sm-pic01.jpg"), }));
({} as { VImg: typeof __VLS_10 }).VImg;
({} as { VImg: typeof __VLS_10 }).VImg;
const __VLS_12 = __VLS_11({ ...{ }, id: ("sm-pic01"), dataDepth: ("0.25"), src: ("../../../imgs/sm-pic01.jpg"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, id: ("sm-pic01"), dataDepth: ("0.25"), src: ("../../../imgs/sm-pic01.jpg"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
}
{
const __VLS_15 = ({} as 'VImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.VImg }: 'vImg' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx.vImg }: 'v-img' extends keyof typeof __VLS_ctx ? { 'VImg': typeof __VLS_ctx["v-img"] }: typeof __VLS_resolvedLocalAndGlobalComponents).VImg;
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({...{ }, id: ("sm-pic02"), dataDepth: ("0.5"), src: ("../../../imgs/sm-pic02.jpg"), }));
({} as { VImg: typeof __VLS_15 }).VImg;
({} as { VImg: typeof __VLS_15 }).VImg;
const __VLS_17 = __VLS_16({ ...{ }, id: ("sm-pic02"), dataDepth: ("0.5"), src: ("../../../imgs/sm-pic02.jpg"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, id: ("sm-pic02"), dataDepth: ("0.5"), src: ("../../../imgs/sm-pic02.jpg"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["pa-0"];
}
var __VLS_slots!:{
};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});
