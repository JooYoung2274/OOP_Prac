import { UserData } from '../data/userData';
import { UserSchema } from './schema/user';

export class UserGenerator {
  constructor(private _user: UserData) {}

  userGenerator(h: number, v: number): UserData {
    this._user.data = new UserSchema({ type: '', lv: 0, hp: [0, 0], exp: 0, atk: 0, location: [Math.floor(h / 2), Math.floor(v / 2)] });
    return this._user;
  }
}
