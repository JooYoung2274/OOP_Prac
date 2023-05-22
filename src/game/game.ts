import { Injectable } from "../decorators/di.decorator";
import { Input } from "./adapter/input/input";

import { JobGenerator } from "./setting/jobGenerator";
import { MapGenerator } from "./setting/mapGenerator";
import { UserGenerator } from "./setting/userGenerator";

@Injectable()
export class Game {
  constructor(
    private _map: MapGenerator,
    private _job: JobGenerator,
    private _user: UserGenerator,
    private _input: Input
  ) {}

  initSetting(h: number, v: number) {
    console.log("init");
    this._map.mapGenerator(h, v);
    this._job.jobGenerator(h, v);
    this._user.userGenerator(h, v);
    return;
  }

  initMethod(h: number, v: number) {
    console.log("game start");
    this.initSetting(h, v);
    this._input.startPhase();
  }
}
