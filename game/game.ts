import { Input } from './adapter/input/input';

import { JobGenerator } from './setting/jobGenerator';
import { MapGenerator } from './setting/mapGenerator';
import { UserGenerator } from './setting/userGenerator';

export class Game {
  constructor(private _map: MapGenerator, private _job: JobGenerator, private _user: UserGenerator, private _input: Input) {}

  initSetting(h: number, v: number) {
    this._map.mapGenerator(h, v);
    this._job.jobGenerator();
    this._user.userGenerator(h, v);
    return;
  }

  start(h: number, v: number) {
    this.initSetting(h, v);
    this._input.startPhase();
  }
}
