import './sheet.sass';
import { h, SetupContext } from 'vue';
import { DEFAULT_THEME_COLOR_MAP, ThemeProps, useTheme } from '../../composables/theme';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import BButton from '../button/BButton';

export interface BSheetProps extends Partial<ThemeProps> {
  tag?: string;
  isLoading?: boolean;
}

export default function BSheet(props: BSheetProps, { slots, attrs }: SetupContext) {
  const { themeClasses } = useTheme({
    isThemeable: props.isThemeable ?? true,
    themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP
  });
  attrs.class = mergeClasses(attrs.class as Classes, ['b-sheet', ...themeClasses.value]);
  return h(
    props.tag ?? 'main',
    attrs,
    props.isLoading
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
      : slots.default!()
  );
}
