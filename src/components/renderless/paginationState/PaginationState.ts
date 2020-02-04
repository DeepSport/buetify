import { applyMixins } from "../../../utils/applyMixins";
import { PaginationMixin } from "../../../mixins/pagination/PaginationMixin";
import { VNode } from "vue";

export const PaginationState = applyMixins(PaginationMixin).extend({
  name: "PaginateState",
  render(): VNode {
    return this.renderDefaultScopedSlot();
  }
});
