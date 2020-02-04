import "./tag.sass";
import { ColorVariant } from "../../types/ColorVariants";
import { SizeVariant } from "../../types/SizeVariants";
import { mapVNodeListenersToNative } from "../../utils/mapVNodeListenersToNative";
import { mergeVNodeClasses } from "../../utils/mergeVNodeClasses";
import { mergeVNodeStaticClass } from "../../utils/mergeVNodeStaticClass";
import Vue, { PropType, VNode } from "vue";

export default Vue.extend({
  name: "BTag",
  functional: true,
  props: {
    isAttached: Boolean,
    isClosable: Boolean,
    variant: {
      type: String as PropType<ColorVariant>
    },
    size: {
      type: String as PropType<SizeVariant>,
      required: false
    },
    isRounded: Boolean,
    isDisabled: Boolean,
    hasEllipsis: Boolean,
    isTabable: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      required: false,
      default: "span"
    }
  },
  render(h, { data, props, children }): VNode {
    if (props.isClosable && props.isClosable) {
      data.staticClass = mergeVNodeStaticClass(
        "tags has-addons",
        data.staticClass
      );
      return h(props.tag, data, [
        h(
          "span",
          {
            staticClass: "tag",
            class: [
              props.variant,
              props.size,
              { "is-rounded": props.isRounded }
            ]
          },
          [
            h(
              "span",
              { class: { "has-ellipsis": props.hasEllipsis } },
              children
            )
          ]
        ),
        h("button", {
          staticClass: "clear-default-styles tag is-delete has-cursor-pointer",
          class: [props.size, { "is-rounded": props.isRounded }],
          attrs: {
            type: "button",
            tabIndex: props.isTabable ? 0 : false,
            disabled: props.isDisabled
          },
          on: mapVNodeListenersToNative(
            "click",
            "close",
            data.on,
            props.isDisabled
          )
        })
      ]);
    } else {
      return h(
        props.tag,
        {
          ...data,
          staticClass: mergeVNodeStaticClass("tag", data.staticClass),
          class: mergeVNodeClasses(data.class, [
            props.variant,
            props.size,
            { "is-rounded": props.isRounded }
          ])
        },
        [
          h("span", { class: { "has-ellipsis": props.hasEllipsis } }, children),
          ...(props.isClosable
            ? [
                h("button", {
                  staticClass:
                    "clear-default-styles tag is-delete has-cursor-pointer",
                  class: [props.size, { "is-rounded": props.isRounded }],
                  attrs: {
                    type: "button",
                    tabIndex: props.isTabable ? 0 : false,
                    disabled: props.isDisabled
                  },
                  on: mapVNodeListenersToNative(
                    "click",
                    "close",
                    data.on,
                    props.isDisabled
                  )
                })
              ]
            : [])
        ]
      );
    }
  }
});
