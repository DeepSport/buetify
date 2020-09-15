import { extractPaginationState, usePagination, UsePaginationPropsDefinition } from '../../../composables/pagination';
import { defineComponent } from 'vue';

export const PaginationState = defineComponent({
  name: 'pagination-state',
  props: UsePaginationPropsDefinition,
  setup(props, { slots }) {
    const pagination = usePagination(props);
    return () => slots.default && slots.default(extractPaginationState(pagination));
  }
});
