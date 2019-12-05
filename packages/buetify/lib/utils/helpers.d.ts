import { VNode } from 'vue';
import { Eq } from 'fp-ts/lib/Eq';
/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export declare const isMobile: {
    Android: () => false | RegExpMatchArray | null;
    BlackBerry: () => false | RegExpMatchArray | null;
    iOS: () => false | RegExpMatchArray | null;
    Opera: () => false | RegExpMatchArray | null;
    Windows: () => false | RegExpMatchArray | null;
    any: () => false | RegExpMatchArray | null;
};
export declare function capitalizeFirstLetter(str: string): string;
export declare function keys<O>(o: O): Array<keyof O>;
export declare function deepEqual(a: any, b: any): boolean;
export declare function getNestedValue(obj: any, path: (string | number)[], fallback?: any): any;
export declare function getObjectValueByPath(obj: any, path: string, fallback?: any): any;
export declare function isBoolean(val: any): val is boolean;
export declare function isObject(obj: any): obj is object;
export declare function isFunction(obj: any): obj is Function;
export declare function isPrimitive(val: any): val is number | string | boolean;
export declare function isNil(arg: any): boolean;
export declare const exists: import("fp-ts/lib/function").Predicate<any>;
export declare function isString(arg: any): arg is string;
export declare function isNumber(arg: any): arg is number;
export declare function isHTMLElement(obj: any): obj is HTMLElement;
export declare const constEmptyArray: import("fp-ts/lib/function").Lazy<never[]>;
export declare const constNone: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/Option").Option<never>>;
export declare const constZero: import("fp-ts/lib/function").Lazy<number>;
export declare const constEmptyString: import("fp-ts/lib/function").Lazy<string>;
export declare function removeListItem<A>(E: Eq<A>): (a: A, as: A[]) => A[];
export declare function toggleListItem<A>(E: Eq<A>): (a: A, as: A[]) => A[];
export declare function isFragment(node: VNode): boolean;
export declare function isEmptyString(str: string): boolean;
export declare type Result<T, P> = P extends keyof T ? T[P] : P extends (item: T) => any ? ReturnType<P> : T;
export declare type Extractor<T> = string | ((item: T) => any);
export declare function extractProp<T, P extends (item: T) => any | keyof T>(extractor: Extractor<T>, item: T): Result<T, P>;
export declare function camelize(str: string): string;
