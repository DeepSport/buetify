import './link.sass';
import { FunctionalThemeProps, useTheme } from '../../composables/theme';
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
  return h(
    props.tag ?? 'a',
    {
      class: ['b-link', ...themeClasses.value, { 'is-disabled': props.isDisabled }],
      onClick: props.isDisabled ? undefined : attrs.onClick
    },
    slots.default && slots.default()
  );
}
