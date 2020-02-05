import { deepEqual } from '../../utils/helpers';
import { Eq } from 'fp-ts/lib/Eq';
import Vue from 'vue';
import { PropValidator } from 'vue/types/options';
export declare const EqMixin: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, {
    eq: Eq<any>;
}, {
    valueComparator: typeof deepEqual;
}, {
    name: string;
    props: {
        valueComparator: PropValidator<typeof deepEqual>;
    };
    computed: {
        eq(): Eq<any>;
    };
}>;
