import { constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { VNode } from 'vue';
import { formatTransition } from '../../../composables/transition';
import { Transition, TransitionClasses } from '../../../types/Transition';
import { defineComponent, h, Transition as transition, computed, reactive, nextTick } from 'vue';
import { constEmptyArray } from '../../../utils/helpers';

export interface NoticeOptions {
  render: IO<VNode[]>;
  duration: number;
  shouldQueue: boolean;
  transition: Transition;
}

export interface Notice {
  id: number;
  render: IO<VNode[] | undefined>;
  transition: TransitionClasses;
  onAfterLeave: IO<void>;
}

let id = 0;

function generateNotice(notice: Notice): VNode {
  return h(transition, { key: notice.id, ...notice.transition, onAfterLeague: notice.onAfterLeave }, notice.render);
}

const BNoticeContainer = defineComponent({
  name: 'b-notice-container',
  setup() {
    const notices = reactive([] as Notice[]);

    const rootZ = computed(() => (notices.length ? 1 : -1));

    function addNotice(options: NoticeOptions): IO<void> {
      const nId = id++;
      function remove() {
        const index = notices.findIndex(n => n.id === nId);
        if (index > -1) {
          console.log('removing notice', nId);
          notices.splice(index, 1);
        }
      }
      const newNotice: Notice = reactive({
        id: nId,
        render: constEmptyArray,
        transition: formatTransition(options.transition),
        onAfterLeave: remove
      });
      notices.push(newNotice);
      nextTick().then(() => {
        newNotice.render = options.render;
      });
      return remove;
    }

    function showNotice(params: NoticeOptions): IO<void> {
      if (params.shouldQueue && notices.length > 0) {
        let remove = constVoid;
        setTimeout(() => {
          remove = showNotice(params);
        }, 250);
        return () => {
          remove();
        };
      }
      const removeNotice = addNotice(params);
      if (params.duration === 0) {
        return removeNotice;
      } else {
        setTimeout(removeNotice, params.duration);
        return removeNotice;
      }
    }

    return {
      rootZ,
      showNotice,
      notices
    };
  },
  render() {
    return h('div', { style: { 'z-index': this.rootZ } }, this.notices.map(generateNotice));
  }
});

export type NoticeContainer = InstanceType<typeof BNoticeContainer>;

export default BNoticeContainer;
