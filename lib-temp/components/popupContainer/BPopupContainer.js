import { eq, eqNumber } from 'fp-ts/lib/Eq';
import { defineComponent, h } from 'vue';
import { formatTransition } from '../../composables/transition';
import { alwaysEmptyArray, removeListItem } from '../../utils/helpers';
export const eqPopup = eq.contramap(eqNumber, popup => popup.id);
export const removePopup = removeListItem(eqPopup);
const SEMAPHORE = {
    id: -1,
    transition: { name: 'fade' },
    render: alwaysEmptyArray
};
const BPopupContainer = defineComponent({
    name: 'b-popup-container',
    data: () => ({
        id: 0,
        popups: [SEMAPHORE]
    }),
    computed: {
        rootZIndex() {
            return this.popups.length <= 1 ? -1 : 1;
        }
    },
    methods: {
        showPopup(options) {
            const popup = { id: this.id++, render: options.render, transition: formatTransition(options.transition) };
            this.addPopup(popup);
            return () => {
                this.removePopup(popup);
            };
        },
        addPopup(popup) {
            this.popups.splice(this.popups.length - 1, 0, popup);
        },
        removePopup(popup) {
            this.popups = removePopup(popup, this.popups);
        },
        generatePopup(popup, index) {
            return h('div', { key: index, style: { 'z-index': index } }, [h('transition', popup.transition, popup.render())]);
        }
    },
    render() {
        return h('div', { style: { 'z-index': this.rootZIndex } }, this.popups.map(this.generatePopup));
    }
});
export default BPopupContainer;
//# sourceMappingURL=BPopupContainer.js.map