import './autocomplete.sass';
import BDropdown from '../../dropdown/BDropdown';
import { isArrowDownEvent, isArrowUpEvent, isEnterEvent, isEscEvent, isTabEvent } from '../../../utils/eventHelpers';
import { ExtractPropMixin } from '../../../mixins/extractProp/ExtractPropMixin';
import { constant, constVoid } from 'fp-ts/lib/function';
import BDropdownDivider from '../../dropdown/BDropdownDivider';
import BDropdownItem from '../../dropdown/BDropdownItem';
import { DROPDOWN_THEME_MIXIN } from '../../dropdown/DropdownTheme';
import { InputMixin } from '../../../mixins/input/InputMixin';
import { EqMixin } from '../../../mixins/eq/EqMixin';
import { applyMixins, ExtractVue } from '../../../utils/applyMixins';
import { head, isEmpty, lookup } from 'fp-ts/lib/Array';
import { alt, chain, fold, fromNullable, isSome, map, none, Option, some, toUndefined } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { PropType, VNode } from 'vue';
import BInput from '../input';

export interface AutocompleteItem<T> {
  id: string;
  isSelected: boolean;
  isHovered: boolean;
  text: string;
  value: T;
  index: number;
}

const base = applyMixins(InputMixin, EqMixin, DROPDOWN_THEME_MIXIN, ExtractPropMixin);

export interface options extends ExtractVue<typeof base> {
  $refs: {
    dropdown: InstanceType<typeof BDropdown>;
    input: InstanceType<typeof BInput>;
    items: HTMLLIElement[];
  };
}

export default base.extend<options>().extend({
  name: 'BAutocomplete',
  components: {
    BInput,
    BDropdownItem,
    BDropdownDivider
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<unknown[]>,
      default: () => []
    },
    selectedItems: {
      type: Array as PropType<unknown[]>,
      default: () => []
    },
    itemId: {
      type: [String, Function] as PropType<string | ((option: any) => string)>,
      default: 'id'
    },
    itemText: {
      type: [String, Function],
      default: 'text'
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
    }
  },
  data() {
    return {
      hoveredItem: none as Option<AutocompleteItem<unknown>>
    };
  },
  computed: {
    activeDescendantId(): string | undefined {
      return pipe(
        this.selectedItems,
        head,
        map(item => this.extractProp(this.itemId as any, item)),
        toUndefined
      );
    },
    newAutocomplete(): string {
      return this.autocomplete || 'list';
    },
    newItems(): readonly AutocompleteItem<any>[] {
      return Object.freeze(
        this.items.map((item, index) => ({
          id: this.extractProp(this.itemId as any, item),
          isSelected: this.selectedItems.some(i => this.valueComparator(i, item)),
          isHovered: isSome(this.hoveredItem) ? this.valueComparator(item, this.hoveredItem.value.value) : false,
          text: this.extractProp(this.itemText as any, item),
          value: item,
          index
        }))
      );
    },
    displayEmpty(): boolean {
      return isEmpty(this.newItems as any[]);
    },
    hasHeaderSlot(): boolean {
      return !!this.$slots.header;
    },
    classes(): object {
      return {
        'is-expanded': this.isExpanded
      };
    }
  },
  methods: {
    closeDropdown(): void {
      this.$refs.dropdown.setOff();
    },
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
    return this.$createElement(BDropdown, { ref: 'dropdown', class: this.classes }, [
      this.generateInput(),
      this.generateAutocompleteItems()
    ]);
  }
});
