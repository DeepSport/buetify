import './sheet.sass';
import { h } from 'vue';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import BButton from '../button/BButton';
export default function BSheet(props, { slots, attrs }) {
    const { themeClasses } = useTheme({
        isThemeable: props.isThemeable ?? true,
        themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP
    });
    attrs.class = mergeClasses(attrs.class, ['b-sheet', ...themeClasses.value]);
    return h(props.tag ?? 'main', attrs, props.isLoading
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