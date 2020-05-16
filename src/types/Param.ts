import {Lazy} from 'fp-ts/lib/function';
import { Ref } from 'vue'

export type Param<T> = T | Ref<T> | Lazy<T>;
