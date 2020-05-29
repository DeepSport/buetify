import './overlay.sass';
import { mergeClasses } from '../../utils/mergeClasses';
import { h, withDirectives, resolveDirective } from 'vue';
export default function BOverlay(props, { attrs, slots }) {
    const vShow = resolveDirective('show');
    if (!!props.isFullscreen) {
        return withDirectives(h('div', {
            ...attrs,
            class: mergeClasses(attrs.class, ['b-overlay', props.position])
        }, [
            h('div', {
                class: 'b-overlay-content is-fullscreen'
            }, slots.default && slots.default())
        ]), [[vShow, !!props.isActive]]);
    }
    else {
        return withDirectives(h('div', {
            class: mergeClasses(attrs.class, ['b-overlay', props.position])
        }, [
            h('div', {
                ...attrs,
                class: 'b-overlay-background'
            }),
            h('div', {
                class: 'b-overlay-content'
            }, slots.default && slots.default())
        ]), [[vShow, !!props.isActive]]);
    }
}
//# sourceMappingURL=BOverlay.js.map