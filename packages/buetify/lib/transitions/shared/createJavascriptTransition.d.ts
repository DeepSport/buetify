import { FunctionalComponent } from 'vue';
export interface JavascriptTransitionProps {
    mode?: string;
}
export declare function createJavascriptTransition(name: string, functions: Record<string, any>, mode?: string): FunctionalComponent;
export declare function createJavascriptTransitionGroup(name: string, functions: Record<string, any>, mode?: string): FunctionalComponent;
