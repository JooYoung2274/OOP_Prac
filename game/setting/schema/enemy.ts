import { Human } from "./human";

export class Enemy extends Human {
  name: string;
  constructor(
    {
      type,
      lv,
      exp,
      hp,
      atk,
      location,
    }: {
      type: string;
      lv: number;
      exp: number;
      hp: number[];
      atk: number;
      location: number[];
    },
    name: string
  ) {
    super({ type, lv, exp, hp, atk, location });
    this.name = name;
  }
}
