import './table.sass';
import BSelect from '../form/select/BSelect';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import { BTableColumn, BTableColumnData, SortType } from './shared';
import { findFirst } from 'fp-ts/lib/Array';
import { isSome, map, Option, toNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import Vue, { PropType, VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
export default Vue.extend({
  name: 'BTableMobileSort',
  props: {
    sortColumn: {
      type: Object as PropType<Option<BTableColumnData<any>>>,
      required: true
    },
    sortType: {
      type: String as PropType<SortType>,
      required: true
    },
    columns: {
      type: Array as PropType<BTableColumn[]>,
      required: true
    },
    placeholder: {
      type: String,
      default: undefined
    } as PropValidator<string | undefined>
  },
  data() {
    return {
      newSortColumn: this.sortColumn,
      newSortType: this.sortType
    };
  },
  computed: {
    internalSortColumn: {
      get(): Option<BTableColumnData<any>> {
        return this.newSortColumn;
      },
      set(val: Option<BTableColumnData<any>>) {
        if (isSome(val)) {
          this.newSortColumn = val;
          this.$emit('new-sort-column', val.value);
          this.$emit('update:sortColumn', val);
        }
      }
    },
    internalSortType: {
      get(): SortType {
        return this.newSortType;
      },
      set(val: SortType) {
        this.newSortType = val;
        this.$emit('new-sort-type', val);
        this.$emit('update:sortType', val);
      }
    },
    extractedColumnId(): string | null {
      return pipe(
        this.internalSortColumn,
        map(column => column.label),
        toNullable
      );
    },
    sortableColumns(): BTableColumn[] {
      return this.columns.filter(column => column.isSortable);
    }
  },
  watch: {
    sortColumn(newVal: Option<BTableColumnData<any>>) {
      this.newSortColumn = newVal;
    },
    sortType(newVal: SortType, oldVal: SortType) {
      if (newVal !== oldVal) {
        this.newSortType = newVal;
      }
    }
  },
  methods: {
    onInput(label: 'string'): void {
      this.internalSortColumn = pipe(
        this.sortableColumns,
        findFirst(column => column.label === label)
      );
    },
    onButtonClick(): void {
      this.internalSortType = this.internalSortType === 'Ascending' ? 'Descending' : 'Ascending';
    },
    generateBSelect(): VNode {
      return this.$createElement(BSelect, {
        props: {
          placeholder: this.placeholder,
          items: this.sortableColumns,
          itemKey: 'label',
          itemValue: 'label',
          itemText: 'label',
          value: this.extractedColumnId,
          isExpanded: true
        },
        on: {
          input: this.onInput
        }
      });
    },
    generateSortDirectionButton(): VNode {
      return this.$createElement('div', { staticClass: 'control' }, [
        this.$createElement(
          'button',
          {
            staticClass: 'button is-primary',
            on: { click: this.onButtonClick }
          },
          [
            this.$createElement(VerticalExpansionIcon, {
              props: {
                isExpanded: this.internalSortType === 'Descending',
                size: 'is-small'
              }
            })
          ]
        )
      ]);
    }
  },
  render(): VNode {
    return this.$createElement(
      'section',
      {
        staticClass: 'field table-mobile-sort',
        attrs: { 'aria-label': 'Table Sort Controls' }
      },
      [
        this.$createElement('div', { staticClass: 'field has-addons' }, [
          this.generateBSelect(),
          this.generateSortDirectionButton()
        ])
      ]
    );
  }
});
