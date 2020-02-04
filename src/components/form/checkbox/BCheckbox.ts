import "./checkbox.sass";
import { getSelectionControl } from "../shared/getSelectionControl";

export default getSelectionControl(
  "checkbox",
  "checkbox",
  "BCheckbox",
  "b-checkbox checkbox"
).extend({
  props: {
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newIndeterminate: this.indeterminate
    };
  },
  computed: {
    customInputDomProps(): object {
      return {
        indeterminate: this.newIndeterminate
      };
    }
  },
  watch: {
    indeterminate(val) {
      this.$nextTick(() => (this.newIndeterminate = val));
    },
    newIndeterminate(val) {
      this.$emit("update:indeterminate", val);
    },
    isActive() {
      if (!this.indeterminate) return;
      this.newIndeterminate = false;
    }
  }
});
