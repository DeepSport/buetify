import './tag.sass';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { h, Component, SetupContext } from 'vue';

export interface BTagListProps {
  isAttached?: boolean;
  tag?: string | Component;
}

export default function BTagList(props: BTagListProps, { attrs, slots }: SetupContext) {
  attrs.class = mergeClasses(attrs.class as Classes, ['tags', { 'has-addons': !!props.isAttached }]);
  return h(props.tag ?? ('div' as any), attrs, slots.default!());
}
