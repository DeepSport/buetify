import './pricing-table.sass';
import BPricingPlanPrice from './BPricingPlanPrice';
import { VNode, h, SetupContext } from 'vue';

export interface BPricingPlanProps {
	isActive?: boolean;
	amount: number;
	interval: number;
}

export default function BPricingPlan(props: BPricingPlanProps, { attrs, slots }: SetupContext) {
	const nodes: VNode[] = [];
	if (slots.header) {
		nodes.push(h('div', { class: 'plan-header' }, slots.header()));
	}
	nodes.push(
		h('div', { class: 'plan-pricing-container' }, slots.price ? slots.price(props) : h(BPricingPlanPrice, props))
	);
	nodes.push(h('div', { class: 'plan-items' }, slots.items && slots.items()));
	if (slots.footer) {
		nodes.push(h('div', { class: 'plan-footer' }, slots.footer()));
	}
	return h('section', { ...attrs, class: ['pricing-plan', { 'is-active': !!props.isActive }] }, nodes);
}
