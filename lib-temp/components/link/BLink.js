import './link.sass';
import { useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
import { LinkThemeMap } from './theme';
export default function BLink(props, { attrs, slots }) {
    const { themeClasses } = useTheme({
        isThemeable: props.isThemeable ?? true,
        themeMap: props.themeMap ?? LinkThemeMap
    });
    attrs.class = mergeClasses(attrs.class, [
        'b-link',
        ...themeClasses.value,
        { 'is-disabled': props.isDisabled ?? false }
    ]);
    attrs.onClick = props.isDisabled ?? false ? undefined : attrs.onClick;
    return h(props.tag ?? 'a', attrs, slots.default && slots.default());
}
//# sourceMappingURL=BLink.js.map