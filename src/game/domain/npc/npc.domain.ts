import { Injectable } from "../../../decorators/di.decorator";
import { CharacterCommandOutput } from "../../adapter/output/character/characterCommand.output";
import { NpcOutput } from "../../adapter/output/npc/npc.output";
import { ICharacterCommandOutput } from "../character/port/ICharacterCommandOutput";
import { INpcOutput } from "./port/INpcOutput";

@Injectable()
export class NpcDomain {
  constructor(
    private _npcOutput: NpcOutput,
    private _characterCommandOutput: CharacterCommandOutput
  ) {}

  getNpcItemByCoordinate(coordinate: number[]): string {
    return this._npcOutput.getNpcItemByCoordinate(coordinate);
  }

  useNpcItem(answer: string, coordinate: number[], isNpcItem: string): string {
    if (isNpcItem === "비어있음") {
      return isNpcItem;
    }

    if (answer === "미사용") {
      return answer;
    }

    this._npcOutput.updateNpcItem(coordinate);

    if (isNpcItem === "portion") {
      this._characterCommandOutput.updateUserHp(2);
      return "체력을 회복했습니다";
    }
    this._characterCommandOutput.updateUserArk(isNpcItem);
    return "공격력이 올랐습니다";
  }
}
