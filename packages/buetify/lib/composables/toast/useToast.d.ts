import { Slots } from 'vue';
import { UseNoticeProps } from '../noticeController';
export declare function useToast(props?: UseNoticeProps, slots?: Slots): {
    open: (options: import("../noticeController").OpenNoticeOptions) => void;
    close: () => void;
};
