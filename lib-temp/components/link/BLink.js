import './link.sass';
import { useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
import { LinkThemeMap } from './theme';
export default function BLink(props, { attrs, slots }) {
    var _a, _b, _c, _d, _e;
    const { themeClasses } = useTheme({
        isThemeable: (_a = props.isThemeable) !== null && _a !== void 0 ? _a : true,
        themeMap: (_b = props.themeMap) !== null && _b !== void 0 ? _b : LinkThemeMap
    });
    attrs.class = mergeClasses(attrs.class, [
        'b-link',
        ...themeClasses.value,
        { 'is-disabled': (_c = props.isDisabled) !== null && _c !== void 0 ? _c : false }
    ]);
    attrs.onClick = ((_d = props.isDisabled) !== null && _d !== void 0 ? _d : false) ? undefined : attrs.onClick;
    return h((_e = props.tag) !== null && _e !== void 0 ? _e : 'a', attrs, slots.default && slots.default());
}
//# sourceMappingURL=BLink.js.map