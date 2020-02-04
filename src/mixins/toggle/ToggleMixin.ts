import Vue from "vue";

export function getToggleMixin<StatusName extends string>(
  statusName: StatusName
) {
  return Vue.extend({
    props: {
      [statusName]: {
        type: Boolean,
        required: false,
        default: false
      },
      isOn: {
        type: Boolean,
        required: false,
        default: undefined
      },
      hasPopup: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        internalIsOn: this[statusName] as boolean
      };
    },
    computed: {
      attrs(): object {
        return {
          tabindex: 0,
          role: "button",
          type: "button",
          "aria-pressed": this.isActive,
          "aria-expanded": this.isActive,
          ...(this.hasPopup ? { "aria-haspopup": true } : {})
        };
      },
      isActive(): boolean {
        return this.isOn !== undefined ? this.isOn : this.internalIsOn;
      },
      clickToggler(): Record<"click", (e: Event) => void> {
        return {
          click: this.toggle
        };
      },
      keyboardToggler(): Record<"keydown", (e: KeyboardEvent) => void> {
        return {
          keydown: (event: KeyboardEvent) => {
            if (event.key === "Enter") {
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
      isOn(newValue: boolean | undefined) {
        if (typeof newValue === "boolean") {
          this.internalIsOn = newValue;
        }
      },
      isActive: function(newValue: boolean, oldValue: boolean): void {
        if (newValue !== oldValue) {
          this.$emit("toggle", newValue);
        }
      }
    },
    methods: {
      setOn(): void {
        this.internalIsOn = true;
        this.$emit("set-on", this.isActive);
      },
      setOff(): void {
        this.internalIsOn = false;
        this.$emit("set-off", this.isActive);
      },
      toggle(): void {
        this.internalIsOn = !this.internalIsOn;
      }
    }
  });
}

export const ToggleMixin = Vue.extend({
  props: {
    initialStatus: {
      type: Boolean,
      required: false,
      default: false
    },
    isOn: {
      type: Boolean,
      required: false,
      default: undefined
    },
    hasPopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      internalIsOn: this.initialStatus
    };
  },
  computed: {
    attrs(): object {
      return {
        tabindex: 0,
        role: "button",
        type: "button",
        "aria-pressed": this.isActive,
        "aria-expanded": this.isActive,
        ...(this.hasPopup ? { "aria-haspopup": true } : {})
      };
    },
    isActive(): boolean {
      return this.isOn !== undefined ? this.isOn : this.internalIsOn;
    },
    clickToggler(): Record<"click", (e: Event) => void> {
      return {
        click: this.toggle
      };
    },
    keyboardToggler(): Record<"keydown", (e: KeyboardEvent) => void> {
      return {
        keydown: (event: KeyboardEvent) => {
          if (event.key === "Enter") {
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
    isOn(newValue: boolean | undefined) {
      if (typeof newValue === "boolean") {
        this.internalIsOn = newValue;
      }
    },
    isActive: function(newValue: boolean, oldValue: boolean): void {
      if (newValue !== oldValue) {
        this.$emit("toggle", newValue);
      }
    }
  },
  methods: {
    setOn(): void {
      this.internalIsOn = true;
      this.$emit("set-on", this.isActive);
    },
    setOff(): void {
      this.internalIsOn = false;
      this.$emit("set-off", this.isActive);
    },
    toggle(): void {
      this.internalIsOn = !this.internalIsOn;
    }
  }
});
