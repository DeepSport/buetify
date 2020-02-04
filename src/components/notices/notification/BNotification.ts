import "../sass/notices.scss";
import { applyMixins } from "../../../utils/applyMixins";
import {
  DisplayNoticeMixin,
  OpenNoticeParams
} from "../../../mixins/displayNotice/DisplayNoticeMixin";
import { MessageMixin } from "../../../mixins/message/MessageMixin";
import { VNode } from "vue";
import { FadeTransitionMixin } from "../../../mixins/fadeTransition/FadeTransitionMixin";

export default applyMixins(
  MessageMixin,
  FadeTransitionMixin,
  DisplayNoticeMixin
).extend({
  name: "BNotification",
  props: {
    // Display notice through BApp injection rather than where component is located
    isNotice: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    generateNotice(params: OpenNoticeParams): VNode {
      return this.$createElement(
        "article",
        {
          staticClass: "notification",
          class: [
            params.variant || this.variant,
            params.position || this.position
          ],
          directives: this.isNotice
            ? []
            : [{ name: "show", value: this.internalIsActive }]
        },
        this.isClosable
          ? [
              this.generateCloseButton(),
              this.generateNoticeBody(params.message)
            ]
          : [this.generateNoticeBody(params.message)]
      );
    },
    generateCloseButton(): VNode {
      return this.$createElement("button", {
        staticClass: "delete",
        on: { click: this.isNotice ? this.closeNotice : this.closeMessage }
      });
    },
    generateNoticeBody(message?: string): VNode {
      return this.$createElement(
        "div",
        { staticClass: "media" },
        this.displayIcon && this.icon
          ? [this.generateIcon(), this.generateNoticeContent(message)]
          : [this.generateNoticeContent(message)]
      );
    },
    generateIcon(): VNode {
      return this.$createElement("div", { staticClass: "media-left" }, [
        this.$createElement(this.icon, { props: { size: this.iconSize } })
      ]);
    },
    generateNoticeContent(message?: string): VNode {
      const newMessage = message || this.message;
      return this.$createElement(
        "div",
        { staticClass: "media-content" },
        newMessage
          ? [this.$createElement("p", { staticClass: "text" }, newMessage)]
          : this.$slots.message
      );
    }
  },
  render(): VNode {
    return this.isNotice
      ? this.renderNoticeScopedSlot()
      : this.$createElement("transition", { props: this.formattedTransition }, [
          this.generateNotice(this.mergeNoticeParams())
        ]);
  }
});
