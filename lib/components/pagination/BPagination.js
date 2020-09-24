import "../../../src/components/pagination/pagination.sass";
import { extractPaginationState, usePagination, UsePaginationPropsDefinition } from '../../composables/pagination';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import AngleLeftIcon from '../icons/angleLeft/AngleLeftIcon';
import AngleRightIcon from '../icons/angleRight/AngleRightIcon';
import { range } from 'fp-ts/lib/Array';
import { defineComponent, h } from 'vue';
export const BPaginationPropsDefinition = Object.assign(Object.assign(Object.assign({}, UsePaginationPropsDefinition), DefaultThemePropsDefinition), {
  size: {
    type: String,
    default: ''
  },
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
    default: ''
  }
});

function getAriaLabel(num, total) {
  return `Go to page ${num} of ${total}`;
}

const ellipsis = h('li', [h('span', {
  class: 'pagination-ellipsis',
  innerHTML: `&hellip;`
})]);

function generatePreviousButton(context, pagination, themeClasses) {
  return h('button', {
    class: ['pagination-previous', ...themeClasses],
    disabled: pagination.hasPrevious.value,
    'aria-label': getAriaLabel(pagination.previousPage.value, pagination.numberOfPages.value),
    onClick: pagination.previous
  }, context.slots.previous ? context.slots.previous() : h(AngleLeftIcon));
}

function generateNextButton(context, pagination, themeClasses) {
  return h('button', {
    class: ['pagination-next', ...themeClasses],
    disabled: pagination.hasNext.value,
    'aria-label': getAriaLabel(pagination.nextPage.value, pagination.numberOfPages.value),
    onClick: pagination.next
  }, context.slots.next ? context.slots.next() : h(AngleRightIcon));
}

function getGeneratePaginationListItem(pagination, themeClasses) {
  return page => h('li', {
    key: page.number
  }, [h('button', {
    class: ['pagination-link', ...themeClasses, {
      'is-current': page.isCurrent
    }],
    'aria-label': getAriaLabel(page.number, pagination.numberOfPages.value),
    'aria-current': page.isCurrent,
    onClick: e => {
      e.preventDefault();
      pagination.set(page.number);
    }
  }, `${page.number}`)]);
}

function getPageRange(props, pagination) {
  if (props.isSimple) {
    return [];
  } else {
    const currentValue = pagination.current.value;
    const numberOfPages = pagination.numberOfPages.value;
    const left = currentValue === numberOfPages ? numberOfPages - 3 : Math.max(0, currentValue - 2); // internal value is 1 indexed

    const right = Math.min(left + 3, numberOfPages);
    return range(1, numberOfPages).map(number => ({
      number,
      isCurrent: number === currentValue
    })).slice(left, right);
  }
}

function generatePaginationList(props, pagination, themeClasses) {
  const generatePaginationListItem = getGeneratePaginationListItem(pagination, themeClasses);
  const currentValue = pagination.current.value;
  const numberOfPages = pagination.numberOfPages.value;
  const nodes = getPageRange(props, pagination).map(generatePaginationListItem);

  if (currentValue >= 5) {
    nodes.unshift(ellipsis);
  }

  if (currentValue >= 3) {
    nodes.unshift(generatePaginationListItem({
      number: 1,
      isCurrent: currentValue === 1
    }));
  }

  if (currentValue < numberOfPages - 3) {
    nodes.push(ellipsis);
  }

  if (currentValue <= numberOfPages - 2) {
    nodes.push(generatePaginationListItem({
      number: numberOfPages,
      isCurrent: currentValue === numberOfPages
    }));
  }

  return h('ul', {
    class: 'pagination-list'
  }, nodes);
}

function generateSimpleSummary(props, pagination) {
  return h('small', {
    class: 'info'
  }, props.perPage === 1 ? `${pagination.after.value + 1} / ${props.total}` : `${pagination.after.value + 1} - ${Math.min(pagination.after.value + props.perPage, props.total)} / ${props.total}`);
}

function generatePaginationControls(props, context, pagination, themeClasses) {
  return h('section', {
    'aria-label': 'Pagination Controls',
    class: ['pagination', props.position, props.size, {
      'is-simple': props.isSimple,
      'is-rounded': props.isRounded
    }]
  }, props.isSimple ? [generatePreviousButton(context, pagination, themeClasses), generateNextButton(context, pagination, themeClasses), generateSimpleSummary(props, pagination)] : [generatePreviousButton(context, pagination, themeClasses), generateNextButton(context, pagination, themeClasses), generatePaginationList(props, pagination, themeClasses)]);
}

export default defineComponent({
  name: 'b-pagination',
  props: BPaginationPropsDefinition,

  setup(props, context) {
    const pagination = usePagination(props);
    const {
      themeClasses
    } = useTheme(props);
    return () => {
      return context.slots.default ? h('article', [context.slots.default(extractPaginationState(pagination)), generatePaginationControls(props, context, pagination, themeClasses.value)]) : [generatePaginationControls(props, context, pagination, themeClasses.value)];
    };
  }

});
//# sourceMappingURL=BPagination.js.map