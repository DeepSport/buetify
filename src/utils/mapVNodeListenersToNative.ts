export function mapVNodeListenersToNative(
  nativeEvent: string,
  vueEvent: string,
  existingListeners?: { [key: string]: Function | Function[] },
  disableVueEvent: boolean = false
): { [key: string]: Function | Function[] } | undefined {
  if (existingListeners === undefined) {
    return existingListeners;
  } else {
    const vueListeners = existingListeners[vueEvent];
    const nativeListeners = existingListeners[nativeEvent];
    if (vueListeners === undefined) {
      return existingListeners;
    } else {
      const normalizedNativeListeners: Function[] =
        nativeListeners === undefined ? [] : Array.isArray(nativeListeners) ? nativeListeners : [nativeListeners];
      const normalizedVueListeners: Function[] = Array.isArray(vueListeners) ? vueListeners : [vueListeners];
      return {
        ...existingListeners,
        [nativeEvent]: function(...args: any[]) {
          if (!disableVueEvent) {
            normalizedVueListeners.forEach(f => f.apply(null, args));
          }
          normalizedNativeListeners.forEach(f => f.apply(null, args));
        }
      };
    }
  }
}
