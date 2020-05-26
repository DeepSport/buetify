import { Eq, eq, eqNumber } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import { VNode, defineComponent, h } from 'vue';
import { formatTransition } from '../../mixins/fadeTransition/FadeTransitionMixin';
import { Transition, TransitionClasses } from '../../types/Transition';
import { alwaysEmptyArray, removeListItem } from '../../utils/helpers';

export interface PopupOptions {
  transition: Transition;
  render: IO<VNode[]>;
}

export interface Popup extends PopupOptions {
  transition: TransitionClasses;
  id: number;
}

export const eqPopup: Eq<Popup> = eq.contramap(eqNumber, popup => popup.id);

export const removePopup = removeListItem(eqPopup);

const SEMAPHORE: Popup = {
  id: -1,
  transition: { name: 'fade' },
  render: alwaysEmptyArray
};

const BPopupContainer = defineComponent({
  name: 'b-popup-container',
  data: () => ({
    id: 0,
    popups: [SEMAPHORE] as Array<Popup>
  }),
  computed: {
    rootZIndex(): -1 | 1 {
      return this.popups.length <= 1 ? -1 : 1;
    }
  },
  methods: {
    showPopup(options: PopupOptions): IO<void> {
      const popup = { id: this.id++, render: options.render, transition: formatTransition(options.transition) };
      this.addPopup(popup);
      return () => {
        this.removePopup(popup);
      };
    },
    addPopup(popup: Popup): void {
      this.popups.splice(this.popups.length - 1, 0, popup);
    },
    removePopup(popup: Popup): void {
      this.popups = removePopup(popup, this.popups);
    },
    generatePopup(popup: Popup, index: number): VNode {
      return h('div', { key: index, style: { 'z-index': index } }, [h('transition', popup.transition, popup.render())]);
    }
  },
  render(): VNode {
    return h('div', { style: { 'z-index': this.rootZIndex } }, this.popups.map(this.generatePopup));
  }
});

export type PopupContainer = InstanceType<typeof BPopupContainer>;

export default BPopupContainer;
