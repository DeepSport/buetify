import './table.sass';
import { BTableColumn, BTableColumnData, SortType } from './shared';
import { Option } from 'fp-ts/lib/Option';
import Vue, { PropType, VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
declare const _default: import("vue/types/vue").OptionsVue<Vue, {
    newSortColumn: Option<BTableColumnData<any>>;
    newSortType: SortType;
}, {
    onInput(label: "string"): void;
    onButtonClick(): void;
    generateBSelect(): VNode;
    generateSortDirectionButton(): VNode;
}, {
    internalSortColumn: Option<BTableColumnData<any>>;
    internalSortType: SortType;
    extractedColumnId: string | null;
    sortableColumns: BTableColumn<any>[];
}, {
    sortColumn: Option<BTableColumnData<any>>;
    sortType: SortType;
    columns: BTableColumn<any>[];
    placeholder: string | undefined;
}, {
    name: string;
    props: {
        sortColumn: {
            type: PropType<Option<BTableColumnData<any>>>;
            required: true;
        };
        sortType: {
            type: PropType<SortType>;
            required: true;
        };
        columns: {
            type: PropType<BTableColumn<any>[]>;
            required: true;
        };
        placeholder: PropValidator<string | undefined>;
    };
    data(this: import("vue/types/vue").CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<{
        sortColumn: Option<BTableColumnData<any>>;
        sortType: SortType;
        columns: BTableColumn<any>[];
        placeholder: string | undefined;
    }>>): {
        newSortColumn: Option<BTableColumnData<any>>;
        newSortType: SortType;
    };
    computed: {
        internalSortColumn: {
            get(): Option<BTableColumnData<any>>;
            set(val: Option<BTableColumnData<any>>): void;
        };
        internalSortType: {
            get(): SortType;
            set(val: SortType): void;
        };
        extractedColumnId(): string | null;
        sortableColumns(): BTableColumn<any>[];
    };
    watch: {
        sortColumn(newVal: Option<BTableColumnData<any>>): void;
        sortType(newVal: SortType, oldVal: SortType): void;
    };
    methods: {
        onInput(label: "string"): void;
        onButtonClick(): void;
        generateBSelect(): VNode;
        generateSortDirectionButton(): VNode;
    };
    render(): VNode;
}>;
export default _default;
