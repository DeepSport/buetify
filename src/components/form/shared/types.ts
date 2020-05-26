import { Component } from 'vue';

export interface InputIcons {
  isSuccess?: Component;
  isDanger?: Component;
  isWarning?: Component;
  isInfo?: Component;
  passwordVisible?: Component;
  passwordInvisible?: Component;
}

export interface NumberInputIcons {
  minus: Component;
  plus: Component;
}
