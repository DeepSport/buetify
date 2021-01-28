import {
  FunctionalComponent,
  h,
  Transition,
  TransitionGroup,
  TransitionProps,
  BaseTransitionProps,
  TransitionGroupProps,
  RendererElement
} from 'vue';

export function createJavascriptTransition<Element = RendererElement>(
  name: string,
  staticProps: BaseTransitionProps<Element>
): FunctionalComponent<TransitionProps> {
  return (dynamicProps, { slots }) => {
    return h(
      Transition,
      {
        name,
        ...staticProps,
        ...dynamicProps
      } as TransitionProps,
      slots.default
    );
  };
}

export function createJavascriptTransitionGroup(name: string, staticProps: TransitionGroupProps): FunctionalComponent<TransitionGroupProps> {
  return (dynamicProps, { slots }) => {
    return h(
      TransitionGroup,
      {
        name,
        ...staticProps,
        ...dynamicProps
      } as TransitionGroupProps,
      slots.default
    );
  };
}
