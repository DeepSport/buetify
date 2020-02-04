import { applyMixins } from '../../utils/applyMixins';
import { SizeVariant } from '../../types/SizeVariants';
import { isHTMLElement, isObject, isString } from '../../utils/helpers';
import { PropType } from 'vue';
import { InputFocusMixin } from '../focus/FocusMixin';
import { InputLabelIdMixin } from '../labelId/LabelIdMixin';
import { ModelMixin } from '../model/ModelMixin';
import { InputValidateMixin } from '../validate/ValidateMixin';

export const InputMixin = applyMixins(ModelMixin, InputFocusMixin, InputValidateMixin, InputLabelIdMixin).extend({
  props: {
    autocomplete: String,
    placeholder: String,
    messageVariant: [String, Object],
    message: String,
    size: {
      type: String as PropType<SizeVariant>
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    icon: Function,
    maxLength: [Number, String]
  },
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    statusType(): string | undefined {
      if (this.messageVariant === 'string') {
        return this.messageVariant;
      } else if (isObject(this.messageVariant)) {
        return Object.values(this.messageVariant)[0] as any;
      } else {
        return undefined;
      }
    },
    statusMessage(): string {
      return this.message;
    },
    /**
     * Fix icon size for inputs, large was too big
     */
    iconSize(): SizeVariant | string {
      switch (this.size) {
        case 'is-small':
          return this.size;
        case 'is-medium':
          return '';
        default:
          return '';
      }
    }
  },
  methods: {
    onBlur($event: MouseEvent) {
      this.isFocused = false;
      this.$emit('blur', $event);
      this.validate();
    },
    onFocus($event: MouseEvent) {
      this.isFocused = true;
      this.$emit('focus', $event);
    }
  }
});
