import { h, SetupContext, FunctionalComponent } from 'vue';

export function getSimpleFunctionalComponent(cls: string, el = 'div'): FunctionalComponent<{ tag?: string }> {
  return function(props: { tag?: string }, { slots }: SetupContext) {
    return h(props.tag ?? el, { class: cls }, slots.default ? slots.default() : undefined);
  };
}
