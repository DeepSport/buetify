import './steps.sass';
import BHorizontalDivider from '../layout/divider/BHorizontalDivider';
import BStepItem, { BStepItemName, BStepItemPropsData } from './BStepItem';
import { applyMixins } from '../../utils/applyMixins';
import { getProxyableMixin } from '../../mixins/proxyable/ProxyableMixin';
import { ThemeInjectionMixin } from '../../mixins/themeInjection/ThemeInjectionMixin';
import { ColorVariant } from '../../types/ColorVariants';
import { lookup } from 'fp-ts/lib/Array';
import { map, none, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { VNode, VNodeComponentOptions } from 'vue';
import { PropValidator } from 'vue/types/options';

interface StepInjection {
  activeLabel: Option<string>;
  destroyOnHide: boolean;
}

export type StepsSize = 'is-small' | 'is-medium' | 'is-large';

interface Data {
  injection: StepInjection;
  transition: 'slide-next' | 'slide-prev';
}

export default applyMixins(ThemeInjectionMixin, getProxyableMixin('value', 'input', 0)).extend({
  name: 'BSteps',
  props: {
    variant: {
      type: String,
      default: undefined
    } as PropValidator<ColorVariant | undefined>,
    size: {
      type: String,
      default: undefined
    } as PropValidator<StepsSize | undefined>,
    isAnimated: {
      type: Boolean,
      default: true
    },
    destroyOnHide: {
      type: Boolean,
      default: false
    }
  },
  data(): Data {
    return {
      transition: 'slide-next',
      injection: {
        activeLabel: none,
        destroyOnHide: this.destroyOnHide
      }
    };
  },
  provide(): Record<'step', StepInjection> {
    return {
      step: this.injection
    };
  },
  computed: {
    classes(): any {
      return [this.variant, this.size];
    }
  },
  watch: {
    destroyOnHide(newVal: boolean) {
      if (newVal !== this.injection.destroyOnHide) {
        this.injection.destroyOnHide = newVal;
      }
    },
    internalValue(newVal: number, oldVal: number) {
      if (newVal !== oldVal) {
        const nodes = this.parseNodes();
        this.injection.activeLabel = pipe(
          lookup(newVal, nodes),
          map(node => node.componentOptions.propsData.label)
        );
      }
    }
  },
  beforeMount(): void {
    const nodes = this.parseNodes();
    const index = nodes.findIndex(
      node =>
        node.componentOptions.propsData.isVisible === undefined || node.componentOptions.propsData.isVisible === true
    );
    if (index > -1) {
      this.injection.activeLabel = some(nodes[index].componentOptions.propsData.label);
      this.internalValue = index;
    }
  },
  methods: {
    getOnStepClick(index: number, label: string) {
      return () => {
        if (this.internalValue !== index) {
          this.transition = index < (this.internalValue as number) ? 'slide-next' : 'slide-prev';
          this.$nextTick(() => {
            this.injection.activeLabel = some(label);
            this.internalValue = index;
          });
        }
      };
    },
    parseNodes(): BStepItemNode[] {
      return (this.$slots.default || []).filter(isStep);
    },
    generateNavHeader(steps: BStepItemNode[]): VNode {
      return this.$createElement('nav', { class: this.classes, staticClass: 'steps' }, [
        this.$createElement('ul', { staticClass: 'step-items' }, steps.map(this.generateNavItem))
      ]);
    },
    generateNavItem(step: BStepItemNode, index: number): VNode {
      const propsData = step.componentOptions.propsData;
      const label = propsData.label;
      return this.$createElement(
        'li',
        {
          key: label,
          directives: [
            {
              name: 'show',
              value: propsData.isVisible === undefined ? true : propsData.isVisible
            }
          ],
          staticClass: 'step-item',
          class: [
            propsData.variant || this.variant,
            {
              'is-active': index === this.internalValue,
              'is-completed': propsData.isCompleted || (this.internalValue as number) > index
            }
          ]
        },
        [this.generateNavItemContent(propsData, index)]
      );
    },
    generateNavItemContent(data: BStepItemPropsData, index: number): VNode {
      return this.$createElement(
        'a',
        {
          staticClass: 'step-link',
          class: { 'is-clickable': data.isClickable },
          on: data.isClickable ? { click: this.getOnStepClick(index, data.label) } : undefined
        },
        [this.generateNavItemStepMarker(data), this.generateNavItemStepDetails(data)]
      );
    },
    generateNavItemStepMarker(data: BStepItemPropsData): VNode {
      return this.$createElement(
        'div',
        { staticClass: 'step-marker' },
        data.icon ? [this.$createElement(data.icon, { props: { size: this.size } })] : []
      );
    },
    generateNavItemStepDetails(data: BStepItemPropsData): VNode {
      return this.$createElement('div', { staticClass: 'step-details' }, [
        this.$createElement('span', { staticClass: 'step-title' }, data.label)
      ]);
    },
    generateStepContent(steps: BStepItemNode[]): VNode {
      return this.$createElement(
        'section',
        {
          staticClass: 'step-content',
          attrs: { 'aria-label': 'Step Content' }
        },
        [
          this.isAnimated
            ? this.$createElement('transition', { props: { name: this.transition } }, [
                steps[this.internalValue as number]
              ])
            : steps[this.internalValue as number]
        ]
      );
    }
  },
  render(): VNode {
    const nodes = this.parseNodes();
    return this.$createElement('article', { staticClass: 'b-steps' }, [
      this.generateNavHeader(nodes),
      this.$createElement(BHorizontalDivider),
      this.generateStepContent(nodes)
    ]);
  }
});

type BStepItemNode = VNode & {
  componentOptions: VNodeComponentOptions & {
    CTor: typeof BStepItem;
    propsData: BStepItemPropsData;
  };
};

function isStep(node: VNode): node is BStepItemNode {
  return !!node.componentOptions && node.componentOptions.Ctor.options.name === BStepItemName;
}
