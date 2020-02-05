export declare function mapVNodeListenersToNative(nativeEvent: string, vueEvent: string, existingListeners?: {
    [key: string]: Function | Function[];
}, disableVueEvent?: boolean): {
    [key: string]: Function | Function[];
} | undefined;
