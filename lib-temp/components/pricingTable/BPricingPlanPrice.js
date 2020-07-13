import './pricing-table.sass';
import { h } from 'vue';
export default function BPricingPlanPrice(props, { attrs, slots }) {
    return h('div', Object.assign(Object.assign({}, attrs), { class: 'plan-price' }), [
        h('span', { class: 'plan-price-amount' }, [
            h('span', { class: 'plan-price-currency' }, slots.currency ? slots.currency() : '$'),
            `${props.amount}`
        ]),
        `/${props.interval}`
    ]);
}
//# sourceMappingURL=BPricingPlanPrice.js.map