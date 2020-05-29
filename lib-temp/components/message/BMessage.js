import './message.sass';
import { useMessage, UseMessagePropsDefinition } from '../../composables/message';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { defineComponent, h, Transition } from 'vue';
function generateBody(props, context, message) {
    const nodes = [];
    if (!!message.icon.value && props.useIcon) {
        nodes.push(h('div', { class: 'media-left' }, [
            h(message.icon.value, {
                size: message.iconSize.value,
                variant: props.variant,
                class: props.variant
            })
        ]));
    }
    nodes.push(h('div', { class: 'media-content' }, (context.slots.default && context.slots.default()) || props.message));
    return h('section', {
        class: 'message-body',
        'aria-label': 'Close message'
    }, [h('div', { class: 'media' }, nodes)]);
}
function generateHeader(props, context, message) {
    const nodes = (context.slots.header && context.slots.header()) || [h('h1', props.title)];
    if (props.isClosable) {
        nodes.push(h('button', {
            class: 'delete',
            attrs: { 'aria-label': `Close message` },
            ...message.listeners
        }));
    }
    return h('header', { class: 'message-header' }, nodes);
}
function generateMessage(props, context, message) {
    return h('article', { class: ['message', props.variant, props.size] }, context.slots.title || !!props.title
        ? [generateHeader(props, context, message), generateBody(props, context, message)]
        : [generateBody(props, context, message)]);
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
        return h(Transition, { ...transition.value }, message.isOn.value && generateMessage(props, context, message));
    }
});
//# sourceMappingURL=BMessage.js.map