import { constant } from "fp-ts/lib/function";
import { VueConstructor } from "vue";
import Vue from "vue";

// from vuetify
export type Proxyable<T extends string = "value"> = VueConstructor<
  Vue & {
    internalLazyValue: unknown;
    internalValue: unknown;
  } & Record<T, any>
>;

export function getProxyableMixin<T extends string = "value">(
  prop?: T,
  event?: string,
  defaultValue?: any
): Proxyable<T>;
export function getProxyableMixin(
  prop = "value",
  event = "input",
  defaultValue?: any
) {
  return Vue.extend({
    name: "Proxyable",
    model: {
      event,
      prop
    },
    props: {
      [prop]: {
        required: false,
        default: constant(defaultValue)
      }
    },
    data() {
      return {
        internalLazyValue: this[prop] as unknown
      };
    },
    computed: {
      internalValue: {
        get(): unknown {
          return this.internalLazyValue;
        },
        set(val: any) {
          if (val === this.internalLazyValue) {
            return;
          }
          this.internalLazyValue = val;
          this.$emit(event, val);
        }
      }
    },
    watch: {
      [prop](val) {
        this.internalLazyValue = val;
      }
    }
  });
}

export const ProxyableMixin = getProxyableMixin();
