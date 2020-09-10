import './tooltip.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { SetupContext, h } from 'vue';

export type TooltipPosition = 'is-top' | 'is-bottom' | 'is-left' | 'is-right';

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

export default function BTooltip(props: BTooltipProps, { slots }: SetupContext) {
	return h(
		props.tag || 'span',
		{
			class: [
				'b-tooltip',
				props.variant || 'is-primary',
				props.size,
				props.position || 'is-top',
				{
					'b-tooltip': !!props.isActive,
					'is-always': !!props.isAlways,
					'is-animated': !!props.isAnimated,
					'is-square': !!props.isSquare,
					'is-dashed': !!props.isDashed,
					'is-multilined': !!props.isMultilined
				}
			],
			'data-label': props.label
		},
		slots.default ? slots.default() : undefined
	);
}
