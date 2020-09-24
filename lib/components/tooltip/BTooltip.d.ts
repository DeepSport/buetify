import './tooltip.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { SetupContext } from 'vue';
export declare type TooltipPosition = 'is-top' | 'is-bottom' | 'is-left' | 'is-right';
export interface BTooltipProps {
    isActive?: boolean;
    variant?: ColorVariant;
    label?: string;
    position?: TooltipPosition;
    isAlways?: boolean;
    isAnimated?: boolean;
    isSquare?: boolean;
    isDashed?: boolean;
    isMultilined?: boolean;
    size?: SizeVariant;
    tag?: string;
}
export default function BTooltip(props: BTooltipProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
