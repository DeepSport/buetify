import { isEmpty } from 'fp-ts/lib/Array';
import { Eq, eq, eqNumber } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import Vue, { VNode } from 'vue';
import { formatTransition } from '../../mixins/fadeTransition/FadeTransitionMixin';
import { Transition, TransitionClasses } from '../../types/Transition';
import { remove } from '../../utils/helpers';

export interface PopupOptions {
  transition: Transition;
  render: IO<VNode[]>;
}

export interface Popup extends PopupOptions {
  transition: TransitionClasses;
  id: number;
}

export const eqPopup: Eq<Popup> = eq.contramap(eqNumber, popup => popup.id);

export const removePopup = remove(eqPopup);

// const SEMAPHORE: Popup = {
//   id: -1,
//   transition: { name: 'fade' },
//   render: alwaysEmptyArray
// };

export default Vue.extend({
  name: 'BPopupContainer',
  data: () => ({
    id: 0,
    popups: [] as Array<Popup>
  }),
  computed: {
    rootZIndex(): -1 | 1 {
      return isEmpty(this.popups) ? -1 : 1;
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
      this.popups = removePopup(popup, this.popups);
    },
    generatePopup(popup: Popup, index: number): VNode {
      return this.$createElement('div', { key: index, style: { 'z-index': index } }, [
        this.$createElement('transition', { props: popup.transition }, popup.render())
      ]);
    }
  },
  render(h): VNode {
    return h('div', { style: { 'z-index': this.rootZIndex } }, this.popups.map(this.generatePopup));
  }
});
