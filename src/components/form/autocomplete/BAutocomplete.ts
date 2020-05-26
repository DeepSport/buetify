import './autocomplete.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import { getUseInputPropsDefinition, useInput } from '../../../composables/input/useInput';
import { getEqPropsDefinition } from '../../../composables/shared';
import { getUseThemePropsDefinition, useTheme } from '../../../composables/theme';
import { UseToggleProps } from '../../../composables/toggle';
import { alwaysEmptyArray } from '../../../utils/helpers';
import { DropdownThemeMap } from '../../dropdown';
import BDropdown from '../../dropdown/BDropdown';
import { isArrowDownEvent, isArrowUpEvent, isEnterEvent, isEscEvent, isTabEvent } from '../../../utils/eventHelpers';
import { extractProp, ExtractPropMixin } from '../../../mixins/extractProp/ExtractPropMixin';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import BDropdownDivider from '../../dropdown/BDropdownDivider';
import BDropdownItem from '../../dropdown/BDropdownItem';
import { InputMixin } from '../../../mixins/input/InputMixin';
import { EqMixin } from '../../../mixins/eq/EqMixin';
import { applyMixins, ExtractVue } from '../../../utils/applyMixins';
import { head, isEmpty, lookup } from 'fp-ts/lib/Array';
import { alt, chain, fold, fromNullable, isSome, map, none, Option, some, toUndefined } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, PropType, VNode, Ref, shallowRef, computed, shallowReactive, onBeforeUpdate, nextTick } from 'vue';
import { DROPDOWN_THEME_MIXIN } from '../../dropdown/shared';
import BInput from '../input';

export interface AutocompleteItem<T> {
  id: string;
  isSelected: boolean;
  isHovered: boolean;
  text: string;
  value: T;
  index: number;
}

function getActiveDescendentId<T>(selectedItems: T[], itemId: string | ((item: T) => string)): string | undefined {
  return pipe(
    selectedItems,
    head,
    map(item => extractProp(itemId as any, item) as any),
    toUndefined
  )
}

function getAutocompleteItems<T>(items: T[], selectedItems: T[], itemId: string | ((item: T) => string), itemText: string | ((item: T) => string), eq: Eq<T>, hoveredItem: Option<AutocompleteItem<T>>) {
  return Object.freeze(
    items.map((item, index) => ({
      id: extractProp(itemId as any, item),
      isSelected: selectedItems.some(i => eq.equals(i, item)),
      isHovered: isSome(hoveredItem)
        ? hoveredItem.value.id === (extractProp(itemId as any, item) as any)
        : false,
      text: extractProp(itemText as any, item),
      value: item,
      index
    }))
  )
}

interface GetSetSelectedProps<T> {
  onSelected: FunctionN<[T], void>;
  itemText: keyof T | ((item: T) => string);
  clearOnSelect: boolean;
  closeOnSelect: boolean;
}

function getSetSelected<T>(props: GetSetSelectedProps<T>, closeDropdown: IO<void>, inputValue: Ref<string>) {
  return (item: AutocompleteItem<T>) => {
    if (!item.isSelected) {
      inputValue.value = props.clearOnSelect ? '' : extractProp(props.itemText, item.value) as any;
      if (props.closeOnSelect) {
        nextTick(closeDropdown);
      }
    }
  }
}

function getSetHovered<T>(hoveredItem: Ref<Option<AutocompleteItem<T>>>, templateItems: Ref<HTMLElement[]>) {
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

function getOnKeydown<T>(autocompleteItems: Ref<AutocompleteItem<T>[]>,hoveredItem: Ref<Option<AutocompleteItem<T>>>, closeDropdown: IO<void>, setSelected: FunctionN<[AutocompleteItem<T>], void>, setHovered: FunctionN<[AutocompleteItem<T>], void>) {
 function onArrowPress(isUp: boolean)  {
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
   )()
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
      nextTick(closeDropdown)
    }
  }
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
        type: Boolean,
        default: true
      },
      clearOnSelect: {
        type: Boolean,
        default: true
      },
      openOnFocus: {
        type: Boolean,
        default: true
      },
      onSelected: {
        type: Function as PropType<FunctionN<[T], void>>,
        required: true
      }
    },
    setup(props, context) {
      const templateItems = shallowRef([] as HTMLElement[]);
      onBeforeUpdate(() => templateItems.value = []);
      const dropdownProps = shallowReactive({ isExpanded: false, hasPopup: true });
      function open() { dropdownProps.isExpanded = true }
      function close() { dropdownProps.isExpanded = false }
      const templateInfo = shallowRef((null as unknown) as HTMLInputElement);
      const info = useInput<string>(props, templateInfo);
      const { themeClasses } = useTheme(props);
      const hoveredItem = shallowRef(none as Option<AutocompleteItem<T>>);
      const activeDescendentId = computed(() => getActiveDescendentId(props.selectedItems, props.itemId);
      const autocompleteItems = computed(() => getAutocompleteItems(props.items, props.selectedItems, props.itemId, props.itemText, props.eq, hoveredItem.value));
    }
  });
}

export default base.extend<any>().extend({
  name: 'BAutocomplete',
  inheritAttrs: false,
  data() {
    return {
      hoveredItem: none as Option<AutocompleteItem<unknown>>
    };
  },
  computed: {
    newAutocomplete(): string {
      return this.autocomplete || 'list';
    },
    classes(): object {
      return {
        'is-expanded': this.isExpanded
      };
    }
  },
  methods: {
    getOnMouseenter(item: AutocompleteItem<unknown>) {
      return () => this.setHovered(item);
    },
    getOnClick(item: AutocompleteItem<unknown>) {
      return () => this.setSelected(item);
    },
    setSelected(item: AutocompleteItem<unknown>) {
      if (!item.isSelected) {
        this.$emit('select', item.value);
        this.internalValue = this.clearOnSelect ? '' : this.extractProp(this.itemText as any, item.value);
        if (this.closeOnSelect) {
          this.$nextTick(this.closeDropdown);
        }
      }
    },
    setHovered(item: AutocompleteItem<unknown> | undefined) {
      const newItem = fromNullable(item);
      if (isSome(newItem)) {
        this.hoveredItem = newItem;
        pipe(
          newItem,
          map(item => item.index),
          chain(index => lookup(index, this.$refs.items)),
          fold(constant(constVoid), li => () => li.focus())
        )();
      }
    },
    onKeyup(event: KeyboardEvent) {
      if (isEscEvent(event)) {
        event.preventDefault();
        this.onEscape();
      }
    },
    onKeydown(event: KeyboardEvent) {
      if (isEnterEvent(event)) {
        event.preventDefault();
        this.onEnter();
      } else if (isTabEvent(event)) {
        event.preventDefault();
        this.onTab();
      } else if (isArrowUpEvent(event)) {
        event.preventDefault();
        this.onArrowPress(true);
      } else if (isArrowDownEvent(event)) {
        event.preventDefault();
        this.onArrowPress(false);
      }
    },
    onEnter() {
      if (isSome(this.hoveredItem)) {
        this.setSelected(this.hoveredItem.value);
      }
    },
    onEscape() {
      this.$nextTick(this.closeDropdown);
    },
    onTab() {
      if (isSome(this.hoveredItem)) {
        this.setSelected(this.hoveredItem.value);
      } else {
        this.$nextTick(this.closeDropdown);
      }
    },
    onArrowPress(isUp: boolean) {
      pipe(
        this.hoveredItem,
        map(item => item.index),
        alt(() => some(0)),
        chain(index =>
          lookup(
            isUp ? Math.max(index - 1, 0) : Math.min(index + 1, this.newItems.length - 1),
            this.newItems as AutocompleteItem<unknown>[]
          )
        ),
        fold(constant(constVoid), newItem => () => this.setHovered(newItem))
      )();
    },
    onFocus(event: MouseEvent) {
      if (this.openOnFocus) {
        this.setHovered(this.newItems[0]);
      }
      this.$emit('focus', event);
    },
    onBlur(event: MouseEvent) {
      this.$emit('blur', event);
    },
    generateInput(): VNode {
      return this.$createElement(BInput, {
        ref: 'input',
        slot: 'trigger',
        props: {
          value: this.internalValue,
          type: 'text',
          size: this.size,
          isLoading: this.isLoading,
          isRounded: this.isRounded,
          icon: this.icon,
          maxLength: this.maxLength,
          autocomplete: this.newAutocomplete,
          placeholder: this.placeholder
        },
        attrs: {
          ...this.$attrs,
          role: 'searchbox',
          'aria-controls': this.computedId,
          'aria-autocomplete': this.newAutocomplete,
          'aria-activedescendant': this.activeDescendantId
        },
        on: {
          input: (val: any) => {
            this.internalValue = val;
          },
          focus: this.onFocus,
          blur: this.onBlur
        },
        nativeOn: {
          keydown: this.onKeydown,
          keyup: this.onKeyup
        }
      });
    },
    generateAutocompleteItems(): VNode {
      let nodes: VNode[];
      if (this.isLoading) {
        nodes = [this.generateLoadingItem()];
      } else {
        nodes = this.displayEmpty ? [this.generateEmptyItem()] : this.generateItems();
        if (this.hasHeaderSlot) {
          nodes.unshift(this.generateHeaderItem(), this.generateDivider());
        }
      }
      return this.$createElement('ul', { slot: 'default', attrs: { id: this.computedId, role: 'listbox' } }, nodes);
    },
    generateLoadingItem(): VNode {
      return this.$createElement('li', { attrs: { tabindex: -1 } }, [
        this.$createElement(BDropdownItem, { props: { tag: 'div' } }, this.$slots.loading || 'Loading results...')
      ]);
    },
    generateHeaderItem(): VNode {
      return this.$createElement('li', { attrs: { tabindex: -1 } }, [
        this.$createElement(BDropdownItem, { props: { tag: 'div' } }, this.$slots.header)
      ]);
    },
    generateDivider(): VNode {
      return this.$createElement(BDropdownDivider);
    },
    generateItems(): VNode[] {
      return this.newItems.map(this.generateItem);
    },
    generateItem(item: AutocompleteItem<unknown>, index: number): VNode {
      return this.$createElement(
        BDropdownItem,
        {
          key: item.id,
          ref: 'items',
          refInFor: true,
          domProps: {
            id: item.id
          },
          props: {
            isActive: item.isSelected
          },
          attrs: {
            'aria-selected': item.isSelected,
            'aria-label': `Option ${index + 1} of ${this.newItems.length}`
          },
          class: { 'is-hovered': item.isHovered },
          on: {
            click: this.getOnClick(item),
            mouseenter: this.getOnMouseenter(item),
            keydown: this.onKeydown
          }
        },
        this.$scopedSlots.default ? this.$scopedSlots.default!({ option: item, index }) : item.text
      );
    },
    generateEmptyItem(): VNode {
      return this.$createElement(
        BDropdownItem,
        {
          staticClass: 'is-disabled'
        },
        this.$slots.empty || `No results for ${this.internalValue}`
      );
    }
  },
  render(): VNode {
    return this.$createElement(
      BDropdown,
      { ref: 'dropdown', props: { isMobileModal: false }, staticClass: 'b-autocomplete', class: this.classes },
      [this.generateInput(), this.generateAutocompleteItems()]
    );
  }
});
