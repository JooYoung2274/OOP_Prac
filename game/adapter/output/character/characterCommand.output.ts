import { JobList } from '../../../data/jobList';
import { UserData } from '../../../data/userData';

import { IUserStatusType } from '../../../dataType/userStatusType';

import { ICharacterCommandOutput } from '../../../domain/character/port/ICharacterCommandOutput';

export class CharacterCommandOutput implements ICharacterCommandOutput {
  constructor(private _job: JobList, private _user: UserData) {}

  addUser(num: number): IUserStatusType {
    const jobStatus = this._job.list[num].스탯;
    const userRawData = this._user.data._info;
    userRawData.type = jobStatus.type;
    userRawData.lv = jobStatus.lv;
    userRawData.hp = jobStatus.hp;
    userRawData.atk = jobStatus.atk;

    return this._user.data._info;
  }

  updateUserHp(num: number): void {
    this._user.data._info.hp[0] = this._user.data._info.hp[0] + this._user.data._info.hp[1] / num;
    if (this._user.data._info.hp[0] > this._user.data._info.hp[1]) {
      this._user.data._info.hp[0] = this._user.data._info.hp[1];
    }
    return;
  }

  updateUserArk(item: string): void {
    const swordAtk = Number(item.split('/')[1]);
    this._user.data._info.atk += swordAtk;
    return;
  }

  updateUserExp(exp: number): number {
    this._user.data._info.exp = this._user.data._info.exp + exp;
    return this._user.data._info.exp;
  }

  updateUserLv(): void {
    this._user.data._info.lv += 1;
    return;
  }

  updateUserLocation(location: number[]): void {
    this._user.data._info.location[0] = location[0];
    this._user.data._info.location[1] = location[1];
    return;
  }

  subtractUserHp(atk: number): number {
    this._user.data._info.hp[0] = this._user.data._info.hp[0] - atk;
    return this._user.data._info.hp[0];
  }

  twiceUserAtk(): void {
    this._user.data._info.atk *= 2;
    return;
  }
}
