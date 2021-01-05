import './pageloader.sass';
import { h, SetupContext } from 'vue';
import BTitle from '../title/BTitle';

export default function BPageLoader(props: { text?: string }, { slots }: SetupContext) {
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
}
