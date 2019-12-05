import 'bulma/sass/components/modal.sass';
import "../../../src/components/dialog/dialog.sass";
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import { defineComponent, h } from 'vue';
import { DialogTheme } from './theme';
export const B_DIALOG_CONTENT_NAME = 'b-dialog-content';
export default defineComponent({
  name: B_DIALOG_CONTENT_NAME,
  props: { ...useThemePropsDefinition(DialogTheme, true),
    size: {
      type: String,
      required: false
    },
    cardClass: {
      type: String,
      required: false
    },
    asCard: {
      type: Boolean,
      default: true
    }
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = useTheme(props);
    return () => {
      const nodes = [];

      if (slots.header) {
        nodes.push(h('header', {
          class: 'modal-card-head'
        }, slots.header()));
      }

      nodes.push(h('section', {
        class: ['modal-card-body', {
          'is-titleless': !slots.header
        }]
      }, slots.default && slots.default()));

      if (slots.footer) {
        nodes.push(h('footer', {
          class: 'modal-card-foot'
        }, slots.footer()));
      }

      return h('div', {
        class: [props.size, 'b-dialog']
      }, [h('article', {
        class: ['modal-card', {
          card: props.asCard
        }, ...themeClasses.value, props.cardClass]
      }, nodes)]);
    };
  }

});
//# sourceMappingURL=BDialogContent.js.map