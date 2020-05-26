import './dialog.sass';
import { getUseThemePropsDefinition, useTheme } from '../../composables/theme';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType, VNode, defineComponent, Slots, h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';
import { DialogTheme } from './theme';

function generateHeader(slots: Slots) {
  return h('header', { staticClass: 'modal-card-head' }, slots.header!());
}

function generateFooter(slots: Slots) {
  return h('footer', { staticClass: 'modal-card-foot' }, slots.footer!(undefined));
}

function generateBody(slots: Slots) {
  return h('section', { staticClass: 'modal-card-body' }, slots.default!(undefined));
}
export default defineComponent({
  name: 'b-dialog-content',
  props: {
    ...getUseThemePropsDefinition(DialogTheme, true),
    size: {
      type: String as PropType<SizeVariant>,
      required: false
    },
    cardClass: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup(props, { slots }) {
    const { themeClasses } = useTheme(props);
    return () => {
      const nodes: VNode[] = [];
      if (slots.header) {
        nodes.push(generateHeader(slots));
      }
      nodes.push(generateBody(slots));
      if (slots.footer) {
        nodes.push(generateFooter(slots));
      }
      return h('div', { class: mergeClasses(props.size, 'b-dialog') }, [
        h(
          'article',
          {
            class: mergeClasses(props.cardClass, themeClasses.value)
          },
          nodes
        )
      ]);
    };
  }
});
