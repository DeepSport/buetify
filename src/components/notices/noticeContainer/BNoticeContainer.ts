import { constant, constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { getOrElse, isNone, none, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { VNode } from 'vue';
import { formatTransition } from '../../../composables/transition';
import { Transition, TransitionClasses } from '../../../types/Transition';
import { defineComponent, h } from 'vue';
import { alwaysEmptyArray } from '../../../utils/helpers';

export interface NoticeOptions {
  render: IO<VNode[]>;
  duration: number;
  shouldQueue: boolean;
  transition: Transition;
}

export interface Notice {
  render: IO<VNode[]>;
  transition: TransitionClasses;
}

const BNoticeContainer = defineComponent({
  name: 'b-notice-container',
  data: () => ({
    id: 0,
    notice: none as Option<Notice>
  }),
  computed: {
    rootZIndex(): -1 | 1 {
      return isNone(this.notice) ? -1 : 1;
    },
    extractedNotice(): Notice {
      return pipe(this.notice, getOrElse<Notice>(constant({ transition: { name: 'fade' }, render: alwaysEmptyArray })));
    }
  },
  methods: {
    addNotice(options: NoticeOptions): IO<void> {
      const notice = { render: options.render, transition: formatTransition(options.transition) };
      this.notice = some(notice);
      return () => {
        this.notice = none;
      };
    },
    showNotice(params: NoticeOptions): IO<void> {
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
    generateNotice(): VNode {
      return h('transition', this.extractedNotice.transition, this.extractedNotice.render());
    }
  },
  render(): VNode {
    return h('div', { style: { 'z-index': this.rootZIndex } }, [this.generateNotice()]);
  }
});

export type NoticeContainer = InstanceType<typeof BNoticeContainer>;

export default BNoticeContainer;
