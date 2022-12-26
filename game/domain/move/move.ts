import { IUserStatusType } from '../../dataType/userStatusType';
import { ICharacterQueryOutput } from '../character/port/ICharacterQueryOutput';
import { IMoveOutput } from './port/IMoveOutput';

export class MoveDomain {
  constructor(private _moveOutput: IMoveOutput, private _characterQueryOutput: ICharacterQueryOutput) {}

  moveUser(answer: string): false | IUserStatusType {
    const isLocation = this._characterQueryOutput.getUserData().location;
    const isMove = this.isMove(answer, isLocation);

    if (!isMove) {
      return false;
    }

    return this._moveOutput.locationMove(answer, isLocation);
  }

  isMove(direction: string, location: number[]): boolean {
    if (direction === '동' && location[1] === 20) {
      console.log('더는 갈 수 없습니다');
      return false;
    }

    if (direction === '서' && location[1] === 0) {
      console.log('더는 갈 수 없습니다');
      return false;
    }

    if (direction === '남' && location[0] === 20) {
      console.log('더는 갈 수 없습니다');
      return false;
    }

    if (direction === '북' && location[0] === 0) {
      console.log('더는 갈 수 없습니다');
      return false;
    }
    return true;
  }

  getRoomTypeByUserData(returned: IUserStatusType): any {
    return this._moveOutput.getRoomTypeByUserData(returned);
  }
}
