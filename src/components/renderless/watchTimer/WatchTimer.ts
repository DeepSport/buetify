import Vue, { VNode } from "vue";

export const WatchTimer = Vue.extend({
  name: "WatchTimer",
  props: {
    itemToWatch: {
      required: true
    },
    timerLength: {
      type: Number,
      required: false,
      default: 250
    }
  },
  data(): Data {
    return {
      timerIsActive: false,
      item: this.itemToWatch
    };
  },
  watch: {
    itemToWatch: function() {
      this.timerIsActive = true;
      setTimeout(() => {
        this.timerIsActive = false;
        this.item = this.itemToWatch;
      }, this.timerLength);
    }
  },
  render(): VNode {
    return this.$scopedSlots.default!({
      isActive: this.timerIsActive,
      item: this.item
    }) as any;
  }
});

interface Data {
  timerIsActive: boolean;
  item: any;
}
