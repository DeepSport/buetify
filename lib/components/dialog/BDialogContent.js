import "../../../src/components/dialog/dialog.sass";
import { getUseThemePropsDefinition, useTheme } from '../../composables/theme';
import { defineComponent, h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';
import { DialogTheme } from './theme';

function generateHeader(slots) {
  return h('header', {
    staticClass: 'modal-card-head'
  }, slots.header());
}

function generateFooter(slots) {
  return h('footer', {
    staticClass: 'modal-card-foot'
  }, slots.footer());
}

function generateBody(slots) {
  return h('section', {
    staticClass: 'modal-card-body'
  }, slots.default());
}

export const B_DIALOG_CONTENT_NAME = 'b-dialog-content';
export default defineComponent({
  name: B_DIALOG_CONTENT_NAME,
  props: Object.assign(Object.assign({}, getUseThemePropsDefinition(DialogTheme, true)), {
    size: {
      type: String,
      required: false
    },
    cardClass: {
      type: String,
      required: false
    }
  }),

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = useTheme(props);
    return () => {
      const nodes = [];

      if (slots.header) {
        nodes.push(generateHeader(slots));
      }

      nodes.push(generateBody(slots));

      if (slots.footer) {
        nodes.push(generateFooter(slots));
      }

      return h('div', {
        class: mergeClasses(props.size, 'b-dialog')
      }, [h('article', {
        class: mergeClasses(props.cardClass, themeClasses.value)
      }, nodes)]);
    };
  }

});
//# sourceMappingURL=BDialogContent.js.map