import './autocomplete.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { useModel } from '../../../composables/model';
import { getEqPropsDefinition } from '../../../composables/shared';
import { getUseThemePropsDefinition } from '../../../composables/theme';
import { alwaysEmptyArray } from '../../../utils/helpers';
import { DropdownThemeMap } from '../../dropdown';
import BDropdown from '../../dropdown/BDropdown';
import { isArrowDownEvent, isArrowUpEvent, isEnterEvent, isEscEvent, isTabEvent } from '../../../utils/eventHelpers';
import { extractProp } from '../../../mixins/extractProp/ExtractPropMixin';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import BDropdownDivider from '../../dropdown/BDropdownDivider';
import BDropdownItem from '../../dropdown/BDropdownItem';
import { head, isEmpty, lookup } from 'fp-ts/lib/Array';
import { alt, chain, fold, fromNullable, isSome, map, none, Option, some, toUndefined } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  defineComponent,
  PropType,
  VNode,
  Ref,
  shallowRef,
  computed,
  shallowReactive,
  onBeforeUpdate,
  nextTick,
  Slots,
  h
} from 'vue';

import { BInput } from '../input';

export interface AutocompleteItem<T> {
  id: string;
  isSelected: boolean;
  isHovered: boolean;
  text: string;
  value: T;
  index: number;
}

function getActiveDescendentId<T>(selectedItems: T[], itemId: keyof T | ((item: T) => string)): string | undefined {
  return pipe(
    selectedItems,
    head,
    map(item => extractProp(itemId as any, item) as any),
    toUndefined
  );
}

function getAutocompleteItems<T>(
  items: T[],
  selectedItems: T[],
  itemId: keyof T | ((item: T) => string),
  itemText: keyof T | ((item: T) => string),
  eq: Eq<T>,
  hoveredItem: Option<AutocompleteItem<T>>
): AutocompleteItem<T>[] {
  return items.map((item, index) => ({
    id: extractProp(itemId as any, item) as any,
    isSelected: selectedItems.some(i => eq.equals(i, item)),
    isHovered: isSome(hoveredItem) ? hoveredItem.value.id === (extractProp(itemId as any, item) as any) : false,
    text: extractProp(itemText as any, item) as any,
    value: item,
    index
  }));
}

interface GetSetSelectedProps<T> {
  onSelected: FunctionN<[T], void>;
  itemText: any;
  clearOnSelect: boolean;
  closeOnSelect: boolean;
}

function getSetSelected<T>(
  props: GetSetSelectedProps<T>,
  closeDropdown: IO<void>,
  inputValue: Ref<string | undefined>
): SetSelected<T> {
  return (item: AutocompleteItem<T>) => {
    if (!item.isSelected) {
      inputValue.value = props.clearOnSelect ? '' : (extractProp(props.itemText, item.value) as any);
      if (props.closeOnSelect) {
        nextTick(closeDropdown);
      }
    }
  };
}

interface SetSelected<T> {
  (item: AutocompleteItem<T>): void;
}

function getSetHovered<T>(
  hoveredItem: Ref<Option<AutocompleteItem<T>>>,
  templateItems: Ref<HTMLElement[]>
): SetHovered<T> {
  return (item: AutocompleteItem<T> | undefined) => {
    const newItem = fromNullable(item);
    if (isSome(newItem)) {
      hoveredItem.value = newItem;
      pipe(
        newItem,
        map(item => item.index),
        chain(index => lookup(index, templateItems.value)),
        fold(constant(constVoid), li => () => li.focus())
      )();
    }
  };
}

interface SetHovered<T> {
  (item?: AutocompleteItem<T> | undefined): void;
}

function getOnKeydown<T>(
  autocompleteItems: Ref<AutocompleteItem<T>[]>,
  hoveredItem: Ref<Option<AutocompleteItem<T>>>,
  closeDropdown: IO<void>,
  setSelected: FunctionN<[AutocompleteItem<T>], void>,
  setHovered: FunctionN<[AutocompleteItem<T>], void>
) {
  function onArrowPress(isUp: boolean) {
    pipe(
      hoveredItem.value,
      map(item => item.index),
      alt(() => some(0)),
      chain(index =>
        lookup(
          isUp ? Math.max(index - 1, 0) : Math.min(index + 1, autocompleteItems.value.length - 1),
          autocompleteItems.value as AutocompleteItem<T>[]
        )
      ),
      fold(constant(constVoid), newItem => () => setHovered(newItem))
    )();
  }
  return function onKeydown(event: KeyboardEvent) {
    if (isEnterEvent(event)) {
      event.preventDefault();
      if (isSome(hoveredItem.value)) {
        setSelected(hoveredItem.value.value);
      }
    } else if (isTabEvent(event)) {
      event.preventDefault();
      if (isSome(hoveredItem.value)) {
        setSelected(hoveredItem.value.value);
      } else {
        nextTick(closeDropdown);
      }
    } else if (isArrowUpEvent(event)) {
      event.preventDefault();
      onArrowPress(true);
    } else if (isArrowDownEvent(event)) {
      event.preventDefault();
      onArrowPress(false);
    } else if (isEscEvent(event)) {
      event.preventDefault();
      nextTick(closeDropdown);
    }
  };
}

type OnKeydown = ReturnType<typeof getOnKeydown>;

function getGenerateItem<T>(
  itemsRef: Ref<HTMLElement[]>,
  length: Ref<number>,
  onKeydown: OnKeydown,
  setSelected: SetSelected<T>,
  setHovered: SetHovered<T>,
  slots: Slots
) {
  return function generateItem(item: AutocompleteItem<T>, index: number): VNode {
    return h(
      BDropdownItem,
      {
        key: item.id,
        ref: (el: any) => {
          itemsRef.value[index] = el;
        },
        id: item.id,
        isActive: item.isSelected,
        'aria-selected': item.isSelected,
        'aria-label': `Option ${index + 1} of ${length.value}`,
        class: { 'is-hovered': item.isHovered },
        onClick: () => setSelected(item),
        onMouseenter: () => setHovered(item),
        onKeydown
      },
      slots.default ? slots.default({ option: item, index }) : item.text
    );
  };
}

function generateHeaderItem(slots: Slots): VNode {
  return h('li', { tabindex: -1 }, [h(BDropdownItem, { tag: 'div' }, slots.header!())]);
}

function generateLoadingItem(slots: Slots): VNode {
  return h('li', { tabindex: -1 }, [
    h(BDropdownItem, { tag: 'div' }, slots.loading ? slots.loading() : 'Loading results...')
  ]);
}

function generateEmptyItem(modelValue: string | undefined, slots: Slots) {
  return h(
    BDropdownItem,
    {
      class: 'is-disabled'
    },
    slots.empty ? slots.empty() : modelValue ? `No results` : `No results for ${modelValue}`
  );
}

function defineAutocomplete<T>() {
  defineComponent({
    name: 'b-autocomplete',
    props: {
      ...getUseInputPropsDefinition<string>(),
      ...getEqPropsDefinition<T>(),
      ...getUseThemePropsDefinition(DropdownThemeMap),
      items: {
        type: Array as PropType<T[]>,
        default: alwaysEmptyArray
      },
      selectedItems: {
        type: Array as PropType<T[]>,
        default: alwaysEmptyArray
      },
      itemId: {
        type: [String, Function] as PropType<keyof T | ((item: T) => string)>,
        default: 'id'
      },
      itemText: {
        type: [String, Function] as PropType<keyof T | ((item: T) => string)>,
        default: 'text'
      },
      onSelect: {
        type: Function as PropType<FunctionN<[T], void>>,
        required: true
      },
      closeOnSelect: {
        type: Boolean as PropType<boolean>,
        default: true
      },
      clearOnSelect: {
        type: Boolean as PropType<boolean>,
        default: true
      },
      openOnFocus: {
        type: Boolean as PropType<boolean>,
        default: true
      },
      onSelected: {
        type: Function as PropType<FunctionN<[T], void>>,
        required: true
      }
    },
    setup(props, { slots }) {
      const model = useModel(props);
      const itemsRef = shallowRef([] as HTMLElement[]);
      onBeforeUpdate(() => (itemsRef.value = []));
      const dropdownProps = shallowReactive({ isExpanded: false, hasPopup: true });
      function open() {
        dropdownProps.isExpanded = true;
      }
      function close() {
        dropdownProps.isExpanded = false;
      }
      const hoveredItem = shallowRef(none as Option<AutocompleteItem<T>>);
      const activeDescendentId = computed(() => getActiveDescendentId(props.selectedItems, props.itemId as any));
      const autocompleteItems = computed(() =>
        getAutocompleteItems(
          props.items,
          props.selectedItems,
          props.itemId as any,
          props.itemText as any,
          props.eq,
          hoveredItem.value
        )
      );
      const numberOfItems = computed(() => autocompleteItems.value.length);
      const setSelected = getSetSelected(props, close, model.value);
      const setHovered = getSetHovered(hoveredItem, itemsRef);
      const onKeydown = getOnKeydown(autocompleteItems, hoveredItem, close, setSelected, setHovered);
      const generateItem = getGenerateItem(itemsRef, numberOfItems, onKeydown, setSelected, setHovered, slots);
      return () => {
        return h(BDropdown, {
          isMobileModal: false,
          class: ['b-autocomplete', { 'is-expanded': props.isExpanded }],
          slots: {
            trigger: () => {
              return h(BInput, {
                value: model.value.value,
                type: 'text',
                size: props.size,
                isLoading: props.isLoading,
                isRounded: props.isRounded,
                icon: props.icon,
                maxlength: props.maxlength,
                autocomplete: props.autocomplete || 'list',
                placeholder: props.placeholder,
                role: 'searchbox',
                'aria-activedescendant': activeDescendentId.value,
                onInput: model.onInput,
                onFocus: open,
                onBlur: props.onBlur,
                onKeydown
              });
            },
            default: () => {
              let nodes: VNode[];
              if (props.isLoading) {
                nodes = [generateLoadingItem(slots)];
              } else {
                nodes = isEmpty(autocompleteItems.value)
                  ? [generateEmptyItem(model.value.value, slots)]
                  : autocompleteItems.value.map(generateItem);
                if (slots.header) {
                  nodes.unshift(generateHeaderItem(slots), h(BDropdownDivider));
                }
              }
              return nodes;
            }
          }
        });
      };
    }
  });
}

export const BAutocomplete = defineAutocomplete<any>();
