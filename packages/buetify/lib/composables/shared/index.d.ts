import { PropType } from 'vue';
import { Eq } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
export declare type Remove = IO<void>;
export declare function getEqPropsDefinition<T>(eq?: Eq<T>): {
    eq: {
        type: PropType<Eq<T>>;
        default: import("fp-ts/lib/function").Lazy<Eq<T>>;
    };
};
export interface EqProps<T> {
    eq: Eq<T>;
}
