import { IUserStatusType } from "../dataType/userStatusType";
import { Injectable } from "../../decorators/di.decorator";

@Injectable()
export class JobList {
  list: { 번호: number; 스탯: IUserStatusType }[] = [];
}
