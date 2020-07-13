import './sheet.sass';
import { h } from 'vue';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import BButton from '../button/BButton';
export default function BSheet(props, { slots, attrs }) {
    var _a, _b, _c;
    const { themeClasses } = useTheme({
        isThemeable: (_a = props.isThemeable) !== null && _a !== void 0 ? _a : true,
        themeMap: (_b = props.themeMap) !== null && _b !== void 0 ? _b : DEFAULT_THEME_COLOR_MAP
    });
    attrs.class = mergeClasses(attrs.class, ['b-sheet', ...themeClasses.value]);
    return h((_c = props.tag) !== null && _c !== void 0 ? _c : 'main', attrs, props.isLoading
        ? [
            h(BButton, {
                staticClass: 'is-borderless is-fullwidth',
                props: {
                    size: 'is-large',
                    variant: 'is-link',
                    isOutlined: true,
                    isLoading: true
                }
            })
        ]
        : slots.default());
}
//# sourceMappingURL=BSheet.js.map