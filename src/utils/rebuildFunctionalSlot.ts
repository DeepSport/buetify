import { fromNullable, map, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { CreateElement, VNode } from 'vue';

export function rebuildFunctionalSlots(slots: { [key: string]: VNode[] | undefined }, h: CreateElement) {
  const children: VNode[] = [];

  for (const slot in slots) {
    if (slots.hasOwnProperty(slot)) {
      children.push(h('template', { slot }, slots[slot]));
    }
  }

  return children;
}

export function rebuildFunctionalSlot(
  slots: { [key: string]: VNode[] | undefined },
  h: CreateElement,
  name: string
): Option<VNode> {
  return pipe(
    fromNullable(slots[name]),
    map(children => h('template', { slot: name }, children))
  );
}
