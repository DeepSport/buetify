import 'bulma/sass/components/navbar.sass';
import { h, defineComponent } from 'vue';
export default defineComponent({
    name: 'b-navbar-menu',
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        return () => h('div', {
            class: ['navbar-menu', { isActive: props.isActive }]
        }, slots.default && slots.default());
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQk5hdmJhck1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvQk5hdmJhck1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV6QyxlQUFlLGVBQWUsQ0FBQztJQUM3QixJQUFJLEVBQUUsZUFBZTtJQUNyQixLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUU7UUFDcEIsT0FBTyxHQUFHLEVBQUUsQ0FDVixDQUFDLENBQ0MsS0FBSyxFQUNMO1lBQ0UsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNyRCxFQUNELEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUNqQyxDQUFDO0lBQ04sQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYnVsbWEvc2Fzcy9jb21wb25lbnRzL25hdmJhci5zYXNzJztcbmltcG9ydCB7IGgsIGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdiLW5hdmJhci1tZW51JyxcbiAgcHJvcHM6IHtcbiAgICBpc0FjdGl2ZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9LFxuICBzZXR1cChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgcmV0dXJuICgpID0+XG4gICAgICBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBbJ25hdmJhci1tZW51JywgeyBpc0FjdGl2ZTogcHJvcHMuaXNBY3RpdmUgfV1cbiAgICAgICAgfSxcbiAgICAgICAgc2xvdHMuZGVmYXVsdCAmJiBzbG90cy5kZWZhdWx0KClcbiAgICAgICk7XG4gIH1cbn0pO1xuIl19