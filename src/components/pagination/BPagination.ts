import './pagination.sass';
import {
  extractPaginationState,
  Pagination,
  usePagination,
  UsePaginationPropsDefinition
} from '../../composables/pagination';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import AngleLeftIcon from '../icons/angleLeft/AngleLeftIcon';
import AngleRightIcon from '../icons/angleRight/AngleRightIcon';
import { range } from 'fp-ts/lib/Array';
import { VNode, PropType, defineComponent, ExtractPropTypes, h, SetupContext } from 'vue';

export type PaginationSize = 'is-small' | 'is-medium' | 'is-large' | '';

export type PaginationPosition = 'is-centered' | 'is-right' | '';

export const BPaginationPropsDefinition = {
  ...UsePaginationPropsDefinition,
  ...DefaultThemePropsDefinition,
  size: {
    type: String as PropType<PaginationSize>,
    default: '' as const
  },
  isSimple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isRounded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  position: {
    type: String as PropType<PaginationPosition>,
    default: '' as const
  }
};

export type BPaginationProps = ExtractPropTypes<typeof BPaginationPropsDefinition>;

function getAriaLabel(num: number, total: number): string {
  return `Go to page ${num} of ${total}`;
}

const ellipsis = h('li', [
  h('span', {
    class: 'pagination-ellipsis',
    innerHTML: `&hellip;`
  })
]);

function generatePreviousButton(context: SetupContext, pagination: Pagination, themeClasses: string[]): VNode {
  return h(
    'button',
    {
      class: ['pagination-previous', ...themeClasses],
      disabled: pagination.hasPrevious.value,
      'aria-label': getAriaLabel(pagination.previousPage.value, pagination.numberOfPages.value),
      onClick: pagination.previous
    },
    context.slots.previous ? context.slots.previous() : h(AngleLeftIcon)
  );
}

function generateNextButton(context: SetupContext, pagination: Pagination, themeClasses: string[]): VNode {
  return h(
    'button',
    {
      class: ['pagination-next', ...themeClasses],
      disabled: pagination.hasNext.value,
      'aria-label': getAriaLabel(pagination.nextPage.value, pagination.numberOfPages.value),
      onClick: pagination.next
    },
    context.slots.next ? context.slots.next() : h(AngleRightIcon)
  );
}

function getGeneratePaginationListItem(pagination: Pagination, themeClasses: string[]) {
  return (page: Page) =>
    h(
      'li',
      {
        key: page.number
      },
      [
        h(
          'button',
          {
            class: ['pagination-link', ...themeClasses, { 'is-current': page.isCurrent }],
            'aria-label': getAriaLabel(page.number, pagination.numberOfPages.value),
            'aria-current': page.isCurrent,
            onClick: (e: MouseEvent) => {
              e.preventDefault();
              pagination.set(page.number);
            }
          },
          `${page.number}`
        )
      ]
    );
}

function getPageRange(props: BPaginationProps, pagination: Pagination): Page[] {
  if (props.isSimple) {
    return [];
  } else {
    const currentValue = pagination.current.value;
    const numberOfPages = pagination.numberOfPages.value;
    const left = currentValue === numberOfPages ? numberOfPages - 3 : Math.max(0, (currentValue as number) - 2); // internal value is 1 indexed
    const right = Math.min(left + 3, numberOfPages);
    return range(1, numberOfPages)
      .map(number => ({
        number,
        isCurrent: number === currentValue
      }))
      .slice(left, right);
  }
}

function generatePaginationList(props: BPaginationProps, pagination: Pagination, themeClasses: string[]): VNode {
  const generatePaginationListItem = getGeneratePaginationListItem(pagination, themeClasses);
  const currentValue = pagination.current.value;
  const numberOfPages = pagination.numberOfPages.value;
  const nodes: VNode[] = getPageRange(props, pagination).map(generatePaginationListItem);
  if (currentValue >= 5) {
    nodes.unshift(ellipsis);
  }
  if (currentValue >= 3) {
    nodes.unshift(generatePaginationListItem({ number: 1, isCurrent: currentValue === 1 }));
  }
  if (currentValue < numberOfPages - 3) {
    nodes.push(ellipsis);
  }
  if (currentValue <= numberOfPages - 2) {
    nodes.push(generatePaginationListItem({ number: numberOfPages, isCurrent: currentValue === numberOfPages }));
  }
  return h('ul', { class: 'pagination-list' }, nodes);
}

function generateSimpleSummary(props: BPaginationProps, pagination: Pagination): VNode {
  return h(
    'small',
    { class: 'info' },
    props.perPage === 1
      ? `${pagination.after.value + 1} / ${props.total}`
      : `${pagination.after.value + 1} - ${Math.min(
          pagination.after.value + props.perPage,
          props.total || 0
        )} / ${props.total || 0}`
  );
}

function generatePaginationControls(
  props: BPaginationProps,
  context: SetupContext,
  pagination: Pagination,
  themeClasses: string[]
): VNode {
  return h(
    'section',
    {
      'aria-label': 'Pagination Controls',
      class: ['pagination', props.position, props.size, { 'is-simple': props.isSimple, 'is-rounded': props.isRounded }]
    },
    props.isSimple
      ? [
          generatePreviousButton(context, pagination, themeClasses),
          generateNextButton(context, pagination, themeClasses),
          generateSimpleSummary(props, pagination)
        ]
      : [
          generatePreviousButton(context, pagination, themeClasses),
          generateNextButton(context, pagination, themeClasses),
          generatePaginationList(props, pagination, themeClasses)
        ]
  );
}

interface Page {
  number: number;
  isCurrent: boolean;
}

export default defineComponent({
  name: 'b-pagination',
  props: BPaginationPropsDefinition,
  setup(props, context) {
    const pagination = usePagination(props);
    const { themeClasses } = useTheme(props);
    return () => {
      return context.slots.default
        ? h('article', [
            context.slots.default(extractPaginationState(pagination)),
            generatePaginationControls(props, context, pagination, themeClasses.value)
          ])
        : [generatePaginationControls(props, context, pagination, themeClasses.value)];
    };
  }
});
