import './scroll.sass';
import { getSimpleFunctionalComponent } from '../../utils/getSimpleFunctionalComponent';

function testWindowScrollbar() {
  const parent = document.createElement('div');
  parent.setAttribute('style', 'width:30px;height:30px;');
  parent.classList.add('scrollbar-test');

  const child = document.createElement('div');
  child.setAttribute('style', 'width:100%;height:40px');
  parent.appendChild(child);
  document.body.appendChild(parent);

  // eslint-disable-next-line
  // @ts-ignore
  const scrollbarWidth = 30 - parent.firstChild.clientWidth;
  if (scrollbarWidth) {
    document.body.classList.add('layout-scrollbar-obtrusive');
  }
  document.body.removeChild(parent);
}

requestAnimationFrame(testWindowScrollbar);

export default getSimpleFunctionalComponent('b-scroll', 'div');
