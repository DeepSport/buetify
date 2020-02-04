export function mergeVNodeStaticClass(cls: string, existing: string = ''): string {
  return `${cls} ${existing}`.trim();
}
