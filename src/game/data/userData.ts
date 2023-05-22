import { IUserStatusType } from "../dataType/userStatusType";
import { Injectable } from "../../decorators/di.decorator";

@Injectable()
export class UserData {
  data!: IUserStatusType;
}
