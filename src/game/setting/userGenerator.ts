import { Injectable } from "../../decorators/di.decorator";
import { userData } from "../data";
import { UserData } from "../data/userData";
import { Human } from "./schema/human";

@Injectable()
export class UserGenerator {
  constructor() {}

  userGenerator(h: number, v: number): UserData {
    const user = new Human({
      type: "init",
      lv: 0,
      hp: [0, 0],
      exp: 0,
      atk: 0,
      location: [Math.floor(h / 2), Math.floor(v / 2)],
    });
    userData.data = user;
    return userData;
  }
}
