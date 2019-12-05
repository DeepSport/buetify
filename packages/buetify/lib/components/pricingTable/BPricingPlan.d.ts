import './pricing-table.sass';
import { VNode, SetupContext } from 'vue';
export interface BPricingPlanProps {
    isActive?: boolean;
    amount: number;
    interval: number;
}
export default function BPricingPlan(props: BPricingPlanProps, { attrs, slots }: SetupContext): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
