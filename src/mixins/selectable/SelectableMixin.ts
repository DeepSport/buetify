import { DisableMixin } from '../disable/DisableMixin';
import { EqMixin } from '../eq/EqMixin';
import { applyMixins } from '../../utils/applyMixins';
import { ModelMixin } from '../model/ModelMixin';

export const SelectableMixin = applyMixins(ModelMixin, EqMixin, DisableMixin).extend({
  name: 'Selectable',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    trueValue: {
      type: null as any,
      default: true
    },
    falseValue: {
      type: null as any,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: undefined
    },
    inputValue: null as any
  },
  data() {
    return {
      isFocused: false,
      newValue: this.inputValue
    };
  },
  computed: {
    internalIsMultiple(): boolean {
      return this.isMultiple === true || (this.isMultiple === undefined && Array.isArray(this.newValue));
    },
    isActive(): boolean {
      const value = this.value;
      const input = this.newValue;

      if (this.internalIsMultiple) {
        if (!Array.isArray(input)) return false;
        return input.some(item => this.valueComparator(item, value));
      }

      return this.valueComparator(input, this.trueValue);
    }
  },
  watch: {
    inputValue(val) {
      this.newValue = val;
    }
  },
  methods: {
    onBlur() {
      this.isFocused = false;
    },
    onChange() {
      if (this.disabled) return;
      const value = this.value;
      let input = this.internalValue;

      if (this.internalIsMultiple) {
        if (!Array.isArray(input)) {
          input = [];
        }

        const length = input.length;

        input = input.filter((item: any) => !this.valueComparator(item, value));

        if (input.length === length) {
          input.push(value);
        }
      } else if (this.trueValue !== undefined && this.falseValue !== undefined) {
        input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
      } else if (value) {
        input = this.valueComparator(input, value) ? null : value;
      } else {
        input = !input;
      }

      this.internalValue = input;
    },
    onFocus() {
      this.isFocused = true;
    }
  }
});
