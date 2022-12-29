import { IData } from './interface';

export class Human implements IData {
  type: string;
  lv: number;
  exp: number;
  hp: number[];
  atk: number;
  location: number[];
  constructor({ type, lv, exp, hp, atk, location }: { type: string; lv: number; exp: number; hp: number[]; atk: number; location: number[] }) {
    this.type = type;
    this.lv = lv;
    this.exp = exp;
    this.hp = hp;
    this.atk = atk;
    this.location = location;
  }
}
