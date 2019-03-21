export function normalizeCoords(max: number, value: number): number {
    return Math.max(Math.min(max, value), 0);
}