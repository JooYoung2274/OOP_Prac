import { IUserStatusType } from '../../../dataType/userStatusType';

export interface ICharacterCommandOutput {
  addUser(num: number): IUserStatusType;
  updateUserHp(num: number): void;
  updateUserArk(item: string): void;
  updateUserExp(exp: number): number;
  updateUserLv(): void;
  updateUserLocation(location: number[]): void;
  subtractUserHp(atk: number): number;
  twiceUserAtk(): void;
}
