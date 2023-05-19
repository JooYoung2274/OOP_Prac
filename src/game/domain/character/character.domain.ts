import { IUserStatusType } from '../../dataType/userStatusType';
import { ICharacterCommandOutput } from './port/ICharacterCommandOutput';
import { ICharacterQueryOutput } from './port/ICharacterQueryOutput';

export class CharacterDomain {
  constructor(private _characterCommandOutput: ICharacterCommandOutput, private _characterQueryOutput: ICharacterQueryOutput) {}

  getJobList(): { 번호: number; 스탯: IUserStatusType }[] {
    return this._characterQueryOutput.getJobList();
  }

  addUser(num: string, jobList: { 번호: number; 스탯: IUserStatusType }[]): false | IUserStatusType {
    const isJobList = jobList.map((v: { [x: string]: any }) => v['번호']);

    if (!num) {
      return false;
    }

    if (!isJobList.includes(Number(num))) {
      return false;
    }
    return this._characterCommandOutput.addUser(Number(num));
  }

  getUserData(): IUserStatusType {
    return this._characterQueryOutput.getUserData();
  }

  updateUserHp(): void {
    this._characterCommandOutput.updateUserHp(0.001);
    return;
  }
}
