import { capitalizeFirstLetter } from '../../utils/helpers';
export function createExpandTransition(transitionClass = '', x = false) {
    const sizeProperty = x ? 'width' : 'height';
    const offsetProperty = `offset${capitalizeFirstLetter(sizeProperty)}`;
    return {
        onBeforeEnter(el) {
            el._parent = el.parentNode;
            el._initialStyle = {
                transition: el.style.transition,
                visibility: el.style.visibility,
                overflow: el.style.overflow,
                [sizeProperty]: el.style[sizeProperty]
            };
        },
        onEnter(el) {
            const initialStyle = el._initialStyle;
            const offset = `${el[offsetProperty]}px`;
            el.style.setProperty('transition', 'none', 'important');
            el.style.visibility = 'hidden';
            el.style.visibility = initialStyle.visibility === null ? 'visible' : initialStyle.visibility;
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = '0';
            // tslint:disable-next-line
            void el.offsetHeight; // force reflow
            el.style.transition = initialStyle.transition;
            if (transitionClass) {
                el.classList.add(transitionClass);
            }
            requestAnimationFrame(() => {
                el.style[sizeProperty] = offset;
            });
        },
        onAfterEnter: resetStyles,
        onEnterCancelled: resetStyles,
        onLeave(el) {
            el._initialStyle = {
                transition: '',
                visibility: '',
                overflow: el.style.overflow,
                [sizeProperty]: el.style[sizeProperty]
            };
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = `${el[offsetProperty]}px`;
            void el.offsetHeight; // force reflow
            requestAnimationFrame(() => (el.style[sizeProperty] = '0'));
        },
        onAfterLeave,
        onLeaveCancelled: onAfterLeave
    };
    function onAfterLeave(el) {
        if (transitionClass) {
            el.classList.remove(transitionClass);
        }
        resetStyles(el);
    }
    function resetStyles(el) {
        const size = el._initialStyle[sizeProperty];
        el.style.overflow = el._initialStyle.overflow === null ? 'auto' : el._initialStyle.overflow;
        if (size != null)
            el.style[sizeProperty] = size;
        delete el._initialStyle;
    }
}
//# sourceMappingURL=expandTransition.js.map