import { parse as faParse, icon as faIcon } from '@fortawesome/fontawesome-svg-core';
import { h, SetupContext, VNode, FunctionalComponent } from 'vue';
// import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { camelize } from '../../../utils/helpers';
import { mergeClasses } from '../../../utils/mergeClasses';
import { BIcon } from '../../icon';
import { BIconProps } from '../../icon/BIcon';

//replace iconDefinition with actual definition from fontawesome. causing some typescript issues at the moment

function objectWithKey(key: string, value: unknown) {
  return (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value) ? { [key]: value } : {};
}

// eslint-disable-next-line
export function classList(props: any) {
  const classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-inverse': props.inverse,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`fa-${props.size}`]: props.size !== undefined,
    [`fa-rotate-${props.rotation}`]: props.rotation !== undefined,
    [`fa-pull-${props.pull}`]: props.pull !== undefined,
    'fa-swap-opacity': props.swapOpacity
  };

  return Object.keys(classes)
    .map(key => (classes[key] ? key : null))
    .filter(key => key);
}

function styleToObject(style: string) {
  return style
    .split(';')
    .map(s => s.trim())
    .filter(s => s)
    .reduce((acc, pair) => {
      const i = pair.indexOf(':');
      const prop = camelize(pair.slice(0, i));
      const value = pair.slice(i + 1).trim();

      acc[prop] = value;

      return acc;
    }, {} as any); // eslint-disable-line
}

function classToObject(cls: string) {
  return cls.split(/\s+/).reduce((acc, c) => {
    acc[c] = true;

    return acc;
  }, {} as any); // eslint-disable-line
}

// eslint-disable-next-line
function normalizeIconArgs(icon: any) {
  if (icon === null) {
    return null;
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon };
  }
}

// eslint-disable-next-line
function convert(element: any, attrs: any = {}): VNode {
  if (typeof element === 'string') {
    return h(element);
  }

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = element.attributes[key];

      switch (key) {
        case 'class':
          acc['class'] = classToObject(val);
          break;
        case 'style':
          acc['style'] = styleToObject(val);
          break;
        default:
          acc[key] = val;
      }

      return acc;
    },
    { class: {}, style: {} } as any // eslint-disable-line
  );
  const { class: dClass = {}, style: dStyle = {}, ...remainingData } = attrs;
  const { class: mClass = {}, style: mStyle = {}, ...mRemainingData } = mixins;
  return h(
    element.tag,
    {
      ...attrs,
      class: mergeClasses(mClass, dClass),
      style: { ...mStyle, ...dStyle },
      ...mRemainingData,
      ...remainingData
    },
    (element.children || []).map(convert)
  );
}

// eslint-disable-next-line
export function useFontAwesomeIconComponent(iconArgs: any): FunctionalComponent {
  return function FontAwesomeIcon(_, { attrs }: SetupContext): VNode {
    const { mask: maskArgs, symbol, title } = attrs as any; // eslint-disable-line
    const icon = normalizeIconArgs(iconArgs);
    const classes = objectWithKey('classes', classList(attrs));
    const transform = objectWithKey(
      'transform',
      typeof attrs.transform === 'string' ? faParse.transform(attrs.transform) : attrs.transform
    );
    const mask = objectWithKey('mask', normalizeIconArgs(maskArgs));

    const { abstract } = faIcon(icon, { ...classes, ...transform, ...mask, symbol, title });
    return convert(abstract[0], attrs);
  };
}

// eslint-disable-next-line
export function useIconComponent(name: string, iconDefinition: any): FunctionalComponent {
  const icon = useFontAwesomeIconComponent(iconDefinition);
  return function IconComponent(props: BIconProps) {
    return h(BIcon, props, () => h(icon, { class: props.size }));
  };
}
