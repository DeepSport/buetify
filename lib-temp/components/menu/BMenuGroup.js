import './menu.sass';
import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import VerticalExpandTransition from '../../transitions/verticalExpandTransition';
import { mergeClasses } from '../../utils/mergeClasses';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BMenuList from './BMenuList';
import { withDirectives, resolveDirective, defineComponent, h } from 'vue';
export default defineComponent({
    name: 'b-menu-group',
    props: Object.assign(Object.assign({}, getUseTogglePropsDefinition('isExpanded')), { menuLabelClass: {
            type: String,
            default: ''
        }, menuListClass: {
            type: String,
            default: ''
        } }),
    setup(props, { slots }) {
        const toggle = useToggle(props, 'isExpanded');
        const vShow = resolveDirective('show');
        return () => h('section', [
            h('button', Object.assign(Object.assign({ class: mergeClasses('is-flex flex-direction-row justify-content-space-between align-items-center is-fullwidth', props.menuLabelClass) }, toggle.listeners), toggle.attrs.value), [
                slots['menu-label'] && slots['menu-label'](),
                h(VerticalExpansionIcon, {
                    isExpanded: toggle.isOn.value
                })
            ]),
            h(VerticalExpandTransition, [
                withDirectives(h(BMenuList, {
                    class: props.menuListClass,
                    'aria-hidden': toggle.isOff.value
                }, slots.default && slots.default()), [[vShow, toggle.isOn.value]])
            ])
        ]);
    }
});
//# sourceMappingURL=BMenuGroup.js.map