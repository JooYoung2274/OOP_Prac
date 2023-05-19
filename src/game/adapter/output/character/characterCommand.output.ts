import { Injectable } from "../../../../decorators/di.decorator";
import { JobList } from "../../../data/jobList";
import { UserData } from "../../../data/userData";

import { IUserStatusType } from "../../../dataType/userStatusType";

import { ICharacterCommandOutput } from "../../../domain/character/port/ICharacterCommandOutput";
import { JobGenerator } from "../../../setting/jobGenerator";
import { UserGenerator } from "../../../setting/userGenerator";

@Injectable()
export class CharacterCommandOutput implements ICharacterCommandOutput {
  constructor(private _job: JobGenerator, private _user: UserGenerator) {}

  addUser(num: number): IUserStatusType {
    const jobStatus = this._job._job.list[num].스탯;
    const userRawData = this._user._user.data;

    userRawData.type = jobStatus.type;
    userRawData.lv = jobStatus.lv;
    userRawData.hp = jobStatus.hp;
    userRawData.atk = jobStatus.atk;

    return this._user._user.data;
  }

  updateUserHp(num: number): void {
    this._user._user.data.hp[0] =
      this._user._user.data.hp[0] + this._user._user.data.hp[1] / num;
    if (this._user._user.data.hp[0] > this._user._user.data.hp[1]) {
      this._user._user.data.hp[0] = this._user._user.data.hp[1];
    }
    return;
  }

  updateUserArk(item: string): void {
    const swordAtk = Number(item.split("/")[1]);
    this._user._user.data.atk += swordAtk;
    return;
  }

  updateUserExp(exp: number): number {
    this._user._user.data.exp = this._user._user.data.exp + exp;
    return this._user._user.data.exp;
  }

  updateUserLv(): void {
    this._user._user.data.lv += 1;
    return;
  }

  updateUserLocation(location: number[]): void {
    this._user._user.data.location[0] = location[0];
    this._user._user.data.location[1] = location[1];
    return;
  }

  subtractUserHp(atk: number): number {
    this._user._user.data.hp[0] = this._user._user.data.hp[0] - atk;
    return this._user._user.data.hp[0];
  }

  twiceUserAtk(): void {
    this._user._user.data.atk *= 2;
    return;
  }
}
