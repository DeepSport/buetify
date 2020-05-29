import './tag.sass';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
export default function BTag(props, { attrs, slots }) {
    if (!!props.isClosable) {
        attrs.class = mergeClasses(attrs.class, 'tags has-addons');
        return h(props.tag ?? 'span', attrs, [
            h('span', {
                class: ['tag', props.variant, props.size, { 'is-rounded': !!props.isRounded }]
            }, [h('span', { class: { 'has-ellipsis': !!props.hasEllipsis } }, slots.default && slots.default())]),
            h('button', {
                class: [
                    'clear-default-styles tag is-delete has-cursor-pointer',
                    props.size,
                    { 'is-rounded': !!props.isRounded }
                ],
                type: 'button',
                tabindex: !!props.isTabable ? 0 : false,
                disabled: !!props.isDisabled,
                onClick: !!props.isDisabled ? undefined : props.onClose
            })
        ]);
    }
    else {
        return h(props.tag ?? 'span', {
            ...attrs,
            class: mergeClasses(attrs.class, [
                'tag',
                props.variant,
                props.size,
                { 'is-rounded': !!props.isRounded }
            ])
        }, [
            h('span', { class: { 'has-ellipsis': !!props.hasEllipsis } }, slots.default && slots.default()),
            ...(!!props.isClosable
                ? [
                    h('button', {
                        class: [
                            'clear-default-styles tag is-delete has-cursor-pointer',
                            props.size,
                            { 'is-rounded': !!props.isRounded }
                        ],
                        type: 'button',
                        tabIndex: props.isTabable ? 0 : false,
                        disabled: !!props.isDisabled,
                        onClick: !!props.isDisabled ? undefined : props.onClose
                    })
                ]
                : [])
        ]);
    }
}
//# sourceMappingURL=BTag.js.map