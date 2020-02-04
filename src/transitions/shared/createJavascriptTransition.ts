import { FunctionalComponentOptions, VNode } from 'vue';

export function createJavascriptTransition(
  name: string,
  functions: Record<string, any>,
  mode = 'in-out'
): FunctionalComponentOptions {
  return {
    name,
    functional: true,
    props: {
      mode: {
        type: String,
        default: mode
      }
    },

    render(h, context): VNode {
      const data = {
        props: {
          ...context.props,
          name
        },
        on: functions
      };
      return h('transition', data, context.children);
    }
  };
}

export function createJavaScriptTransitionGroup(
  name: string,
  functions: Record<string, any>,
  mode = 'in-out'
): FunctionalComponentOptions {
  return {
    name,
    functional: true,
    props: {
      mode: {
        type: String,
        default: mode
      }
    },
    render(h, context): VNode {
      const data = {
        props: {
          ...context.props,
          name
        },
        on: functions
      };
      return h('transition-group', data, context.children);
    }
  };
}
