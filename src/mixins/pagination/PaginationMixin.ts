import { VNode } from "vue";
import { PropValidator } from "vue/types/options";
import {applyMixins} from '../../utils/applyMixins';
import {getProxyableMixin} from '../proxyable/ProxyableMixin';

export const PaginationMixin = applyMixins(
  getProxyableMixin("value", "input", 1)
).extend({
  name: "PaginateMixin",
  props: {
    // one of items or total is required
    items: {
      type: Array,
      required: false
    } as PropValidator<unknown[] | undefined>,
    total: {
      type: Number,
      required: false
    },
    itemsPerPage: {
      type: Number as () => number,
      required: false,
      default: 25
    },
    mapper: {
      type: Function,
      required: false
    }
  },
  computed: {
    newCurrent(): number {
      return Math.max(this.internalValue as number, 1);
    },
    after(): number {
      return Math.max(
        ((this.internalValue as number) - 1) * this.itemsPerPage,
        0
      );
    },
    paginatedItems(): readonly unknown[] {
      const items = this.items
        ? this.items.slice(
            this.after,
            Math.min(this.after + this.itemsPerPage, this.numberOfItems)
          )
        : [];
      return this.mapper
        ? Object.freeze(items.map(this.mapper as any))
        : Object.freeze(items);
    },
    nextPage(): number {
      return Math.min(this.numberOfPages, (this.internalValue as number) + 1);
    },
    hasNext(): boolean {
      return this.itemsPerPage + this.after < this.numberOfItems;
    },
    previousPage(): number {
      return Math.max(0, (this.internalValue as number) - 1);
    },
    hasPrevious(): boolean {
      return this.after > 0 && this.numberOfItems > 0;
    },
    numberOfItems(): number {
      return this.items ? this.items.length : this.total ? this.total : 0;
    },
    numberOfPages(): number {
      return Math.ceil(this.numberOfItems / this.itemsPerPage);
    }
  },
  methods: {
    next(e?: MouseEvent): void {
      if (e) {
        e.preventDefault();
      }
      if (this.hasNext) {
        this.internalValue = this.nextPage;
      }
    },
    previous(e?: MouseEvent): void {
      if (e) {
        e.preventDefault();
      }
      if (this.hasPrevious) {
        this.internalValue = this.previousPage;
      }
    },
    first(): void {
      this.internalValue = 1;
    },
    last(): void {
      this.internalValue = this.numberOfPages;
    },
    updateCurrent(current: number) {
      this.internalValue = current;
    },
    renderDefaultScopedSlot(): VNode {
      return this.$scopedSlots.default!({
        itemsPerPage: this.itemsPerPage,
        current: this.internalValue,
        updateCurrent: this.updateCurrent,
        paginatedItems: this.paginatedItems,
        numberOfItems: this.numberOfItems,
        first: this.first,
        last: this.last,
        after: this.after,
        hasNext: this.hasNext,
        hasPrevious: this.hasPrevious,
        next: this.next,
        previous: this.previous
      }) as any;
    }
  }
});
