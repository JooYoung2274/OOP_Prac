import { MapList } from '../../../data/mapList';
import { UserData } from '../../../data/userData';

import { IUserStatusType } from '../../../dataType/userStatusType';

import { IMoveOutput } from '../../../domain/move/port/IMoveOutput';

export class MoveOutput implements IMoveOutput {
  constructor(private _user: UserData, private _map: MapList) {}

  locationMove(direction: string, location: number[]): IUserStatusType {
    if (direction === '동') {
      this._user.data._info.location = [location[0], location[1] + 1];
    }

    if (direction === '서') {
      this._user.data._info.location = [location[0], location[1] - 1];
    }

    if (direction === '남') {
      this._user.data._info.location = [location[0] + 1, location[1]];
    }

    if (direction === '북') {
      this._user.data._info.location = [location[0] - 1, location[1]];
    }

    return this._user.data._info;
  }

  getRoomTypeByUserData(userData: IUserStatusType): any {
    const isRoomType = this._map.list[userData.location[0]][userData.location[1]].roomType;

    return isRoomType;
  }
}
