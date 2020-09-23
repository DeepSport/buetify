import 'bulma/sass/elements/button.sass';
import { h, defineComponent } from 'vue';
function useButtonClasses(props) {
    return [
        'button',
        props.variant,
        props.size,
        {
            'is-rounded': props.isRounded,
            'is-loading': props.isLoading,
            'is-outlined': props.isOutlined,
            'is-inverted': props.isInverted,
            'is-focused': props.isFocused,
            'is-active': props.isActive,
            'is-disabled': props.isDisabled,
            'is-hovered': props.isHovered,
            'is-selected': props.isSelected,
            'is-fullwidth': props.isFullwidth
        }
    ];
}
export default defineComponent({
    name: 'b-button',
    props: {
        tag: {
            type: String,
            default: 'button',
            validator: (val) => ['button', 'a', 'input'].includes(val)
        },
        size: {
            type: String,
            default: ''
        },
        variant: {
            type: String,
            default: ''
        },
        isRounded: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        isOutlined: {
            type: Boolean,
            default: false
        },
        isInverted: {
            type: Boolean,
            default: false
        },
        isFocused: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        isHovered: {
            type: Boolean,
            default: false
        },
        isSelected: {
            type: Boolean,
            default: false
        },
        isFullwidth: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        return () => h(props.tag, {
            class: useButtonClasses(props),
            disabled: props.isDisabled ? true : null
        }, slots.default && slots.default());
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQkJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9CQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLENBQUMsRUFBWSxlQUFlLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFxQm5ELFNBQVMsZ0JBQWdCLENBQUMsS0FBa0I7SUFDMUMsT0FBTztRQUNMLFFBQVE7UUFDUixLQUFLLENBQUMsT0FBTztRQUNiLEtBQUssQ0FBQyxJQUFJO1FBQ1Y7WUFDRSxZQUFZLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDN0IsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTO1lBQzdCLGFBQWEsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUMvQixhQUFhLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDL0IsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTO1lBQzdCLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUMzQixhQUFhLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDL0IsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTO1lBQzdCLGFBQWEsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUMvQixjQUFjLEVBQUUsS0FBSyxDQUFDLFdBQVc7U0FDbEM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELGVBQWUsZUFBZSxDQUFDO0lBQzdCLElBQUksRUFBRSxVQUFVO0lBQ2hCLEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxNQUE0QztZQUNsRCxPQUFPLEVBQUUsUUFBaUI7WUFDMUIsU0FBUyxFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztTQUNuRTtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUErQjtZQUNyQyxPQUFPLEVBQUUsRUFBaUI7U0FDM0I7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsTUFBZ0M7WUFDdEMsT0FBTyxFQUFFLEVBQWtCO1NBQzVCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE9BQTRCO1lBQ2xDLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsT0FBNEI7WUFDbEMsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxPQUE0QjtZQUNsQyxPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE9BQTRCO1lBQ2xDLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsT0FBNEI7WUFDbEMsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxPQUE0QjtZQUNsQyxPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE9BQTRCO1lBQ2xDLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsT0FBNEI7WUFDbEMsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxPQUE0QjtZQUNsQyxPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLE9BQTRCO1lBQ2xDLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUU7UUFDcEIsT0FBTyxHQUFHLEVBQUUsQ0FDVixDQUFDLENBQ0MsS0FBSyxDQUFDLEdBQUcsRUFDVDtZQUNFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7WUFDOUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUN6QyxFQUNELEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUNqQyxDQUFDO0lBQ04sQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYnVsbWEvc2Fzcy9lbGVtZW50cy9idXR0b24uc2Fzcyc7XG5pbXBvcnQgeyBoLCBQcm9wVHlwZSwgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSAndnVlJztcbmltcG9ydCB7IENvbG9yVmFyaWFudCB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9yVmFyaWFudHMnO1xuaW1wb3J0IHsgU2l6ZVZhcmlhbnQgfSBmcm9tICcuLi8uLi90eXBlcy9TaXplVmFyaWFudHMnO1xuaW1wb3J0IHsgQ2xhc3NlcyB9IGZyb20gJy4uLy4uL3V0aWxzL21lcmdlQ2xhc3Nlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uUHJvcHMge1xuICB2YXJpYW50OiBDb2xvclZhcmlhbnQ7XG4gIGlzUm91bmRlZDogYm9vbGVhbjtcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xuICBpc091dGxpbmVkOiBib29sZWFuO1xuICBpc0ludmVydGVkOiBib29sZWFuO1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzQWN0aXZlOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICBpc0hvdmVyZWQ6IGJvb2xlYW47XG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gIGlzRnVsbHdpZHRoOiBib29sZWFuO1xuICBzaXplOiBTaXplVmFyaWFudDtcbiAgdGFnOiAnYnV0dG9uJyB8ICdhJyB8ICdpbnB1dCc7XG59XG5cbmZ1bmN0aW9uIHVzZUJ1dHRvbkNsYXNzZXMocHJvcHM6IEJ1dHRvblByb3BzKTogQ2xhc3NlcyB7XG4gIHJldHVybiBbXG4gICAgJ2J1dHRvbicsXG4gICAgcHJvcHMudmFyaWFudCxcbiAgICBwcm9wcy5zaXplLFxuICAgIHtcbiAgICAgICdpcy1yb3VuZGVkJzogcHJvcHMuaXNSb3VuZGVkLFxuICAgICAgJ2lzLWxvYWRpbmcnOiBwcm9wcy5pc0xvYWRpbmcsXG4gICAgICAnaXMtb3V0bGluZWQnOiBwcm9wcy5pc091dGxpbmVkLFxuICAgICAgJ2lzLWludmVydGVkJzogcHJvcHMuaXNJbnZlcnRlZCxcbiAgICAgICdpcy1mb2N1c2VkJzogcHJvcHMuaXNGb2N1c2VkLFxuICAgICAgJ2lzLWFjdGl2ZSc6IHByb3BzLmlzQWN0aXZlLFxuICAgICAgJ2lzLWRpc2FibGVkJzogcHJvcHMuaXNEaXNhYmxlZCxcbiAgICAgICdpcy1ob3ZlcmVkJzogcHJvcHMuaXNIb3ZlcmVkLFxuICAgICAgJ2lzLXNlbGVjdGVkJzogcHJvcHMuaXNTZWxlY3RlZCxcbiAgICAgICdpcy1mdWxsd2lkdGgnOiBwcm9wcy5pc0Z1bGx3aWR0aFxuICAgIH1cbiAgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ2ItYnV0dG9uJyxcbiAgcHJvcHM6IHtcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyBhcyBQcm9wVHlwZTwnYnV0dG9uJyB8ICdhJyB8ICdpbnB1dCc+LFxuICAgICAgZGVmYXVsdDogJ2J1dHRvbicgYXMgY29uc3QsXG4gICAgICB2YWxpZGF0b3I6ICh2YWw6IHN0cmluZykgPT4gWydidXR0b24nLCAnYScsICdpbnB1dCddLmluY2x1ZGVzKHZhbClcbiAgICB9LFxuICAgIHNpemU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyBhcyBQcm9wVHlwZTxTaXplVmFyaWFudD4sXG4gICAgICBkZWZhdWx0OiAnJyBhcyBTaXplVmFyaWFudFxuICAgIH0sXG4gICAgdmFyaWFudDoge1xuICAgICAgdHlwZTogU3RyaW5nIGFzIFByb3BUeXBlPENvbG9yVmFyaWFudD4sXG4gICAgICBkZWZhdWx0OiAnJyBhcyBDb2xvclZhcmlhbnRcbiAgICB9LFxuICAgIGlzUm91bmRlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc0xvYWRpbmc6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgaXNPdXRsaW5lZDoge1xuICAgICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc0ludmVydGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGlzRm9jdXNlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc0FjdGl2ZToge1xuICAgICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc0Rpc2FibGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGlzSG92ZXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc1NlbGVjdGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGlzRnVsbHdpZHRoOiB7XG4gICAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9XG4gIH0sXG4gIHNldHVwKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT5cbiAgICAgIGgoXG4gICAgICAgIHByb3BzLnRhZyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiB1c2VCdXR0b25DbGFzc2VzKHByb3BzKSxcbiAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuaXNEaXNhYmxlZCA/IHRydWUgOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIHNsb3RzLmRlZmF1bHQgJiYgc2xvdHMuZGVmYXVsdCgpXG4gICAgICApO1xuICB9XG59KTtcbiJdfQ==