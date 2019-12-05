import 'bulma/sass/components/message.sass';
import 'bulma/sass/elements/notification.sass';
import "../../../src/sass/helpers/animations.sass";
import "../../../src/components/message/message.sass";
import { useMessage, UseMessagePropsDefinition } from '../../composables/message';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { defineComponent, h, Transition, computed } from 'vue';

function generateBody(props, context, message) {
  const nodes = [];

  if (!!message.icon.value && props.useIcon) {
    nodes.push(h('div', {
      class: 'media-left'
    }, [h(message.icon.value, {
      size: message.iconSize.value,
      variant: props.variant,
      class: props.variant
    })]));
  }

  nodes.push(h('div', {
    class: 'media-content'
  }, context.slots.default && context.slots.default() || props.message));
  return h('section', {
    class: 'message-body',
    'aria-label': 'Close message'
  }, [h('div', {
    class: 'media'
  }, nodes)]);
}

function generateHeader(props, context, message) {
  const nodes = context.slots.title ? context.slots.title() : props.title ? [props.title] : [];

  if (props.isClosable) {
    nodes.push(h('button', {
      class: 'delete',
      attrs: {
        'aria-label': `Close message`
      },
      ...message.listeners
    }));
  }

  return h('header', {
    class: 'message-header'
  }, nodes);
}

function generateMessage(props, context, message) {
  return h('article', {
    class: ['message', props.variant, props.size]
  }, context.slots.title || !!props.title ? [generateHeader(props, context, message), generateBody(props, context, message)] : [generateBody(props, context, message)]);
}

export default defineComponent({
  name: 'b-message',
  props: { ...UseMessagePropsDefinition,
    ...FadeTransitionPropsDefinition
  },

  setup(props, context) {
    const message = useMessage(props);
    const transition = useTransition(props);
    const showMessage = computed(() => message.isOn.value || props.title === undefined && !!context.slots.title);
    return () => h(Transition, transition.value, () => showMessage.value ? generateMessage(props, context, message) : undefined);
  }

});
//# sourceMappingURL=BMessage.js.map