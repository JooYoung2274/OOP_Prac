import { MapList } from '../../../data/mapList';

import { INpcOutput } from '../../../domain/npc/port/INpcOutput';

export class NpcOutput implements INpcOutput {
  constructor(private _map: MapList) {}

  getNpcItemByCoordinate(coordinate: number[]): string {
    return this._map.list[coordinate[0]][coordinate[1]].roomType.item;
  }

  updateNpcItem(coordinate: number[]): void {
    this._map.list[coordinate[0]][coordinate[1]].roomType.item = '비어있음';
    return;
  }
}
