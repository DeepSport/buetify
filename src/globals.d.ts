import { VueConstructor, ComponentOptions, FunctionalComponentOptions, VNodeData } from 'vue';
import { CombinedVueInstance, Vue } from 'vue/types/vue';
import {
  RecordPropsDefinition,
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps
} from 'vue/types/options';
import { MetaInfo } from 'vue-meta/types';
import { TouchStoredHandlers } from './directives/touch';

declare global {
  interface Window {
    Vue: VueConstructor;
  }

  interface HTMLCollection {
    [Symbol.iterator](): IterableIterator<Element>;
  }

  interface Element {
    getElementsByClassName(classNames: string): NodeListOf<HTMLElement>;
  }

  interface HTMLElement {
    _clickOutside?: EventListenerOrEventListenerObject;
    _onResize?: {
      callback: () => void;
      options?: boolean | AddEventListenerOptions;
    };
    _observe?: {
      init: boolean;
      observer: IntersectionObserver;
    };
    _mutate?: {
      observer: MutationObserver;
    };
    _touchHandlers?: {
      [_uid: number]: TouchStoredHandlers;
    };
  }

  interface WheelEvent {
    path?: EventTarget[];
  }

  function parseInt(s: string | number, radix?: number): number;
  function parseFloat(string: string | number): number;

  export type Dictionary<T> = Record<string, T>;
}

declare module 'vue/types/vnode' {
  export interface VNodeData {
    model?: {
      callback: (v: any) => void;
      expression: string;
      value: any;
    };
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    head?: MetaInfo | (() => MetaInfo);
  }
}

declare module 'vue/types/vue' {
  export type OptionsVue<Instance extends Vue, Data, Methods, Computed, Props, Options = {}> = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue,
    Options
  >;

  export interface Vue {
    _uid: number;
    _isDestroyed: boolean;
  }

  interface VueConstructor<V extends Vue = Vue, Options = Record<string, any>> {
    version: string;
    options: Options;

    extend<Data, Methods, Computed, Options, PropNames extends string = never>(
      options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames> & Options
    ): OptionsVue<V, Data, Methods, Computed, Record<PropNames, any>, Options>;
    extend<Data, Methods, Computed, Props, Options>(
      options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props> & Options
    ): OptionsVue<V, Data, Methods, Computed, Props, Options>;
    extend<Options, PropNames extends string = never>(
      definition: FunctionalComponentOptions<Record<PropNames, any>, PropNames[]> & Options
    ): OptionsVue<V, {}, {}, {}, Record<PropNames, any>, Options>;
    extend<Props, Options>(
      definition: FunctionalComponentOptions<Props, RecordPropsDefinition<Props>> & Options
    ): OptionsVue<V, {}, {}, {}, Props, Options>;
    extend<V extends Vue = Vue>(options?: ComponentOptions<V> & Options): OptionsVue<V, {}, {}, {}, {}, Options>;
  }
}
