import './tag.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { SetupContext } from 'vue';
export interface BTagProps {
    isAttached?: boolean;
    isClosable?: boolean;
    variant?: ColorVariant;
    size?: SizeVariant;
    isRounded?: boolean;
    isDisabled?: boolean;
    hasEllipsis?: boolean;
    isTabable?: boolean;
    tag?: string;
    onClose?: FunctionN<[MouseEvent], void>;
}
export default function BTag(props: BTagProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
