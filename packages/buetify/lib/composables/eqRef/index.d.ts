import { Eq } from 'fp-ts/lib/Eq';
import { Ref } from 'vue';
export declare function useEqRef<A>(eq: Eq<A>): (v: A) => Ref<A>;
