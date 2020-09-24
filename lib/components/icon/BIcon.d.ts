import './icon.sass';
import { Component, SetupContext } from 'vue';
import { ColorVariant, ColorVariantFlags } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
export interface BIconProps {
    variant?: ColorVariant | ColorVariantFlags;
    isHoverable?: boolean;
    size?: SizeVariant;
    tag?: string | Component;
}
export default function BIcon(props: BIconProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
