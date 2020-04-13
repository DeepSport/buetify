import { isEmpty } from 'fp-ts/lib/Array';
import { constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { VNode } from 'vue';
import { Transition } from '../../../types/Transition';
import { applyMixins } from '../../../utils/applyMixins';
import BPopupContainer, { Popup } from '../../popupContainer/BPopupContainer';

export interface NoticeOptions {
  render: IO<VNode[]>;
  duration: number;
  shouldQueue: boolean;
  transition: Transition;
}

export default applyMixins(BPopupContainer).extend({
  name: 'BNoticeContainer',
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
    addPopup(popup: Popup) {
      this.popups.push(popup);
    },
    showNotice(params: NoticeOptions): IO<void> {
      if (params.shouldQueue && !isEmpty(this.popups)) {
        setTimeout(() => this.showNotice(params), 250);
        return constVoid;
      }
      const removeNotice = this.showPopup(params);
      if (params.duration === 0) {
        return removeNotice;
      } else {
        setTimeout(removeNotice, params.duration);
        return constVoid;
      }
    },
    generatePopup(popup: Popup, index: number): VNode {
      return this.$createElement('transition', { key: popup.id, props: popup.transition }, popup.render());
    }
  }
});
