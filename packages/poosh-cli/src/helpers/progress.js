export function getPercent (value: number, max: number): number {
  return max === 0
    ? 0
    : Math.floor(value * 100 / max);
}
