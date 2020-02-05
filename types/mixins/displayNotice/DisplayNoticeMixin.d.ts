import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { NoticeInjection } from '../../types/AppInjection';
import { AllColorsVariant, ColorVariant } from '../../types/ColorVariants';
import { PositionVariant } from '../../types/PositionVariant';
export declare const DEFAULT_NOTICE_INJECTION: NoticeInjection;
interface options extends Vue {
    notice: NoticeInjection;
}
export declare const DisplayNoticeMixin: import("vue/types/vue").OptionsVue<options & Vue, {
    internalCloseNotice: () => void;
}, {
    mergeNoticeParams(params?: OpenNoticeParams | undefined): OpenNoticeParams;
    closeNotice(): void;
    open(params: OpenNoticeParams): void;
    generateNotice(params: OpenNoticeParams): VNode;
    renderNoticeScopedSlot(): VNode;
}, {
    internalDuration: number;
    noticeClasses: any[];
}, {
    position: PositionVariant;
    duration: number;
    message: string | undefined;
    shouldQueue: boolean;
    variant: ColorVariant;
    isIndefinite: boolean;
}, {
    name: string;
    props: {
        position: PropValidator<PositionVariant>;
        duration: {
            type: NumberConstructor;
            default: number;
        };
        message: PropValidator<string | undefined>;
        shouldQueue: {
            type: BooleanConstructor;
            default: boolean;
        };
        variant: PropValidator<ColorVariant>;
        isIndefinite: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<options & Vue, unknown, unknown, unknown, Readonly<{
        position: PositionVariant;
        duration: number;
        message: string | undefined;
        shouldQueue: boolean;
        variant: ColorVariant;
        isIndefinite: boolean;
    }>>): {
        internalCloseNotice: () => void;
    };
    inject: {
        notice: {
            default: import("fp-ts/lib/function").Lazy<NoticeInjection>;
        };
    };
    computed: {
        internalDuration(): number;
        noticeClasses(): any[];
    };
    methods: {
        mergeNoticeParams(params?: OpenNoticeParams | undefined): OpenNoticeParams;
        closeNotice(): void;
        open(params: OpenNoticeParams): void;
        generateNotice(params: OpenNoticeParams): VNode;
        renderNoticeScopedSlot(): VNode;
    };
    render(): VNode;
}>;
export interface OpenNoticeParams {
    variant?: AllColorsVariant;
    message?: string;
    position?: PositionVariant;
    duration?: number;
    shouldQueue?: boolean;
}
export {};
