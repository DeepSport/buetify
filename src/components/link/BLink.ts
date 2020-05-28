import './link.sass';
import { FunctionalThemeProps, useTheme } from '../../composables/theme';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { h, SetupContext } from 'vue';
import { LinkThemeMap } from './theme';

export interface BLinkProps extends FunctionalThemeProps {
  href?: string;
  tag?: string;
  isDisabled?: boolean;
}

export default function BLink(props: BLinkProps, { attrs, slots }: SetupContext) {
  const { themeClasses } = useTheme({
    isThemeable: props.isThemeable ?? true,
    themeMap: props.themeMap ?? LinkThemeMap
  });
  attrs.class = mergeClasses(attrs.class as Classes, [
    'b-link',
    ...themeClasses.value,
    { 'is-disabled': props.isDisabled ?? false }
  ]);
  attrs.onClick = props.isDisabled ?? false ? undefined : attrs.onClick;
  return h(props.tag ?? 'a', attrs, slots.default && slots.default());
}
