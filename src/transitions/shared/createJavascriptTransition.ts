import { FunctionalComponent, SetupContext, h, Transition, TransitionGroup } from 'vue';

export interface JavascriptTransitionProps {
  mode?: string;
}

export function createJavascriptTransition(
  name: string,
  functions: Record<string, any>,
  mode = 'in-out'
): FunctionalComponent {
  return (props: JavascriptTransitionProps, { attrs, slots }: SetupContext) => {
    return h(
      Transition,
      {
        mode: props.mode ?? mode,
        ...functions,
        ...attrs
      },
      slots.default
    );
  };
}

export function createJavascriptTransitionGroup(
  name: string,
  functions: Record<string, any>,
  mode = 'in-out'
): FunctionalComponent {
  return (props: JavascriptTransitionProps, { attrs, slots }: SetupContext) => {
    return h(
      TransitionGroup,
      {
        mode: props.mode ?? mode,
        ...functions,
        ...attrs
      },
      slots.default
    );
  };
}
