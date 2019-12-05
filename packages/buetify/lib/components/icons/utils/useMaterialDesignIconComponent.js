import { defineComponent, shallowRef, h, watchEffect } from 'vue';
import { isString } from '../../../utils/helpers';
const SVG_STORE = new Map();

function isSVG(mimetype) {
  return isString(mimetype) ? mimetype.includes('svg') : false;
}

function load(src) {
  let r = SVG_STORE.get(src);

  if (!r) {
    return new Promise((resolve, reject) => {
      const request = new window.XMLHttpRequest();
      request.open('GET', src, true);

      request.onload = () => {
        const mimetype = request.getResponseHeader('content-type');

        if (request.status === 200) {
          if (isSVG(mimetype)) {
            r = Promise.resolve(request.response);
            SVG_STORE.set(src, r);
            resolve(request.response);
          } else {
            reject(`The file ${src} is not a valid SVG.`);
          }
        } else if (request.status >= 400 && request.status < 500) {
          reject(`The file ${src} do not exists.`);
        } else {
          reject(`Something bad happened trying to fetch ${src}.`);
        }
      };

      request.onerror = reject;
      request.onabort = reject;
      request.send();
    });
  } else {
    return r;
  }
}

export const SvgLoader = defineComponent({
  name: 'svg-loader',
  props: {
    src: {
      type: String,
      required: true
    },
    onLoad: {
      type: Function,
      required: false
    },
    onError: {
      type: Function,
      required: false
    }
  },

  setup(props) {
    const html = shallowRef(null);
    watchEffect(() => {
      html.value = null;
      load(props.src).then(svg => {
        html.value = svg;

        if (props.onLoad) {
          props.onLoad();
        }
      }).catch(e => {
        if (props.onError) {
          props.onError(e);
        }
      });
    });
    return () => h('i', {
      class: 'is-block is-fullwidth',
      innerHtml: html.value
    });
  }

});
//# sourceMappingURL=useMaterialDesignIconComponent.js.map