import './dropdown.sass';
import { useTheme, useThemePropsDefinition } from '../../composables/theme';
import { h, defineComponent } from 'vue';
import { DropdownThemeMap } from './theme';
export default defineComponent({
    name: 'b-dropdown-item',
    props: {
        ...useThemePropsDefinition(DropdownThemeMap, true),
        isActive: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'li'
        }
    },
    setup(props, { slots }) {
        const { themeClasses } = useTheme(props);
        return () => {
            return h(props.tag ?? 'li', {
                role: 'menuitem',
                tabindex: 0,
                class: ['dropdown-item', ...themeClasses.value, { 'is-active': props.isActive }]
            }, slots.default && slots.default());
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQkRyb3Bkb3duSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL0JEcm9wZG93bkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQVksTUFBTSxLQUFLLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTNDLGVBQWUsZUFBZSxDQUFDO0lBQzdCLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsS0FBSyxFQUFFO1FBQ0wsR0FBRyx1QkFBdUIsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7UUFDbEQsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE9BQTRCO1lBQ2xDLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsTUFBMEI7WUFDaEMsT0FBTyxFQUFFLElBQUk7U0FDZDtLQUNGO0lBQ0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRTtRQUNwQixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLENBQ04sS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ2pCO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxLQUFLLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqRixFQUNELEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUNqQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9kcm9wZG93bi5zYXNzJztcbmltcG9ydCB7IHVzZVRoZW1lLCB1c2VUaGVtZVByb3BzRGVmaW5pdGlvbiB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3RoZW1lJztcbmltcG9ydCB7IGgsIGRlZmluZUNvbXBvbmVudCwgUHJvcFR5cGUgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgRHJvcGRvd25UaGVtZU1hcCB9IGZyb20gJy4vdGhlbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnYi1kcm9wZG93bi1pdGVtJyxcbiAgcHJvcHM6IHtcbiAgICAuLi51c2VUaGVtZVByb3BzRGVmaW5pdGlvbihEcm9wZG93blRoZW1lTWFwLCB0cnVlKSxcbiAgICBpc0FjdGl2ZToge1xuICAgICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyBhcyBQcm9wVHlwZTxzdHJpbmc+LFxuICAgICAgZGVmYXVsdDogJ2xpJ1xuICAgIH1cbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgdGhlbWVDbGFzc2VzIH0gPSB1c2VUaGVtZShwcm9wcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBoKFxuICAgICAgICBwcm9wcy50YWcgPz8gJ2xpJyxcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6ICdtZW51aXRlbScsXG4gICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgY2xhc3M6IFsnZHJvcGRvd24taXRlbScsIC4uLnRoZW1lQ2xhc3Nlcy52YWx1ZSwgeyAnaXMtYWN0aXZlJzogcHJvcHMuaXNBY3RpdmUgfV1cbiAgICAgICAgfSxcbiAgICAgICAgc2xvdHMuZGVmYXVsdCAmJiBzbG90cy5kZWZhdWx0KClcbiAgICAgICk7XG4gICAgfTtcbiAgfVxufSk7XG4iXX0=