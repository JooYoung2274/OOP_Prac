export interface IEnemyOutput {
  getEnemyStatusByCoordinate(coordinate: number[]): any;
  subtractEnemyHp(userAtk: number, coordinate: number[]): number;
  regenEnemy(coordinate: number[]): void;
}
