import { IUserStatusType } from '../../../dataType/userStatusType';

export interface ICharacterQueryOutput {
  getJobList(): { 번호: number; 스탯: IUserStatusType }[];
  getUserData(): IUserStatusType;
}
