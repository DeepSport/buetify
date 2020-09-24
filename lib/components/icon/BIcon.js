import "../../../src/components/icon/icon.sass";
import { isString } from '../../utils/helpers';
import { h } from 'vue';

function convertVariant(variant) {
  if (isString(variant)) {
    return variant.replace('is', 'has-text');
  } else {
    const x = {};

    for (const k in variant) {
      const nk = k.replace('is', 'has-text');
      x[nk] = variant[k];
    }

    return x;
  }
}

export default function BIcon(props, {
  attrs,
  slots
}) {
  var _a;

  return h((_a = props.tag) !== null && _a !== void 0 ? _a : 'span', Object.assign(Object.assign({}, attrs), {
    class: ['icon', props.size, {
      'is-hoverable': props.isHoverable
    }, convertVariant(props.variant || '')]
  }), slots.default());
}
//# sourceMappingURL=BIcon.js.map