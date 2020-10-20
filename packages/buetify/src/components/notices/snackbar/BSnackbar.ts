import '../../../sass/helpers/animations.sass';
import '../sass/notices.sass';
import { defineComponent } from 'vue';
import { SnackbarPropsDefinition, useSnackbar } from '../../../composables/snackbar';

export default defineComponent({
  name: 'b-snackbar',
  props: SnackbarPropsDefinition,
  setup(props, { slots }) {
    const controller = useSnackbar(props, slots);
    return () => slots.default && slots.default(controller);
  }
});
