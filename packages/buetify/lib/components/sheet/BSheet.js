import "../../../src/sass/helpers/border-helpers.sass";
import "../../../src/sass/helpers/height-width-helpers.sass";
import "../../../src/components/sheet/sheet.sass";
import { h, defineComponent } from 'vue';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import BButton from '../button/BButton';
const IsLoadingButton = h(BButton, {
  size: 'is-large',
  variant: 'is-link',
  isOutlined: true,
  isLoading: true,
  class: 'is-borderless is-fullwidth'
});
export default defineComponent({
  name: 'b-sheet',
  props: { ...DefaultThemePropsDefinition,
    tag: {
      type: String,
      default: 'main'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = useTheme(props);
    return () => h(props.tag, {
      class: ['b-sheet', {
        'is-loading': props.isLoading
      }, ...themeClasses.value]
    }, props.isLoading ? slots.loading ? slots.loading() : IsLoadingButton : slots.default && slots.default());
  }

});
//# sourceMappingURL=BSheet.js.map