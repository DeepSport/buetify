import { Component } from 'vue';
export interface InputIcons {
    isSuccess: Component;
    isDanger: Component;
    isWarning: Component;
    isInfo: Component;
    passwordVisible: Component;
    passwordInvisible: Component;
}
export declare const DEFAULT_INPUT_ICONS: InputIcons;
export declare function getInputIcons(icons: Partial<InputIcons>): InputIcons;
export interface NumberInputIcons {
    minus: Component;
    plus: Component;
}
export declare const DEFAULT_NUMBER_INPUT_ICONS: NumberInputIcons;
export declare function getNumberInputIcons(icons: Partial<NumberInputIcons>): NumberInputIcons;
