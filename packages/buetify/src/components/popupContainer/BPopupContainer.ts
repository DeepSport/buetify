import { Eq, eq, eqNumber } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import { VNode, defineComponent, h, Transition as transition } from 'vue';
import { formatTransition } from '../../composables/transition';
import { Transition, TransitionClasses } from '../../types/Transition';
import { removeListItem } from '../../utils/helpers';

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

const BPopupContainer = defineComponent({
  name: 'b-popup-container',
  data: () => ({
    id: 0,
    popups: [] as Array<Popup>
  }),
  computed: {
    rootZIndex(): -1 | 1 {
      return this.popups.length ? 1 : -1;
    }
  },
  watch: {
    popups: function(newVal, oldVal) {
      console.log(newVal, oldVal);
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
      this.popups.push(popup);
    },
    removePopup(popup: Popup): void {
      console.log('removing popup', popup);
      this.popups = removePopup(popup, this.popups);
    },
    generatePopup(popup: Popup, index: number): VNode {
      return h('div', { key: popup.id, style: { 'z-index': index + 1 } }, [
        h(transition, popup.transition, popup.render)
      ]);
    }
  },
  render(): VNode {
    return h(
      'div',
      { style: { 'z-index': this.rootZIndex } },
      this.rootZIndex ? this.popups.map(this.generatePopup) : undefined
    );
  }
});

export type PopupContainer = InstanceType<typeof BPopupContainer>;

export default BPopupContainer;