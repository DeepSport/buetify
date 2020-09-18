import './dialog.sass';
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType, VNode, defineComponent, h } from 'vue';
import { DialogTheme } from './theme';

export const B_DIALOG_CONTENT_NAME = 'b-dialog-content';

export default defineComponent({
  name: B_DIALOG_CONTENT_NAME,
  props: {
    ...useThemePropsDefinition(DialogTheme, true),
    size: {
      type: String as PropType<SizeVariant>,
      required: false
    },
    cardClass: {
      type: String as PropType<string>,
      required: false
    },
    asCard: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props, { slots }) {
    const { themeClasses } = useTheme(props);
    return () => {
      const nodes: VNode[] = [];
      if (slots.header) {
        nodes.push(h('header', { class: 'modal-card-head' }, slots.header()));
      }
      nodes.push(h('section', { class: 'modal-card-body', 'is-titleless': !slots.header }, slots.default && slots.default()));
      if (slots.footer) {
        nodes.push(h('footer', { class: 'modal-card-foot' }, slots.footer()));
      }
      return h('div', { class: [props.size, 'b-dialog'] }, [
        h(
          'article',
          {
            class: ['modal-card', { card: props.asCard },  ...themeClasses.value, props.cardClass]
          },
          nodes
        )
      ]);
    };
  }
});
