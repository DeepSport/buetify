import { FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { PropType } from 'vue';
export declare const SvgLoader: import("vue").DefineComponent<{
    src: {
        type: StringConstructor;
        required: true;
    };
    onLoad: {
        type: PropType<IO<void>>;
        required: false;
    };
    onError: {
        type: PropType<FunctionN<[Error], void>>;
        required: false;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    src: string;
} & {
    onLoad?: IO<void> | undefined;
    onError?: FunctionN<[Error], void> | undefined;
}>, {}>;
