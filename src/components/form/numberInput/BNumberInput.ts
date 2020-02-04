import "./b-numberinput.sass";
import { isString } from "../../../utils/helpers";
import { constant } from "fp-ts/lib/function";
import {
  fromNullable,
  getOrElse,
  isSome,
  none,
  Option,
  some
} from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { VNode } from "vue";
import BButton from "../../button/BButton";
import BInput, { DEFAULT_INPUT_ICONS } from "../input/BInput";
import { InputMixin } from "../../../mixins/input/InputMixin";
import { InputIcons, NumberInputIcons } from "../shared/types";
import { applyMixins } from "../../../utils/applyMixins";
import { PropValidator } from "vue/types/options";

interface Data {
  newValue: number;
  newStep: number;
}

const DEFAULT_NUMBER_INPUT_ICONS: NumberInputIcons = {
  minus: () => import("../../icons/minus"),
  plus: () => import("../../icons/plus")
};

function parseNumber(val: string | number, orElse: number): number {
  return isString(val)
    ? pipe(parseOptionNumber(val), getOrElse(constant(orElse)))
    : val;
}

function parseOptionNumber(val: string | number | undefined): Option<number> {
  return val === undefined
    ? none
    : isString(val)
    ? fromNullable(parseFloat(val))
    : some(val);
}

export default applyMixins(InputMixin).extend({
  name: "BNumberInput",
  components: {
    BButton,
    BInput
  },
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    min: [Number, String],
    max: [Number, String],
    step: {
      type: [Number, String],
      default: 1
    },
    variant: {
      type: String,
      default: "is-primary"
    },
    displayControls: {
      type: Boolean,
      default: true
    },
    controlsRounded: {
      type: Boolean,
      default: false
    },
    controlsPosition: {
      type: String
    },
    inputIcons: {
      type: Object,
      default: constant(DEFAULT_INPUT_ICONS)
    } as PropValidator<InputIcons>,
    numberInputIcons: {
      type: Object,
      default: constant(DEFAULT_NUMBER_INPUT_ICONS)
    } as PropValidator<NumberInputIcons>
  },
  data(): Data {
    return {
      newValue: parseNumber(this.value, 0),
      newStep: parseNumber(this.step, 1)
    };
  },
  computed: {
    internalValue: {
      get(): number {
        return this.newValue;
      },
      set(value: string | number): void {
        const newValue = pipe(
          parseOptionNumber(value),
          getOrElse(constant(pipe(this.newMin, getOrElse(constant(0)))))
        );
        this.newValue = newValue as number;
        this.$emit("input", newValue);
        // @ts-ignore
        this.$refs.input.validate();
      }
    },
    newMin(): Option<number> {
      return parseOptionNumber(this.min);
    },
    newMax(): Option<number> {
      return parseOptionNumber(this.max);
    },
    fieldClasses(): object {
      return {
        "has-addons": this.controlsPosition === "compact",
        "is-grouped": this.controlsPosition !== "compact"
      };
    },
    buttonClasses(): any[] {
      return [this.variant, this.size, { "is-rounded": this.controlsRounded }];
    },
    disabledMin(): boolean {
      if (isSome(this.newMin)) {
        return this.internalValue - this.newStep < this.newMin.value;
      } else {
        return false;
      }
    },
    disabledMax(): boolean {
      if (isSome(this.newMax)) {
        return this.internalValue + this.newStep > this.newMax.value;
      } else {
        return false;
      }
    }
  },
  watch: {
    value(value) {
      this.newValue = value;
    }
  },
  methods: {
    onDecrement() {
      if (!this.disabledMin) {
        this.internalValue = this.internalValue - this.newStep;
      }
    },
    onIncrement() {
      if (!this.disabledMax) {
        this.internalValue = this.internalValue + this.newStep;
      }
    },
    onInput(input: number): void {
      this.internalValue = input;
    },
    generateControl(isDecrement: boolean): VNode {
      return this.$createElement(
        "p",
        {
          staticClass: "control"
        },
        [
          this.$createElement(
            BButton,
            {
              class: this.buttonClasses,
              props: {
                isDisabled: isDecrement ? this.disabledMin : this.disabledMax
              },
              on: {
                click: isDecrement ? this.onDecrement : this.onIncrement
              }
            },
            [
              this.$createElement(
                isDecrement
                  ? this.numberInputIcons.minus
                  : this.numberInputIcons.plus,
                { props: { size: this.iconSize } }
              )
            ]
          )
        ]
      );
    },
    generateInput(): VNode {
      return this.$createElement(BInput, {
        ref: "input",
        props: {
          value: this.internalValue,
          type: "number",
          size: this.size,
          inputIcons: this.inputIcons,
          isReadonly: this.isReadonly,
          isLoading: this.isLoading,
          isRounded: this.isRounded,
          icon: this.icon,
          autocomplete: this.autocomplete,
          isExpanded: this.isExpanded
        },
        on: {
          focus: this.onFocus,
          blur: this.onBlur,
          input: this.onInput
        },
        attrs: {
          step: this.newStep,
          max: this.max,
          min: this.min
        }
      });
    }
  },
  render(): VNode {
    const nodes = this.displayControls
      ? [
          this.generateControl(true),
          this.generateInput(),
          this.generateControl(false)
        ]
      : [this.generateInput()];
    return this.$createElement(
      "div",
      { staticClass: "b-number-input field", class: this.fieldClasses },
      nodes
    );
  }
});
