import Vue, { VNode } from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
export declare function getIconComponent(name: string, iconDefinition: IconDefinition): import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, Record<never, any>, {
    name: string;
    functional: boolean;
    render(h: import("vue").CreateElement, { data }: import("vue").RenderContext<Record<never, any>>): VNode;
}>;
export declare function getFontAwesomeIconComponent(icon: IconDefinition): import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, Record<never, any>, {
    functional: boolean;
    render(h: import("vue").CreateElement, data: import("vue").RenderContext<Record<never, any>>): VNode;
}>;
