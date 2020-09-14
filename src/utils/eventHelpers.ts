export function isEnterEvent(e: KeyboardEvent): boolean {
  return e.key === 'Enter' || e.keyCode === 13;
}

export function isSpaceEvent(e: KeyboardEvent): boolean {
  return e.code === 'Space' || e.which === 32 || e.key === ' ';
}

export function isEscEvent(e: KeyboardEvent): boolean {
  return e.key === 'Escape' || e.code === 'Escape' || e.which === 27;
}

export function isArrowDownEvent(e: KeyboardEvent): boolean {
  return e.key === 'ArrowDown' || e.code === 'ArrowDown' || e.which === 40;
}

export function isArrowRightEvent(e: KeyboardEvent): boolean {
  return e.key === 'ArrowRight' || e.code === 'ArrowRight' || e.which === 39;
}

export function isArrowLeftEvent(e: KeyboardEvent): boolean {
  return e.key === 'ArrowLeft' || e.code === 'ArrowLeft' || e.which === 37;
}

export function isArrowUpEvent(e: KeyboardEvent): boolean {
  return e.key === 'ArrowUp' || e.code === 'ArrowUp' || e.which === 38;
}

export function isTabEvent(e: KeyboardEvent): boolean {
  return e.key === 'Tab' || e.code === 'Tab' || e.which === 9;
}
