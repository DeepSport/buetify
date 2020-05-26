import './dropdown.sass';
import { Predicate } from 'fp-ts/lib/function';
import { getUseThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, Toggle, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { useWindowSize } from '../../composables/windowSize';
import { TransitionClasses } from '../../types/Transition';
import {
  PropType,
  VNode,
  defineComponent,
  shallowRef,
  resolveDirective,
  computed,
  Ref,
  h,
  withDirectives,
  Directive,
  Slots
} from 'vue';
import ClickOutside, { ClickOutsideBindingArgs } from '../../directives/clickOutside';
import { isString } from '../../utils/helpers';
import { Classes } from '../../utils/mergeClasses';
import { DropdownThemeMap } from './theme';

export type DropdownPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';

export const BDropdownPropsDefinition = {
  ...getUseThemePropsDefinition(DropdownThemeMap),
  ...getUseTogglePropsDefinition('isExpanded'),
  ...FadeTransitionPropsDefinition,
  id: String as PropType<string>,
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isHoverable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isInline: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  position: {
    type: String as PropType<DropdownPosition>,
    validator: (value: unknown) => {
      return isString(value) && ['is-top-right', 'is-top-left', 'is-bottom-left'].includes(value);
    }
  },
  isMobileModal: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  menuTag: {
    type: String as PropType<string>,
    default: 'ul'
  }
};

let id = 0;

function generateTrigger(toggle: Toggle, id: string, triggerRef: Ref<HTMLElement>, slots: Slots) {
  return h(
    'div',
    {
      ref: triggerRef,
      staticClass: 'dropdown-trigger',
      role: 'button',
      'aria-owns': id,
      'aria-haspopup': 'listbox',
      'aria-expanded': `${toggle.isOn.value}`,
      onClick: toggle.toggle
    },
    slots.trigger!()
  );
}

function generateTransition(transition: TransitionClasses, children: VNode[]) {
  return h('transition', transition, children);
}

function getCloseConditional(toggle: Toggle, isInWhiteList: Predicate<HTMLElement>): Predicate<Event> {
  return (e: Event) => {
    const target = e.target as HTMLElement;
    return toggle.isOn.value && isInWhiteList(target);
  };
}

function generateDropdownContent(
  menuTag: string,
  toggle: Toggle,
  computedId: string,
  themeClasses: string[],
  slots: Slots
): VNode {
  return h(
    menuTag,
    {
      class: ['dropdown-content', ...themeClasses],
      role: 'menu',
      id: computedId,
      'aria-hidden': toggle.isOff.value
    },
    slots.default!({ toggle })
  );
}

function generateDropdownMenu(
  menuTag: string,
  toggle: Toggle,
  computedId: string,
  themeClasses: string[],
  transition: TransitionClasses,
  slots: Slots,
  vShow: Directive,
  clickOutsideBindingArgs: ClickOutsideBindingArgs,
  dropdownMenuRef: Ref<HTMLElement>,
  useTransition: boolean = true
) {
  const menu = withDirectives(
    h(
      'div',
      {
        ref: dropdownMenuRef,
        class: 'dropdown-menu'
      },
      [generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots)]
    ),
    [
      [vShow, toggle.isOn.value],
      [ClickOutside, toggle.setOff, clickOutsideBindingArgs as any]
    ]
  );
  return useTransition ? generateTransition(transition, [menu]) : menu;
}

function generateMobileBackground(
  menuTag: string,
  toggle: Toggle,
  computedId: string,
  themeClasses: string[],
  transition: TransitionClasses,
  slots: Slots,
  vShow: Directive,
  clickOutsideBindingArgs: ClickOutsideBindingArgs,
  dropdownMenuRef: Ref<HTMLElement>

): VNode {
  return generateTransition(transition, [
    withDirectives(
      h(
        'div',
        {
          class: 'background',
          'aria-hidden': toggle.isOff.value
        },
        [
          generateDropdownMenu(
            menuTag,
            toggle,
            computedId,
            themeClasses,
            transition,
            slots,
            vShow,
            clickOutsideBindingArgs,
            dropdownMenuRef,
            false
          )
        ]
      ),
      [[vShow, toggle.isOn.value]]
    )
  ]);
}

function generateChildren(
  menuTag: string,
  isInline: boolean,
  toggle: Toggle,
  computedId: string,
  transition: TransitionClasses,
  themeClasses: string[],
  shouldDisplayMobileBackground: boolean,
  slots: Slots,
  vShow: Directive,
  clickOutsideBindingArgs: ClickOutsideBindingArgs,
  triggerRef: Ref<HTMLElement>,
  dropdownMenuRef: Ref<HTMLElement>
) {
  const children: VNode[] = [];
  if (!isInline) {
    children.push(generateTrigger(toggle, computedId, triggerRef, slots));
  }
  if (shouldDisplayMobileBackground) {
    children.push(
      generateMobileBackground(
        menuTag,
        toggle,
        computedId,
        themeClasses,
        transition,
        slots,
        vShow,
        clickOutsideBindingArgs,
        dropdownMenuRef
      )
    );
  } else {
    children.push(
      generateDropdownMenu(
        menuTag,
        toggle,
        computedId,
        themeClasses,
        transition,
        slots,
        vShow,
        clickOutsideBindingArgs,
        dropdownMenuRef
      )
    );
  }
  return children;
}

export default defineComponent({
  name: 'b-dropdown',
  props: BDropdownPropsDefinition,
  setup(props, { slots }) {
    const windowSize = useWindowSize();
    const toggle = useToggle(props, 'isExpanded');
    const { themeClasses } = useTheme(props);
    const transition = useTransition(props);
    const root = shallowRef((null as unknown) as HTMLElement);
    const trigger = shallowRef((null as unknown) as HTMLElement);
    const dropdownMenu = shallowRef((null as unknown) as HTMLElement);
    const vShow = resolveDirective('show') as Directive;
    const computedId = computed(() => `dropdown-menu-${props.id ?? id++}`);
    const rootClasses: Ref<Classes[]> = computed(() => [
      props.position,
      {
        'is-expanded': toggle.isOn.value,
        'is-disabled': props.isDisabled,
        'is-hoverable': props.isHoverable,
        'is-inline': props.isInline,
        'is-active': toggle.isOn.value || props.isInline,
        'is-mobile-modal': props.isMobileModal
      }
    ]);
    const displayMenu = computed(
      () => (!props.isDisabled && (toggle.isOn.value || props.isHoverable)) || props.isInline
    );
    const isMobileModal = computed(() => props.isMobileModal && !props.isInline && !props.isHoverable);
    const displayMobileBackground = computed(() => isMobileModal.value && windowSize.value.isTouch);

    function getDependentElements(): HTMLElement[] {
      return Array.from(dropdownMenu.value.querySelectorAll('*'));
    }

    function isInDropdown(el: HTMLElement): boolean {
      return dropdownMenu.value !== undefined && dropdownMenu.value.contains(el);
    }

    function isInWhiteList(el: HTMLElement) {
      if (el === root.value) return true;
      if (el === dropdownMenu.value) return true;
      if (el === trigger.value) return true;
      return isInDropdown(el) || isInTrigger(el);
    }

    function isInTrigger(el: HTMLElement): boolean {
      return trigger.value !== undefined && trigger.value.contains(el);
    }

    const menuToggle = {
      ...toggle,
      isOn: displayMenu,
      isOff: computed(() => !displayMenu.value)
    };

    const closeConditional = getCloseConditional(menuToggle, isInWhiteList);

    const clickOutsideArgs = {
      include: getDependentElements,
      closeConditional
    };

    return () => {
      return h(
        'div',
        { ref: root, class: ['dropdown', ...rootClasses.value] },
        generateChildren(
          props.menuTag,
          props.isInline,
          menuToggle,
          computedId.value,
          transition.value,
          themeClasses.value,
          displayMobileBackground.value,
          slots,
          vShow,
          clickOutsideArgs,
          trigger,
          dropdownMenu
        )
      );
    };
  }
});
