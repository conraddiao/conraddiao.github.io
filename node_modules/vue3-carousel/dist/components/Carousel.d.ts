declare const _default: import("vue").DefineComponent<{
    itemsToShow: {
        default: number;
        type: NumberConstructor;
    };
    itemsToScroll: {
        default: number;
        type: NumberConstructor;
    };
    wrapAround: {
        default: boolean;
        type: BooleanConstructor;
    };
    snapAlign: {
        default: string;
        validator(value: string): boolean;
    };
    transition: {
        default: number;
        type: NumberConstructor;
    };
    settings: {
        default(): {};
        type: ObjectConstructor;
    };
    breakpoints: {
        default: null;
        type: ObjectConstructor;
    };
    autoplay: {
        default: number;
        type: NumberConstructor;
    };
    pauseAutoplayOnHover: {
        default: boolean;
        type: BooleanConstructor;
    };
    modelValue: {
        default: undefined;
        type: NumberConstructor;
    };
    mouseDrag: {
        default: boolean;
        type: BooleanConstructor;
    };
    touchDrag: {
        default: boolean;
        type: BooleanConstructor;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    itemsToShow?: unknown;
    itemsToScroll?: unknown;
    wrapAround?: unknown;
    snapAlign?: unknown;
    transition?: unknown;
    settings?: unknown;
    breakpoints?: unknown;
    autoplay?: unknown;
    pauseAutoplayOnHover?: unknown;
    modelValue?: unknown;
    mouseDrag?: unknown;
    touchDrag?: unknown;
} & {
    settings: Record<string, any>;
    itemsToShow: number;
    itemsToScroll: number;
    wrapAround: boolean;
    snapAlign: string;
    transition: number;
    breakpoints: Record<string, any>;
    autoplay: number;
    pauseAutoplayOnHover: boolean;
    mouseDrag: boolean;
    touchDrag: boolean;
} & {
    modelValue?: number | undefined;
}> & ({} | {}), {
    settings: Record<string, any>;
    itemsToShow: number;
    itemsToScroll: number;
    wrapAround: boolean;
    snapAlign: string;
    transition: number;
    breakpoints: Record<string, any>;
    autoplay: number;
    pauseAutoplayOnHover: boolean;
    modelValue: number;
    mouseDrag: boolean;
    touchDrag: boolean;
}>;
export default _default;
