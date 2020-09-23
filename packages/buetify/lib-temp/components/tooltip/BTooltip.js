import './tooltip.sass';
import { h } from 'vue';
export default function BTooltip(props, { slots }) {
    return h(props.tag || 'span', {
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
    }, slots.default ? slots.default() : undefined);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlRvb2x0aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy90b29sdGlwL0JUb29sdGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLENBQUM7QUFHeEIsT0FBTyxFQUFnQixDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFrQnRDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUFDLEtBQW9CLEVBQUUsRUFBRSxLQUFLLEVBQWdCO0lBQzVFLE9BQU8sQ0FBQyxDQUNOLEtBQUssQ0FBQyxHQUFHLElBQUksTUFBTSxFQUNuQjtRQUNFLEtBQUssRUFBRTtZQUNMLFdBQVc7WUFDWCxLQUFLLENBQUMsT0FBTyxJQUFJLFlBQVk7WUFDN0IsS0FBSyxDQUFDLElBQUk7WUFDVixLQUFLLENBQUMsUUFBUSxJQUFJLFFBQVE7WUFDMUI7Z0JBQ0UsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDN0IsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDN0IsYUFBYSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFDakMsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDN0IsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDN0IsZUFBZSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTthQUN0QztTQUNGO1FBQ0QsWUFBWSxFQUFFLEtBQUssQ0FBQyxLQUFLO0tBQzFCLEVBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQzVDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3Rvb2x0aXAuc2Fzcyc7XG5pbXBvcnQgeyBDb2xvclZhcmlhbnQgfSBmcm9tICcuLi8uLi90eXBlcy9Db2xvclZhcmlhbnRzJztcbmltcG9ydCB7IFNpemVWYXJpYW50IH0gZnJvbSAnLi4vLi4vdHlwZXMvU2l6ZVZhcmlhbnRzJztcbmltcG9ydCB7IFNldHVwQ29udGV4dCwgaCB9IGZyb20gJ3Z1ZSc7XG5cbmV4cG9ydCB0eXBlIFRvb2x0aXBQb3NpdGlvbiA9ICdpcy10b3AnIHwgJ2lzLWJvdHRvbScgfCAnaXMtbGVmdCcgfCAnaXMtcmlnaHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJUb29sdGlwUHJvcHMge1xuICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gIHZhcmlhbnQ/OiBDb2xvclZhcmlhbnQ7XG4gIGxhYmVsPzogc3RyaW5nO1xuICBwb3NpdGlvbj86IFRvb2x0aXBQb3NpdGlvbjtcbiAgaXNBbHdheXM/OiBib29sZWFuO1xuICBpc0FuaW1hdGVkPzogYm9vbGVhbjtcbiAgaXNTcXVhcmU/OiBib29sZWFuO1xuICBpc0Rhc2hlZD86IGJvb2xlYW47XG4gIGlzTXVsdGlsaW5lZD86IGJvb2xlYW47XG4gIHNpemU/OiBTaXplVmFyaWFudDtcbiAgdGFnPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCVG9vbHRpcChwcm9wczogQlRvb2x0aXBQcm9wcywgeyBzbG90cyB9OiBTZXR1cENvbnRleHQpIHtcbiAgcmV0dXJuIGgoXG4gICAgcHJvcHMudGFnIHx8ICdzcGFuJyxcbiAgICB7XG4gICAgICBjbGFzczogW1xuICAgICAgICAnYi10b29sdGlwJyxcbiAgICAgICAgcHJvcHMudmFyaWFudCB8fCAnaXMtcHJpbWFyeScsXG4gICAgICAgIHByb3BzLnNpemUsXG4gICAgICAgIHByb3BzLnBvc2l0aW9uIHx8ICdpcy10b3AnLFxuICAgICAgICB7XG4gICAgICAgICAgJ2ItdG9vbHRpcCc6ICEhcHJvcHMuaXNBY3RpdmUsXG4gICAgICAgICAgJ2lzLWFsd2F5cyc6ICEhcHJvcHMuaXNBbHdheXMsXG4gICAgICAgICAgJ2lzLWFuaW1hdGVkJzogISFwcm9wcy5pc0FuaW1hdGVkLFxuICAgICAgICAgICdpcy1zcXVhcmUnOiAhIXByb3BzLmlzU3F1YXJlLFxuICAgICAgICAgICdpcy1kYXNoZWQnOiAhIXByb3BzLmlzRGFzaGVkLFxuICAgICAgICAgICdpcy1tdWx0aWxpbmVkJzogISFwcm9wcy5pc011bHRpbGluZWRcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgICdkYXRhLWxhYmVsJzogcHJvcHMubGFiZWxcbiAgICB9LFxuICAgIHNsb3RzLmRlZmF1bHQgPyBzbG90cy5kZWZhdWx0KCkgOiB1bmRlZmluZWRcbiAgKTtcbn1cbiJdfQ==