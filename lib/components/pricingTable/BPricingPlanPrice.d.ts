import './pricing-table.sass';
import { SetupContext } from 'vue';
import { BPricingPlanProps } from './BPricingPlan';
export declare type BPricingPlanPriceProps = Omit<BPricingPlanProps, 'isActive'>;
export default function BPricingPlanPrice(props: BPricingPlanPriceProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
