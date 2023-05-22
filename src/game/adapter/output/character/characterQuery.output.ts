import { Injectable } from "../../../../decorators/di.decorator";
import { jobList, userData } from "../../../data";
import { IUserStatusType } from "../../../dataType/userStatusType";
import { ICharacterQueryOutput } from "../../../domain/character/port/ICharacterQueryOutput";

@Injectable()
export class CharacterQueryOutput implements ICharacterQueryOutput {
  constructor() {}

  getJobList(): { 번호: number; 스탯: IUserStatusType }[] {
    return jobList.list;
  }

  getUserData(): IUserStatusType {
    return userData.data;
  }
}
