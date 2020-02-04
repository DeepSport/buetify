import { VNodeDirective } from 'vue';

export function mergeVNodeDirectives(
  existingDirectives: VNodeDirective[] | undefined,
  newDirectives: VNodeDirective[]
): VNodeDirective[] {
  return Array.isArray(existingDirectives) ? existingDirectives.concat(newDirectives) : newDirectives;
}
