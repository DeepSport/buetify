import { constant, constVoid } from 'fp-ts/lib/function';
import { getOrElse, isNone, none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { formatTransition } from '../../../composables/transition';
import { defineComponent, h } from 'vue';
import { alwaysEmptyArray } from '../../../utils/helpers';
const BNoticeContainer = defineComponent({
  name: 'b-notice-container',
  data: () => ({
    id: 0,
    notice: none
  }),
  computed: {
    rootZIndex() {
      return isNone(this.notice) ? -1 : 1;
    },

    extractedNotice() {
      return pipe(this.notice, getOrElse(constant({
        transition: {
          name: 'fade'
        },
        render: alwaysEmptyArray
      })));
    }

  },
  methods: {
    addNotice(options) {
      const notice = {
        render: options.render,
        transition: formatTransition(options.transition)
      };
      this.notice = some(notice);
      return () => {
        this.notice = none;
      };
    },

    showNotice(params) {
      if (params.shouldQueue && !isNone(this.notice)) {
        setTimeout(() => this.showNotice(params), 250);
        return constVoid;
      }

      const removeNotice = this.addNotice(params);

      if (params.duration === 0) {
        return removeNotice;
      } else {
        setTimeout(removeNotice, params.duration);
        return constVoid;
      }
    },

    generateNotice() {
      return h('transition', this.extractedNotice.transition, this.extractedNotice.render());
    }

  },

  render() {
    return h('div', {
      style: {
        'z-index': this.rootZIndex
      }
    }, [this.generateNotice()]);
  }

});
export default BNoticeContainer;
//# sourceMappingURL=BNoticeContainer.js.map