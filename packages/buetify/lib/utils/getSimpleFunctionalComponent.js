import { h } from 'vue';
export function getSimpleFunctionalComponent(cls, el = 'div') {
  return function (props, {
    slots
  }) {
    return h(props.tag ?? el, {
      class: cls
    }, slots.default ? slots.default() : undefined);
  };
}
//# sourceMappingURL=getSimpleFunctionalComponent.js.map