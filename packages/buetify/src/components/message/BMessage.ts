import './message.sass';
import { Message, useMessage, UseMessageProps, UseMessagePropsDefinition } from '../../composables/message';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { VNode, defineComponent, h, Transition, SetupContext, computed } from 'vue';

function generateBody(props: UseMessageProps, context: SetupContext, message: Message): VNode {
  const nodes: VNode[] = [];
  if (!!message.icon.value && props.useIcon) {
    nodes.push(
      h('div', { class: 'media-left' }, [
        h(message.icon.value as any, {
          size: message.iconSize.value,
          variant: props.variant,
          class: props.variant
        })
      ])
    );
  }
  nodes.push(h('div', { class: 'media-content' }, (context.slots.default && context.slots.default()) || props.message));
  return h(
    'section',
    {
      class: 'message-body',
      'aria-label': 'Close message'
    },
    [h('div', { class: 'media' }, nodes)]
  );
}

function generateHeader(props: UseMessageProps, context: SetupContext, message: Message): VNode {
  const nodes = context.slots.title ? context.slots.title() : props.title ? [(props.title as unknown) as VNode] : [];
  if (props.isClosable) {
    nodes.push(
      h('button', {
        class: 'delete',
        attrs: { 'aria-label': `Close message` },
        ...message.listeners
      })
    );
  }
  return h('header', { class: 'message-header' }, nodes);
}

function generateMessage(props: UseMessageProps, context: SetupContext, message: Message): VNode {
  return h(
    'article',
    { class: ['message', props.variant, props.size] },
    context.slots.title || !!props.title
      ? [generateHeader(props, context, message), generateBody(props, context, message)]
      : [generateBody(props, context, message)]
  );
}

export default defineComponent({
  name: 'b-message',
  props: {
    ...UseMessagePropsDefinition,
    ...FadeTransitionPropsDefinition
  },
  setup(props, context) {
    const message = useMessage(props);
    const transition = useTransition(props);
    const showMessage = computed(() => message.isOn.value || (props.title === undefined && !!context.slots.title));
    return () =>
      h(Transition, transition.value, () => (showMessage.value ? generateMessage(props, context, message) : undefined));
  }
});
