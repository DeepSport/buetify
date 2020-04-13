import { IO } from 'fp-ts/lib/IO';
import Vue, { VueConstructor } from 'vue';
import { PropValidator } from 'vue/types/options';
import { isEnterEvent } from '../../utils/eventHelpers';

export type Toggleable<T extends string> = VueConstructor<
  Vue & {
    hasPopup: boolean;
    lazyStatus: boolean;
    internalStatus: boolean;
    attrs: object;
    clickToggler: Record<'click', (e: Event) => void>;
    keyboardToggler: Record<'keydown', (e: KeyboardEvent) => void>;
    listeners: { [key: string]: Function | Function[] };
    setOn: IO<void>;
    setOff: IO<void>;
    toggle: IO<void>;
  } & Record<T, boolean>
>;

export function getToggleMixin<T extends string>(statusName: T, defaultHasPopup?: boolean): Toggleable<T>;
export function getToggleMixin<T extends string>(statusName: T, defaultHasPopup: boolean = false) {
  return Vue.extend({
    props: {
      [statusName]: {
        type: Boolean,
        required: false,
        default: false
      } as PropValidator<boolean>,
      hasPopup: {
        type: Boolean,
        default: defaultHasPopup
      }
    },
    data() {
      return {
        lazyStatus: this[statusName] as boolean
      };
    },
    computed: {
      internalStatus: {
        get(): boolean {
          return this.lazyStatus;
        },
        set(val: boolean) {
          if (val !== this.lazyStatus) {
            this.lazyStatus = val;
            this.$emit('toggle', val);
          }
        }
      },
      attrs(): object {
        return {
          tabindex: 0,
          role: 'button',
          type: 'button',
          'aria-pressed': this.isActive,
          'aria-expanded': this.isActive,
          ...(this.hasPopup ? { 'aria-haspopup': true } : {})
        };
      },
      clickToggler(): Record<'click', (e: Event) => void> {
        return {
          click: this.toggle
        };
      },
      keyboardToggler(): Record<'keydown', (e: KeyboardEvent) => void> {
        return {
          keydown: (event: KeyboardEvent) => {
            if (isEnterEvent(event)) {
              event.preventDefault();
              this.toggle();
            }
          }
        };
      },
      listeners(): { [key: string]: Function | Function[] } {
        return {
          ...this.clickToggler,
          ...this.keyboardToggler
        };
      }
    },
    watch: {
      [statusName](newValue: boolean | undefined) {
        if (typeof newValue === 'boolean' && newValue !== this.lazyStatus) {
          this.lazyStatus = newValue;
        }
      }
    },
    methods: {
      setOn(): void {
        this.internalStatus = true;
      },
      setOff(): void {
        this.internalStatus = false;
      },
      toggle(): void {
        this.internalStatus = !this.internalStatus;
      }
    }
  });
}

export const ToggleMixin = getToggleMixin('initialStatus');
