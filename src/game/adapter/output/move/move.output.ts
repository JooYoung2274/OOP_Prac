import { MapList } from '../../../data/mapList';
import { UserData } from '../../../data/userData';

import { IUserStatusType } from '../../../dataType/userStatusType';

import { IMoveOutput } from '../../../domain/move/port/IMoveOutput';

export class MoveOutput implements IMoveOutput {
  constructor(private _user: UserData, private _map: MapList) {}

  locationMove(direction: string, location: number[]): IUserStatusType {
    this._user.data.location = [location[0], location[1]];

    return this._user.data;
  }

  getRoomTypeByUserData(userData: IUserStatusType): any {
    const isRoomType = this._map.list[userData.location[0]][userData.location[1]].roomType;

    return isRoomType;
  }
}
