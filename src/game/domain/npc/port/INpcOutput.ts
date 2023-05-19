export interface INpcOutput {
  getNpcItemByCoordinate(coordinate: number[]): string;
  updateNpcItem(coordinate: number[]): void;
}
