import { MapList } from '../data/mapList';
import { Etc } from './etc';
import { ItemGenerator } from './itemGenerator';

import { Box } from './schema/box';
import { Enemy } from './schema/enemy';
import { Npc } from './schema/npc';

export class MapGenerator {
  constructor(private _itemGenerator: ItemGenerator, private _etc: Etc, private _map: MapList) {}

  mapGenerator(h: number, v: number): void {
    const randomNumberList = this._etc.generateRandomNumberList(h, v);

    for (let i = 0; i < h; i++) {
      this._map.list.push([]);
    }

    let k = 0;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < v; j++) {
        if (i === Math.floor(h / 2) && j === Math.floor(v / 2)) {
          this._map.list[i][j] = { roomType: { type: 'plaza' } };
          k++;
          continue;
        }

        if (randomNumberList[k] <= (h * v) / 3) {
          this._map.list[i][j] = { roomType: new Npc('npc', this._itemGenerator.randomItemGenrator()) };
        }

        if ((h * v) / 3 < randomNumberList[k] && ((h * v) / 3) * 2 >= randomNumberList[k]) {
          const enemyLV = this._etc.randomGenerator(9) + 1;
          const enemyInfo = {
            type: `enemy`,
            lv: enemyLV,
            hp: [enemyLV * 30, enemyLV * 30],
            exp: enemyLV,
            atk: enemyLV * 5,
            location: [i, j],
          };
          const name = `레벨${enemyLV} - 도적`;
          this._map.list[i][j] = { roomType: new Enemy(enemyInfo, name) };
        }

        if (((h * v) / 3) * 2 < randomNumberList[k] && h * v >= randomNumberList[k]) {
          this._map.list[i][j] = { roomType: new Box('box', this._itemGenerator.randomItemGenrator()) };
        }

        k++;
      }
    }
  }
}
