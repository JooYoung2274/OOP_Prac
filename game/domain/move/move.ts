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
    const newLocation = this.returnedNewLocation(answer, isLocation);

    return this._moveOutput.locationMove(answer, newLocation);
  }

  returnedNewLocation(direction: string, isLocation: number[]): number[] {
    if (direction === '동') {
      return [isLocation[0], isLocation[1] + 1];
    }

    if (direction === '서') {
      return [isLocation[0], isLocation[1] - 1];
    }

    if (direction === '남') {
      return [isLocation[0] + 1, isLocation[1]];
    }

    if (direction === '북') {
      return [isLocation[0] - 1, isLocation[1]];
    }

    if (direction === '귀환') {
      const jobList = this._characterQueryOutput.getJobList();
      return jobList[0].스탯.location;
    }
    return [isLocation[0], isLocation[1]];
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
