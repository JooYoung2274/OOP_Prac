import { JobList } from '../../../data/jobList';
import { UserData } from '../../../data/userData';

import { IUserStatusType } from '../../../dataType/userStatusType';

import { ICharacterQueryOutput } from '../../../domain/character/port/ICharacterQueryOutput';

export class CharacterQueryOutput implements ICharacterQueryOutput {
  constructor(private _job: JobList, private _user: UserData) {}

  getJobList(): { 번호: number; 스탯: IUserStatusType }[] {
    return this._job.list;
  }

  getUserData(): IUserStatusType {
    return this._user.data._info;
  }
}
