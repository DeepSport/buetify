import { eq, eqNumber } from 'fp-ts/lib/Eq';
import { defineComponent, h, Transition as transition, reactive, computed, nextTick } from 'vue';
import { formatTransition } from '../../composables/transition';
import { constEmptyArray, removeListItem } from '../../utils/helpers';
export const eqPopup = eq.contramap(eqNumber, popup => popup.id);
export const removePopup = removeListItem(eqPopup);
let id = 0;

function generatePopup(popup, index) {
  return h('div', {
    key: popup.id,
    style: {
      'z-index': index + 1
    }
  }, [h(transition, popup.transition, popup.render)]);
}

const BPopupContainer = defineComponent({
  name: 'b-popup-container',

  setup() {
    const popups = reactive([]);

    function showPopup(options) {
      const nid = id++;
      const popup = reactive({
        id: nid,
        render: constEmptyArray,
        transition: formatTransition(options.transition)
      });
      popups.push(popup);
      nextTick().then(() => {
        popup.render = options.render;
      });
      return () => {
        popup.render = constEmptyArray;
        setTimeout(() => {
          const index = popups.findIndex(p => p.id === nid);

          if (index > 0) {
            popups.splice(index, 1);
          }
        }, 250);
      };
    }

    const rootZ = computed(() => popups.length ? 1 : -1);
    return {
      showPopup,
      popups,
      rootZ
    };
  },

  render() {
    return h('div', {
      style: {
        'z-index': this.rootZ
      }
    }, this.rootZ ? this.popups.map(generatePopup) : undefined);
  }

});
export default BPopupContainer;
//# sourceMappingURL=BPopupContainer.js.map