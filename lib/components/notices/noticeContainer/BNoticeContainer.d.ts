import { IO } from 'fp-ts/lib/IO';
import { Option } from 'fp-ts/lib/Option';
import { VNode } from 'vue';
import { Transition, TransitionClasses } from '../../../types/Transition';
export interface NoticeOptions {
    render: IO<VNode[]>;
    duration: number;
    shouldQueue: boolean;
    transition: Transition;
}
export interface Notice {
    render: IO<VNode[]>;
    transition: TransitionClasses;
}
declare const BNoticeContainer: (new () => import("vue").ComponentPublicInstance<{}, {}, {
    id: number;
    notice: Option<Notice>;
}, {
    rootZIndex(): -1 | 1;
    extractedNotice(): Notice;
}, {
    addNotice(options: NoticeOptions): IO<void>;
    showNotice(params: NoticeOptions): IO<void>;
    generateNotice(): VNode;
}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{}, {}, {
    id: number;
    notice: Option<Notice>;
}, {
    rootZIndex(): -1 | 1;
    extractedNotice(): Notice;
}, {
    addNotice(options: NoticeOptions): IO<void>;
    showNotice(params: NoticeOptions): IO<void>;
    generateNotice(): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<{}, {}, {
    id: number;
    notice: Option<Notice>;
}, {
    rootZIndex(): -1 | 1;
    extractedNotice(): Notice;
}, {
    addNotice(options: NoticeOptions): IO<void>;
    showNotice(params: NoticeOptions): IO<void>;
    generateNotice(): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props?: undefined;
} & ThisType<import("vue").ComponentPublicInstance<{}, {}, {
    id: number;
    notice: Option<Notice>;
}, {
    rootZIndex(): -1 | 1;
    extractedNotice(): Notice;
}, {
    addNotice(options: NoticeOptions): IO<void>;
    showNotice(params: NoticeOptions): IO<void>;
    generateNotice(): VNode;
}, Record<string, any>, Readonly<{}>, import("vue").ComponentOptionsBase<{}, {}, {
    id: number;
    notice: Option<Notice>;
}, {
    rootZIndex(): -1 | 1;
    extractedNotice(): Notice;
}, {
    addNotice(options: NoticeOptions): IO<void>;
    showNotice(params: NoticeOptions): IO<void>;
    generateNotice(): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export declare type NoticeContainer = InstanceType<typeof BNoticeContainer>;
export default BNoticeContainer;
