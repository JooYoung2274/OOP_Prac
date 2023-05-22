import { Injectable } from "../../../../decorators/di.decorator";
import { mapList } from "../../../data";
import { MapList } from "../../../data/mapList";

import { INpcOutput } from "../../../domain/npc/port/INpcOutput";

@Injectable()
export class NpcOutput implements INpcOutput {
  constructor() {}

  getNpcItemByCoordinate(coordinate: number[]): string {
    return mapList.list[coordinate[0]][coordinate[1]].roomType.item;
  }

  updateNpcItem(coordinate: number[]): void {
    mapList.list[coordinate[0]][coordinate[1]].roomType.item = "비어있음";
    return;
  }
}
