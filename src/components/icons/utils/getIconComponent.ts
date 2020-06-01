import { parse as faParse, icon as faIcon } from '@fortawesome/fontawesome-svg-core';
import { h, SetupContext } from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
// @ts-ignore
import { convert } from '@fortawesome/vue-fontawesome/src/converter';
// @ts-ignore
import { objectWithKey, classList } from '@fortawesome/vue-fontawesome/src/utils';
import { camelize } from '../../../utils/helpers';
import { mergeClasses } from '../../../utils/mergeClasses';
import { BIcon } from '../../icon';

export function getIconComponent(name: string, iconDefinition: IconDefinition) {
  const icon = getFontAwesomeIconComponent(iconDefinition);
  return (_: any, { attrs }: SetupContext) => h(BIcon, { ...attrs, icon });
}

export function getFontAwesomeIconComponent(icon: IconDefinition) {
  return (_: any, { attrs }: SetupContext) => h(FontAwesomeIcon, { ...attrs, icon });
}

// Until Vue Font Awesome support v3

export function FontAwesomeIcon(props: any, { attrs }: SetupContext) {
  const { icon: iconArgs, mask: maskArgs, symbol, title } = props;
  const icon = normalizeIconArgs(iconArgs);
  const classes = objectWithKey('classes', classList(props));
  const transform = objectWithKey(
    'transform',
    typeof props.transform === 'string' ? faParse.transform(props.transform) : props.transform
  );
  const mask = objectWithKey('mask', normalizeIconArgs(maskArgs));

  const renderedIcon = faIcon(icon, { ...classes, ...transform, ...mask, symbol, title });

  const { abstract } = renderedIcon;

  return convert(abstract[0], {}, attrs);
}

function convert(element: any, props: any = {}, data: any = {}) {
  const children = (element.children || []).map(h);

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
    { class: {}, style: {} } as any
  );

  const { class: dClass = {}, style: dStyle = {}, ...remainingData } = data;
  const { class: mClass = {}, style: mStyle = {}, ...mRemainingData } = mixins;
  if (typeof element === 'string') {
    return element;
  } else {
    return h(
      element.tag,
      {
        class: mergeClasses(mClass, dClass),
        style: { ...mStyle, ...dStyle },
        ...mRemainingData,
        ...remainingData,
        ...props
      },
      children
    );
  }
}

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
    }, {} as any);
}

function classToObject(cls: string) {
  return cls.split(/\s+/).reduce((acc, c) => {
    acc[c] = true;

    return acc;
  }, {} as any);
}
