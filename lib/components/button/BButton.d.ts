import './button.sass';
import { SetupContext } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
export interface ButtonProps {
    variant?: ColorVariant;
    isRounded?: boolean;
    isLoading?: boolean;
    isOutlined?: boolean;
    isInverted?: boolean;
    isFocused?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    isHovered?: boolean;
    size?: SizeVariant;
    tag?: 'button' | 'a' | 'input';
}
export default function BButton(props: ButtonProps, { slots, attrs }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
