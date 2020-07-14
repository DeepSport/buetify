import './overlay.sass';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { h, SetupContext, withDirectives, vShow } from 'vue';

type OverlayPosition = 'is-left' | 'is-right' | 'is-centered';

export interface BOverlayProps {
  position?: OverlayPosition;
  isActive?: boolean;
  isFullscreen?: boolean;
}

export default function BOverlay(props: BOverlayProps, { attrs, slots }: SetupContext) {
  if (!!props.isFullscreen) {
    return withDirectives(
      h(
        'div',
        {
          ...attrs,
          class: mergeClasses(attrs.class as Classes, ['b-overlay', props.position])
        },
        [
          h(
            'div',
            {
              class: 'b-overlay-content is-fullscreen'
            },
            slots.default && slots.default()
          )
        ]
      ),
      [[vShow, !!props.isActive]]
    );
  } else {
    return withDirectives(
      h(
        'div',
        {
          class: mergeClasses(attrs.class as Classes, ['b-overlay', props.position])
        },
        [
          h('div', {
            ...attrs,
            class: 'b-overlay-background'
          }),
          h(
            'div',
            {
              class: 'b-overlay-content'
            },
            slots.default && slots.default()
          )
        ]
      ),
      [[vShow, !!props.isActive]]
    );
  }
}
