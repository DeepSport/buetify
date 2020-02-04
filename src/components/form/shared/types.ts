import { AsyncComponent, Component } from "vue/types/options";

export interface InputIcons {
  isSuccess?:
    | Component<any, any, any, any>
    | AsyncComponent<any, any, any, any>;
  isDanger?: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
  isWarning?:
    | Component<any, any, any, any>
    | AsyncComponent<any, any, any, any>;
  isInfo?: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
  passwordVisible?:
    | Component<any, any, any, any>
    | AsyncComponent<any, any, any, any>;
  passwordInvisible?:
    | Component<any, any, any, any>
    | AsyncComponent<any, any, any, any>;
}

export interface NumberInputIcons {
  minus: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
  plus: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
}
