import { Injectable } from "../../../../decorators/di.decorator";
import { jobList, userData } from "../../../data";
import { IUserStatusType } from "../../../dataType/userStatusType";
import { ICharacterCommandOutput } from "../../../domain/character/port/ICharacterCommandOutput";

@Injectable()
export class CharacterCommandOutput implements ICharacterCommandOutput {
  constructor() {}

  addUser(num: number): IUserStatusType {
    const jobStatus = jobList.list[num].스탯;
    const userRawData = userData.data;

    userRawData.type = jobStatus.type;
    userRawData.lv = jobStatus.lv;
    userRawData.hp = jobStatus.hp;
    userRawData.atk = jobStatus.atk;

    return userData.data;
  }

  updateUserHp(num: number): void {
    userData.data.hp[0] = userData.data.hp[0] + userData.data.hp[1] / num;
    if (userData.data.hp[0] > userData.data.hp[1]) {
      userData.data.hp[0] = userData.data.hp[1];
    }
    return;
  }

  updateUserArk(item: string): void {
    const swordAtk = Number(item.split("/")[1]);
    userData.data.atk += swordAtk;
    return;
  }

  updateUserExp(exp: number): number {
    userData.data.exp = userData.data.exp + exp;
    return userData.data.exp;
  }

  updateUserLv(): void {
    userData.data.lv += 1;
    return;
  }

  updateUserLocation(location: number[]): void {
    userData.data.location[0] = location[0];
    userData.data.location[1] = location[1];
    return;
  }

  subtractUserHp(atk: number): number {
    userData.data.hp[0] = userData.data.hp[0] - atk;
    return userData.data.hp[0];
  }

  twiceUserAtk(): void {
    userData.data.atk *= 2;
    return;
  }
}
