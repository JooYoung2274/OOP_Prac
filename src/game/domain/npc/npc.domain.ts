import { ICharacterCommandOutput } from '../character/port/ICharacterCommandOutput';
import { INpcOutput } from './port/INpcOutput';

export class NpcDomain {
  constructor(private _npcOutput: INpcOutput, private _characterCommandOutput: ICharacterCommandOutput) {}

  getNpcItemByCoordinate(coordinate: number[]): string {
    return this._npcOutput.getNpcItemByCoordinate(coordinate);
  }

  useNpcItem(answer: string, coordinate: number[], isNpcItem: string): string {
    if (isNpcItem === '비어있음') {
      return isNpcItem;
    }

    if (answer === '미사용') {
      return answer;
    }

    this._npcOutput.updateNpcItem(coordinate);

    if (isNpcItem === 'portion') {
      this._characterCommandOutput.updateUserHp(2);
      return '체력을 회복했습니다';
    }
    this._characterCommandOutput.updateUserArk(isNpcItem);
    return '공격력이 올랐습니다';
  }
}
