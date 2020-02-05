import Vue from 'vue';
import { filter, fromNullable, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { isHTMLElement } from '../../utils/helpers';

export const RefMixin = Vue.extend({
  name: 'RefMixin',
  methods: {
    getRefElement(ref: string): Option<HTMLElement> {
      return pipe(fromNullable(this.$refs[ref]), filter(isHTMLElement));
    }
  }
});
