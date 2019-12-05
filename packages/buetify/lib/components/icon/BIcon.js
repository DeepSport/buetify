import "../../../src/components/icon/icon.sass";
import { isString } from '../../utils/helpers';
import { h, defineComponent } from 'vue';

function convertVariant(variant) {
  if (isString(variant)) {
    return variant.replace('is', 'has-text');
  } else {
    // eslint-disable-next-line
    const x = {};

    for (const k in variant) {
      const nk = k.replace('is', 'has-text');
      x[nk] = variant[k];
    }

    return x;
  }
}

export const BIconPropsDefinition = {
  variant: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: 'span'
  }
};
export default defineComponent({
  name: 'b-icon',
  props: BIconPropsDefinition,

  setup(props, {
    slots
  }) {
    return () => h( // eslint-disable-next-line
    props.tag, {
      class: ['icon', props.size, convertVariant(props.variant)]
    }, // eslint-disable-next-line
    slots.default && slots.default());
  }

});
//# sourceMappingURL=BIcon.js.map