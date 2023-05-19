import { MapList } from '../../../data/mapList';

import { IEnemyOutput } from '../../../domain/enemy/port/IEnemyOutput';

export class EnemyOutput implements IEnemyOutput {
  constructor(private _map: MapList) {}

  getEnemyStatusByCoordinate(coordinate: number[]): any {
    return this._map.list[coordinate[0]][coordinate[1]].roomType;
  }

  subtractEnemyHp(userAtk: number, coordinate: number[]): number {
    this._map.list[coordinate[0]][coordinate[1]].roomType.hp[0] = this._map.list[coordinate[0]][coordinate[1]].roomType.hp[0] - userAtk;

    if (this._map.list[coordinate[0]][coordinate[1]].roomType.hp[0] <= 0) {
      this._map.list[coordinate[0]][coordinate[1]].roomType.hp[0] = 0;
    }

    return this._map.list[coordinate[0]][coordinate[1]].roomType.hp[0];
  }

  regenEnemy(coordinate: number[]): void {
    setTimeout(() => {
      this._map.list[coordinate[0]][coordinate[1]].roomType.hp[0] = this._map.list[coordinate[0]][coordinate[1]].roomType.hp[1];
    }, 30000);
    return;
  }
}
