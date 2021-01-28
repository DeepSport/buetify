import '../sass/form.sass';
import '../../dropdown/dropdown.sass';
import './autocomplete.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import { StaticUseInputProps } from '../../../composables/input/useInput';
import { getUseModelPropsDefinition } from '../../../composables/model/useModel';
import { useProxy } from '../../../composables/proxy';
import { getEqPropsDefinition } from '../../../composables/shared';
import { useThemePropsDefinition } from '../../../composables/theme';
import {
  constEmptyArray,
  Extractor,
  extractProp,
  isFunction,
  isHTMLElement,
  isObject,
  isString,
  toggleListItem
} from '../../../utils/helpers';
import { DropdownThemeMap } from '../../dropdown';
import BDropdown from '../../dropdown/BDropdown';
import { isArrowDownEvent, isArrowUpEvent, isEnterEvent, isEscEvent, isTabEvent } from '../../../utils/eventHelpers';
import { constant, constVoid, FunctionN, Predicate } from 'fp-ts/lib/function';
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
  onBeforeUpdate,
  nextTick,
  toRef,
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

function getActiveDescendentId<T>(
  selectedItems: T[],
  itemId: keyof T | ((item: T) => string) | string
): string | undefined {
  return pipe(
    selectedItems,
    head,
    chain(item => {
      if (isString(item) && isFunction(itemId)) {
        const id = extractProp(itemId, item);
        return isString(id) ? some(id) : none;
      }
      if (isString(item)) {
        return some(item);
      }
      if (isString(itemId) && isObject(item) && Object.hasOwnProperty.call(item, itemId as string)) {
        const id = item[itemId as keyof T];
        return isString(id) ? some(id) : none;
      }
      const id = extractProp(itemId as Extractor<T>, item);
      return isString(id) ? some(id) : (none as Option<string>);
    }),
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
  return items.map((item, index) => {
    const id = extractProp(itemId, item);
    const nid = isString(id) ? id : String(id);
    const text = extractProp(itemText, item);
    return {
      id: nid,
      isSelected: selectedItems.some(i => eq.equals(i, item)),
      isHovered: isSome(hoveredItem) ? hoveredItem.value.id === nid : false,
      text: isString(text) ? text : String(text),
      value: item,
      index
    };
  });
}

interface GetSetSelectedProps<T> {
  eq: Eq<T>;
  itemText: Extractor<T>;
  clearOnSelect: boolean;
  closeOnSelect: boolean;
}

function getSetSelected<T>(
  props: GetSetSelectedProps<T>,
  closeDropdown: IO<void>,
  inputModel: Ref<string>,
  selectedItemsModel: Ref<T[]>
): SetSelected<T> {
  const toggle = toggleListItem(props.eq);
  return (item: AutocompleteItem<T>) => {
    const text = extractProp(props.itemText, item.value);
    inputModel.value = props.clearOnSelect ? '' : isString(text) ? text : String(text);
    selectedItemsModel.value = toggle(item.value, selectedItemsModel.value || []);
    if (props.closeOnSelect) {
      closeDropdown();
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
        fold(constant(constVoid), li => () => li.focus && li.focus())
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
        ref: (el: unknown) => {
          if (isHTMLElement(el)) {
            itemsRef.value[index] = el;
          }
        },
        id: item.id,
        isActive: item.isSelected,
        tabindex: item.isSelected ? -1 : 0,
        'aria-selected': item.isSelected,
        'aria-label': `Option ${index + 1} of ${length.value}`,
        class: { 'is-hovered': item.isHovered },
        onClick: () => setSelected(item),
        onMouseenter: () => setHovered(item),
        onKeydown
      },
      () => (slots.default ? slots.default({ option: item, index }) : item.text)
    );
  };
}

function generateHeaderItem(slots: Slots): VNode {
  return h('li', { class: 'dropdown-item', tabindex: -1 }, slots.header && slots.header());
}

function generateFooterItem(slots: Slots): VNode {
  return h('li', { class: 'dropdown-item', tabindex: -1 }, slots.footer && slots.footer());
}

function generateLoadingItem(slots: Slots): VNode {
  return h('li', { tabindex: -1 }, [
    h(BDropdownItem, { tag: 'div' }, () => (slots.loading ? slots.loading() : 'Loading results...'))
  ]);
}

function generateEmptyItem(modelValue: string | undefined, slots: Slots) {
  return h(
    BDropdownItem,
    {
      class: 'is-disabled'
    },
    () =>
      slots.empty
        ? slots.empty({ searchValue: modelValue })
        : modelValue
        ? `No results`
        : `No results for ${modelValue}`
  );
}

function defineAutocomplete<T>() {
  return defineComponent({
    name: 'b-autocomplete',
    props: {
      ...StaticUseInputProps,
      ...getEqPropsDefinition<T>(),
      ...useThemePropsDefinition(DropdownThemeMap),
      ...getUseModelPropsDefinition<string>(),
      ...getUseModelPropsDefinition<T[], 'selectedItems', 'onUpdate:selectedItems'>(
        'selectedItems',
        'onUpdate:selectedItems'
      ),
      selectedItems: {
        type: Array as PropType<T[]>,
        required: true as const
      },
      items: {
        type: Array as PropType<T[]>,
        default: constEmptyArray
      },
      itemFilter: {
        type: Function as PropType<FunctionN<[string], Predicate<T>>>,
        required: false
      },
      itemId: {
        type: [String, Function] as PropType<Extractor<T>>,
        default: 'id'
      },
      itemText: {
        type: [String, Function] as PropType<Extractor<T>>,
        default: 'text'
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
        required: false
      }
    },
    setup(props, { slots }) {
      const { value: searchValue } = useProxy(
        computed(() => props.modelValue ?? ''),
        toRef(props, 'onUpdate:modelValue')
      );
      const { value: selectedItems } = useProxy(toRef(props, 'selectedItems') as Ref<T[]>, toRef(props, 'onUpdate:selectedItems'));

      const itemsRef = shallowRef([] as HTMLElement[]);
      const filteredItems = computed(() => {
        if (props.itemFilter) {
          return props.items.filter(props.itemFilter(searchValue.value));
        } else {
          const sv = searchValue.value.toLowerCase();
          const extract = props.itemText;
          return props.items.filter(i =>
            ((extractProp(extract as Extractor<T>, i) as unknown) as string).toLowerCase().includes(sv)
          );
        }
      });
      onBeforeUpdate(() => {
        itemsRef.value = [];
      });
      const dropdown: Ref<InstanceType<typeof BDropdown> | null> = shallowRef(null);
      function close() {
        dropdown.value && dropdown.value.toggle.setOff();
      }
      const hoveredItem = shallowRef(none as Option<AutocompleteItem<T>>);
      const activeDescendentId = computed(() =>
        getActiveDescendentId(props.selectedItems, props.itemId as Extractor<T>)
      );
      const autocompleteItems = computed(() =>
        getAutocompleteItems(
          filteredItems.value,
          selectedItems.value,
          props.itemId as Extractor<T>,
          props.itemText as Extractor<T>,
          props.eq,
          hoveredItem.value
        )
      );
      const numberOfItems = computed(() => autocompleteItems.value.length);
      const setSelected = getSetSelected(props as GetSetSelectedProps<T>, close, searchValue, selectedItems);
      const setHovered = getSetHovered(hoveredItem, itemsRef);
      const onKeydown = getOnKeydown(autocompleteItems, hoveredItem, close, setSelected, setHovered);
      const generateItem = getGenerateItem(itemsRef, numberOfItems, onKeydown, setSelected, setHovered, slots);
      return () => {
        return h(
          BDropdown,
          {
            ref: dropdown,
            isMobileModal: false,
            class: ['b-autocomplete', { 'is-expanded': props.isExpanded }]
          },
          {
            trigger: () => {
              return h(BInput, {
                modelValue: searchValue.value,
                type: 'text',
                size: props.size,
                isLoading: props.isLoading,
                isRounded: props.isRounded,
                icon: props.icon,
                maxlength: props.maxlength,
                autocomplete: 'off',
                placeholder: props.placeholder,
                role: 'searchbox',
                'aria-activedescendant': activeDescendentId.value,
                'onUpdate:modelValue': (val: string) => {
                  searchValue.value = val;
                },
                // onFocus: () => {
                //   nextTick().then(() => {
                //     if (props.openOnFocus && toggle.isOff.value) {
                //       toggle.setOn();
                //     }
                //   });
                // },
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
                  ? [generateEmptyItem(searchValue.value, slots)]
                  : autocompleteItems.value.map(generateItem);
                if (slots.header) {
                  nodes.unshift(generateHeaderItem(slots), h(BDropdownDivider));
                }
                if (slots.footer) {
                  nodes.push(h(BDropdownDivider), generateFooterItem(slots));
                }
              }
              return nodes;
            }
          }
        );
      };
    }
  });
}

export const BAutocomplete = defineAutocomplete<unknown>();
