import { IO } from 'fp-ts/lib/IO';
import { VNode } from 'vue';
import { Transition, TransitionClasses } from '../../../types/Transition';
export interface NoticeOptions {
    render: IO<VNode[]>;
    duration: number;
    shouldQueue: boolean;
    transition: Transition;
}
export interface Notice {
    id: number;
    render: IO<VNode[] | undefined>;
    transition: TransitionClasses;
    onAfterLeave: IO<void>;
}
declare const BNoticeContainer: import("vue").DefineComponent<{}, {
    rootZ: import("vue").ComputedRef<1 | -1>;
    showNotice: (params: NoticeOptions) => IO<void>;
    notices: {
        id: number;
        render: IO<VNode[] | undefined>;
        transition: {
            css?: boolean | undefined;
            name?: string | undefined;
            'enter-from-class'?: string | undefined;
            'enter-active-class'?: string | undefined;
            'enter-to-class'?: string | undefined;
            'leave-from-class'?: string | undefined;
            'leave-active-class'?: string | undefined;
            'leave-to-class'?: string | undefined;
        };
        onAfterLeave: IO<void>;
    }[];
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}>;
export declare type NoticeContainer = InstanceType<typeof BNoticeContainer>;
export default BNoticeContainer;
