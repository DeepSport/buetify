import Vue, { VNode } from "vue";

export const DeferRendering = Vue.extend({
  name: "DeferRendering",
  props: {
    frames: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentFrame: 0
    };
  },
  mounted(): void {
    this.checkRenderingStatus();
  },
  methods: {
    checkRenderingStatus() {
      if (this.frames > 0) {
        if (window && window.requestAnimationFrame) {
          const step = () => {
            requestAnimationFrame(() => {
              if (this.currentFrame < this.frames) {
                this.currentFrame++;
                step();
              }
            });
          };
          step();
        } else {
          setTimeout(() => (this.currentFrame = this.frames), this.frames * 16);
        }
      }
    }
  },
  render(): VNode {
    return this.$scopedSlots.default!({
      display: this.currentFrame >= this.frames
    }) as any;
  }
});
