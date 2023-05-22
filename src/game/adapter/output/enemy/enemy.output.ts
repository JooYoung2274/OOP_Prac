import { Injectable } from "../../../../decorators/di.decorator";
import { mapList } from "../../../data";
import { MapList } from "../../../data/mapList";

import { IEnemyOutput } from "../../../domain/enemy/port/IEnemyOutput";

@Injectable()
export class EnemyOutput implements IEnemyOutput {
  constructor() {}

  getEnemyStatusByCoordinate(coordinate: number[]): any {
    return mapList.list[coordinate[0]][coordinate[1]].roomType;
  }

  subtractEnemyHp(userAtk: number, coordinate: number[]): number {
    mapList.list[coordinate[0]][coordinate[1]].roomType.hp[0] =
      mapList.list[coordinate[0]][coordinate[1]].roomType.hp[0] - userAtk;

    if (mapList.list[coordinate[0]][coordinate[1]].roomType.hp[0] <= 0) {
      mapList.list[coordinate[0]][coordinate[1]].roomType.hp[0] = 0;
    }

    return mapList.list[coordinate[0]][coordinate[1]].roomType.hp[0];
  }

  regenEnemy(coordinate: number[]): void {
    setTimeout(() => {
      mapList.list[coordinate[0]][coordinate[1]].roomType.hp[0] =
        mapList.list[coordinate[0]][coordinate[1]].roomType.hp[1];
    }, 30000);
    return;
  }
}
