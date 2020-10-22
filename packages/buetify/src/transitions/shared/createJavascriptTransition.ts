import {
  FunctionalComponent,
  SetupContext,
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
): FunctionalComponent {
  return (dynamicProps: TransitionProps, { slots }: SetupContext) => {
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

export function createJavascriptTransitionGroup(name: string, staticProps: TransitionGroupProps): FunctionalComponent {
  return (dynamicProps: TransitionGroupProps, { slots }: SetupContext) => {
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
