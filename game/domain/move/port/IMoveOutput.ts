import { IUserStatusType } from '../../../dataType/userStatusType';

export interface IMoveOutput {
  locationMove(direction: string, location: number[]): IUserStatusType;
  getRoomTypeByUserData(userData: IUserStatusType): any;
}
