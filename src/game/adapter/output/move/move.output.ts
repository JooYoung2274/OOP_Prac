import { Injectable } from "../../../../decorators/di.decorator";
import { mapList, userData } from "../../../data";

import { IUserStatusType } from "../../../dataType/userStatusType";

import { IMoveOutput } from "../../../domain/move/port/IMoveOutput";

@Injectable()
export class MoveOutput implements IMoveOutput {
  constructor() {}

  locationMove(direction: string, location: number[]): IUserStatusType {
    userData.data.location = [location[0], location[1]];

    return userData.data;
  }

  getRoomTypeByUserData(userData: IUserStatusType): any {
    const isRoomType =
      mapList.list[userData.location[0]][userData.location[1]].roomType;

    return isRoomType;
  }
}
