import './vertical-expansion-icon.sass';
import { h, defineComponent } from 'vue';
import { AngleDownIcon } from '../angleDown';
export default defineComponent({
    name: 'vertical-expansion-icon',
    props: {
        isExpanded: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        return () => h(AngleDownIcon, {
            class: ['vertical-expansion-icon', { 'is-expanded': props.isExpanded }]
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVydGljYWxFeHBhbnNpb25JY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaWNvbnMvdmVydGljYWxFeHBhbnNpb24vVmVydGljYWxFeHBhbnNpb25JY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU3QyxlQUFlLGVBQWUsQ0FBQztJQUM3QixJQUFJLEVBQUUseUJBQXlCO0lBQy9CLEtBQUssRUFBRTtRQUNMLFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxPQUFPO1lBQ2IsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGO0lBQ0QsS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLEdBQUcsRUFBRSxDQUNWLENBQUMsQ0FBQyxhQUFhLEVBQUU7WUFDZixLQUFLLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDeEUsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi92ZXJ0aWNhbC1leHBhbnNpb24taWNvbi5zYXNzJztcbmltcG9ydCB7IGgsIGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBBbmdsZURvd25JY29uIH0gZnJvbSAnLi4vYW5nbGVEb3duJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3ZlcnRpY2FsLWV4cGFuc2lvbi1pY29uJyxcbiAgcHJvcHM6IHtcbiAgICBpc0V4cGFuZGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9XG4gIH0sXG4gIHNldHVwKHByb3BzKSB7XG4gICAgcmV0dXJuICgpID0+XG4gICAgICBoKEFuZ2xlRG93bkljb24sIHtcbiAgICAgICAgY2xhc3M6IFsndmVydGljYWwtZXhwYW5zaW9uLWljb24nLCB7ICdpcy1leHBhbmRlZCc6IHByb3BzLmlzRXhwYW5kZWQgfV1cbiAgICAgIH0pO1xuICB9XG59KTtcbiJdfQ==