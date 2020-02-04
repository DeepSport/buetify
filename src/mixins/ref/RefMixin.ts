import Vue from 'vue';
import { isHTMLElement } from 'bue/components/utils/helpers';
import { filter, fromNullable, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

export const RefMixin = Vue.extend({
  name: 'RefMixin',
  methods: {
    getRefElement(ref: string): Option<HTMLElement> {
      return pipe(fromNullable(this.$refs[ref]), filter(isHTMLElement));
    }
  }
});
