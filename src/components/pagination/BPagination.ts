import "./pagination.sass";
import AngleLeftIcon from "../icons/angleLeft/AngleLeftIcon";
import AngleRightIcon from "../icons/angleRight/AngleRightIcon";
import { applyMixins } from "../../utils/applyMixins";
import { PaginationMixin } from "../../mixins/pagination/PaginationMixin";
import { ThemeInjectionMixin } from "../../mixins/themeInjection/ThemeInjectionMixin";
import { range } from "fp-ts/lib/Array";
import { VNode } from "vue";
import { PropValidator } from "vue/types/options";

export type PaginationSize = "is-small" | "is-medium" | "is-large";

export type PaginationPosition = "is-centered" | "is-right";

export default applyMixins(PaginationMixin, ThemeInjectionMixin).extend({
  name: "BPagination",
  props: {
    size: {
      type: String,
      default: undefined
    } as PropValidator<PaginationSize | undefined>,
    isSimple: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: undefined
    } as PropValidator<PaginationPosition | undefined>
  },
  computed: {
    classes(): any {
      return [
        this.position,
        this.size,
        {
          "is-simple": this.isSimple,
          "is-rounded": this.isRounded
        }
      ];
    },
    firstItem(): number {
      const firstItem =
        (this.internalValue as number) * this.itemsPerPage -
        this.itemsPerPage +
        1;
      return firstItem >= 0 ? firstItem : 0;
    },
    hasFirst(): boolean {
      return (this.internalValue as number) >= 3;
    },
    hasFirstEllipsis(): boolean {
      return (this.internalValue as number) >= 5;
    },
    hasLast(): boolean {
      return (this.internalValue as number) <= this.numberOfPages - 2;
    },
    hasLastEllipsis(): boolean {
      return (this.internalValue as number) < this.numberOfPages - 3;
    },
    pages(): Page[] {
      return range(1, this.numberOfPages).map(number => ({
        number,
        isCurrent: number === this.internalValue
      }));
    },
    pagesInRange(): Page[] {
      const left =
        this.internalValue === this.numberOfPages
          ? this.numberOfPages - 3
          : Math.max(0, (this.internalValue as number) - 2); // internal value is 1 indexed
      const right = Math.min(left + 3, this.numberOfPages);
      return this.isSimple ? [] : this.pages.slice(left, right);
    },
    hasDefaultScopedSlot(): boolean {
      return !!this.$scopedSlots.default;
    }
  },
  methods: {
    generatePreviousButton(): VNode {
      return this.$createElement(
        "button",
        {
          staticClass: "pagination-previous",
          class: this.themeClasses,
          attrs: {
            disabled: !this.hasPrevious,
            "aria-label": this.getAriaLabel(this.previousPage)
          },
          on: { click: this.previous }
        },
        this.$slots.previous
          ? this.$slots.previous
          : [this.$createElement(AngleLeftIcon)]
      );
    },
    generateNextButton(): VNode {
      return this.$createElement(
        "button",
        {
          staticClass: "pagination-next",
          class: this.themeClasses,
          attrs: {
            disabled: !this.hasNext,
            "aria-label": this.getAriaLabel(this.nextPage)
          },
          on: { click: this.next }
        },
        this.$slots.next
          ? this.$slots.next
          : [this.$createElement(AngleRightIcon)]
      );
    },
    generatePaginationList(): VNode {
      const nodes: VNode[] = this.pagesInRange.map(
        this.generatePaginationListItem
      );
      if (this.hasFirstEllipsis) {
        nodes.unshift(this.generateEllipsis());
      }
      if (this.hasFirst) {
        nodes.unshift(this.generateFirstListItem());
      }
      if (this.hasLastEllipsis) {
        nodes.push(this.generateEllipsis());
      }
      if (this.hasLast) {
        nodes.push(this.generateLastListItem());
      }
      return this.$createElement(
        "ul",
        { staticClass: "pagination-list" },
        nodes
      );
    },
    generateFirstListItem(): VNode {
      return this.generatePaginationListItem({
        number: 1,
        isCurrent: this.internalValue === 1
      });
    },
    generateEllipsis(): VNode {
      return this.$createElement("li", [
        this.$createElement("span", {
          staticClass: "pagination-ellipsis",
          domProps: { innerHTML: `&hellip;` }
        })
      ]);
    },
    generatePaginationListItem(page: Page): VNode {
      return this.$createElement(
        "li",
        {
          key: page.number
        },
        [
          this.$createElement(
            "button",
            {
              staticClass: "pagination-link",
              class: [...this.themeClasses, { "is-current": page.isCurrent }],
              attrs: {
                "aria-label": this.getAriaLabel(page.number),
                "aria-current": page.isCurrent
              },
              on: {
                click: (e: MouseEvent) => {
                  e.preventDefault();
                  this.updateCurrent(page.number);
                }
              }
            },
            `${page.number}`
          )
        ]
      );
    },
    generateLastListItem(): VNode {
      return this.generatePaginationListItem({
        number: this.numberOfPages,
        isCurrent: this.internalValue === this.numberOfPages
      });
    },
    getAriaLabel(num: number): string {
      return `Go to page ${num} of ${this.numberOfPages}`;
    },
    generateSimpleSummary(): VNode {
      return this.$createElement(
        "small",
        { staticClass: "info" },
        this.itemsPerPage === 1
          ? `${this.after + 1} / ${this.numberOfItems}`
          : `${this.after + 1} - ${Math.min(
              this.after + this.itemsPerPage,
              this.numberOfItems
            )} / ${this.numberOfItems}`
      );
    },
    generatePaginationControls(): VNode {
      return this.$createElement(
        "section",
        {
          attrs: { "aria-label": "Pagination Controls" },
          staticClass: "pagination",
          class: this.classes
        },
        this.isSimple
          ? [
              this.generatePreviousButton(),
              this.generateNextButton(),
              this.generateSimpleSummary()
            ]
          : [
              this.generatePreviousButton(),
              this.generateNextButton(),
              this.generatePaginationList()
            ]
      );
    }
  },
  render(): VNode {
    return this.hasDefaultScopedSlot
      ? this.$createElement("article", [
          this.renderDefaultScopedSlot(),
          this.generatePaginationControls()
        ])
      : this.generatePaginationControls();
  }
});

interface Page {
  number: number;
  isCurrent: boolean;
}
