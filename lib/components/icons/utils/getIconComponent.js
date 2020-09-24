var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import { parse as faParse, icon as faIcon } from '@fortawesome/fontawesome-svg-core';
import { h } from 'vue';
import { camelize } from '../../../utils/helpers';
import { mergeClasses } from '../../../utils/mergeClasses';
import { BIcon } from '../../icon'; //replace iconDefinition with actual definition from fontawesome. causing some typescript issues at the moment

export function getIconComponent(name, iconDefinition) {
  const icon = getFontAwesomeIconComponent(iconDefinition);
  return function IconComponent(props, {
    attrs
  }) {
    return h(BIcon, Object.assign(Object.assign({}, props), attrs), () => h(icon, {
      class: props.size
    }));
  };
}
export function getFontAwesomeIconComponent(iconArgs) {
  return function FontAwesomeIcon(_, {
    attrs
  }) {
    const {
      mask: maskArgs,
      symbol,
      title
    } = attrs;
    const icon = normalizeIconArgs(iconArgs);
    const classes = objectWithKey('classes', classList(attrs));
    const transform = objectWithKey('transform', typeof attrs.transform === 'string' ? faParse.transform(attrs.transform) : attrs.transform);
    const mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
    const {
      abstract
    } = faIcon(icon, Object.assign(Object.assign(Object.assign(Object.assign({}, classes), transform), mask), {
      symbol,
      title
    }));
    return convert(abstract[0], attrs);
  };
}

function convert(element, attrs = {}) {
  if (typeof element === 'string') {
    return h(element);
  }

  const mixins = Object.keys(element.attributes || {}).reduce((acc, key) => {
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
  }, {
    class: {},
    style: {}
  });

  const {
    class: dClass = {},
    style: dStyle = {}
  } = attrs,
        remainingData = __rest(attrs, ["class", "style"]);

  const {
    class: mClass = {},
    style: mStyle = {}
  } = mixins,
        mRemainingData = __rest(mixins, ["class", "style"]);

  return h(element.tag, Object.assign(Object.assign(Object.assign(Object.assign({}, attrs), {
    class: mergeClasses(mClass, dClass),
    style: Object.assign(Object.assign({}, mStyle), dStyle)
  }), mRemainingData), remainingData), (element.children || []).map(convert));
}

function normalizeIconArgs(icon) {
  if (icon === null) {
    return null;
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return {
      prefix: icon[0],
      iconName: icon[1]
    };
  }

  if (typeof icon === 'string') {
    return {
      prefix: 'fas',
      iconName: icon
    };
  }
}

function styleToObject(style) {
  return style.split(';').map(s => s.trim()).filter(s => s).reduce((acc, pair) => {
    const i = pair.indexOf(':');
    const prop = camelize(pair.slice(0, i));
    const value = pair.slice(i + 1).trim();
    acc[prop] = value;
    return acc;
  }, {});
}

function classToObject(cls) {
  return cls.split(/\s+/).reduce((acc, c) => {
    acc[c] = true;
    return acc;
  }, {});
}

function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? {
    [key]: value
  } : {};
}

export function classList(props) {
  let classes = {
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
  return Object.keys(classes).map(key => classes[key] ? key : null).filter(key => key);
}
//# sourceMappingURL=getIconComponent.js.map