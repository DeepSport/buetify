import Vue from 'vue';
import { exists, isObject } from '../../utils/helpers';

export interface options extends Vue {
  $_modelEvent: string;
}

export const ModelMixin = Vue.extend<options>().extend({
  name: 'ModelMixin',
  props: {
    value: null as any
  },
  data() {
    return {
      newValue: this.value as any
    };
  },
  computed: {
    internalValue: {
      get(): any {
        return this.newValue;
      },
      set(val: any) {
        this.newValue = val;
        this.$emit(this.$_modelEvent, val);
      }
    }
  },
  watch: {
    value(val) {
      this.newValue = val;
    }
  },
  methods: {
    onInput(e: Event): void {
      // @ts-ignore-next-line
      if (isObject(e.target) && exists(e.target.value)) {
        // @ts-ignore-next-line
        this.internalValue = e.target.value;
      }
    }
  },
  beforeCreate() {
    // v-radio-group needs to emit a different event
    // https://github.com/vuetifyjs/vuetify/issues/4752
    this.$_modelEvent = (this.$options.model && this.$options.model.event) || 'input';
  }
});
