import { computed } from 'vue';
import { getUseModelPropsDefinition, useModel } from '../model';
export const UsePaginationPropsDefinition = Object.assign(Object.assign({}, getUseModelPropsDefinition()), {
  modelValue: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    default: 25
  }
});
export function usePagination(props) {
  const model = useModel(props);
  const current = computed(() => Math.max(model.modelValue.value, 1));
  const numberOfPages = computed(() => Math.ceil(props.total / props.perPage));
  const after = computed(() => Math.max((model.modelValue.value - 1) * props.perPage, 0));
  const nextPage = computed(() => Math.min(numberOfPages.value, model.modelValue.value + 1));
  const hasNext = computed(() => props.perPage + after.value < props.total);
  const previousPage = computed(() => Math.max(0, model.modelValue.value - 1));
  const hasPrevious = computed(() => after.value > 0 && props.total > 0);

  function next(e) {
    e.preventDefault();

    if (hasNext.value) {
      model.set(nextPage.value);
    }
  }

  function previous(e) {
    e.preventDefault();

    if (hasPrevious.value) {
      model.set(previousPage.value);
    }
  }

  function first() {
    model.set(1);
  }

  function last() {
    model.set(numberOfPages.value);
  }

  function set(num) {
    if (num >= 1 && num <= numberOfPages.value) {
      model.set(num);
    }
  }

  return {
    current,
    numberOfPages,
    after,
    nextPage,
    hasNext,
    previousPage,
    hasPrevious,
    next,
    previous,
    first,
    last,
    set
  };
}
export function extractPaginationState(pagination) {
  return {
    current: pagination.current.value,
    numberOfPages: pagination.numberOfPages.value,
    after: pagination.after.value,
    nextPage: pagination.nextPage.value,
    hasNext: pagination.hasNext.value,
    previousPage: pagination.previousPage.value,
    hasPrevious: pagination.hasPrevious.value,
    next: pagination.next,
    previous: pagination.previous,
    first: pagination.first,
    last: pagination.last,
    set: pagination.set
  };
}
//# sourceMappingURL=usePagination.js.map