import { h, SetupContext } from 'vue';

export function getSimpleFunctionalComponent(cls: string, el = 'div') {
  return function(props: { tag?: string }, { slots }: SetupContext) {
    return h(props.tag ?? el, { class: cls }, slots.default ? slots.default() : undefined);
  };
}
