import './pageloader.sass';
import { h, FunctionalComponent } from 'vue';
import BTitle from '../title/BTitle';

const BPageLoader_: FunctionalComponent<{ text?: string }> = function BPageLoader(props, { slots }) {
  return h(
    'div',
    {
      class: 'b-pageloader is-active'
    },
    slots.default
      ? h('div', { class: 'content' }, slots.default())
      : props.text
      ? h(
          'div',
          { class: 'content' },
          h(BTitle, () => props.text)
        )
      : undefined
  );
};

export default BPageLoader_;
