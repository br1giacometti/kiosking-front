export default function sumArrayNumbers(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}
