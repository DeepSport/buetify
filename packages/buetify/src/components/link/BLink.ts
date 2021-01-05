import './link.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { FunctionalThemeProps, useTheme } from '../../composables/theme';
import { FunctionalComponent, h, SetupContext } from 'vue';
import { LinkThemeMap } from './theme';

export interface BLinkProps extends FunctionalThemeProps {
  href?: string;
  tag?: string;
  isDisabled?: boolean;
  onClick?: FunctionN<[Event], void>;
}

const BLink_: FunctionalComponent<BLinkProps> = function BLink(props, { slots }: SetupContext) {
  const { themeClasses } = useTheme({
    isThemeable: props.isThemeable ?? true,
    themeMap: props.themeMap ?? LinkThemeMap
  });
  return h(
    props.tag ?? 'a',
    {
      class: ['b-link', ...themeClasses.value, { 'is-disabled': props.isDisabled }],
      onClick: props.isDisabled ? undefined : props.onClick
    },
    slots.default && slots.default()
  );
};

export default BLink_;
