import { Injectable } from "../../../../decorators/di.decorator";
import { JobList } from "../../../data/jobList";
import { UserData } from "../../../data/userData";

import { IUserStatusType } from "../../../dataType/userStatusType";

import { ICharacterQueryOutput } from "../../../domain/character/port/ICharacterQueryOutput";
import { JobGenerator } from "../../../setting/jobGenerator";
import { UserGenerator } from "../../../setting/userGenerator";

@Injectable()
export class CharacterQueryOutput implements ICharacterQueryOutput {
  constructor(private _job: JobGenerator, private _user: UserGenerator) {}

  getJobList(): { 번호: number; 스탯: IUserStatusType }[] {
    return this._job._job.list;
  }

  getUserData(): IUserStatusType {
    return this._user._user.data;
  }
}
