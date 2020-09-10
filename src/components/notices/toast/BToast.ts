import { UseNoticePropsDefinition } from '../../../composables/noticeController';
import { defineComponent } from 'vue';
import { useToast } from '../../../composables/toast';

export default defineComponent({
	name: 'b-toast',
	props: UseNoticePropsDefinition,
	setup(props, { slots }) {
		const controller = useToast(props, slots);
		return () => slots.default && slots.default(controller);
	}
});
