import './horizontal-expansion-icon.sass';
import Vue, { VNode } from 'vue';
import { mergeVNodeClasses } from '../../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../../utils/mergeVNodeStaticClass';
import { AngleRightIcon } from '../angleRight';

export default Vue.extend({
  name: 'HorizontalExpansionIcon',
  functional: true,
  props: {
    isExpanded: {
      type: Boolean,
      required: true
    }
  },
  render(h, { data, props }): VNode {
    return h(AngleRightIcon, {
      ...data,
      staticClass: mergeVNodeStaticClass('horizontal-expansion-icon', data.staticClass),
      class: mergeVNodeClasses(data.class, {
        'is-expanded': props.isExpanded
      })
    });
  }
});
