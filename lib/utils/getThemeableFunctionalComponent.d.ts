import { SetupContext } from '@vue/runtime-core';
import { ThemeInjection, ThemeProps } from '../composables/theme';
import { ThemeColorMap } from '../types/ThemeColorMap';
import { Classes } from './mergeClasses';
export interface ThemeableComponentOptions {
    cls: string;
    el?: string;
    themeMap?: ThemeColorMap;
}
export interface ThemeableComponentProps extends Partial<ThemeProps> {
    tag?: string;
}
export declare function isThemeable(props: Partial<ThemeProps>, injection: ThemeInjection): boolean;
export declare function getThemeClassesFromContext(props: ThemeProps, injection: ThemeInjection, context: SetupContext): Classes;
export declare function getThemeableFunctionalComponent({ cls, el, themeMap }: ThemeableComponentOptions): (props: ThemeableComponentProps, context: SetupContext) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
