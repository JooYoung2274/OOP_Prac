import { JobList } from '../data/jobList';
import { JobSchema } from './schema/job';

const jobStatus = [{ type: '전사', lv: 1, hp: [100, 100], exp: 0, atk: 10 }];

export class JobGenerator {
  constructor(private _job: JobList) {}

  jobGenerator() {
    for (let i = 0; i < jobStatus.length; i++) {
      this._job.list.push(new JobSchema(jobStatus[i]));
    }
    return (this._job.list = this._job.list.map((v, i) => {
      return { 번호: i, 스탯: v._info };
    }));
  }
}
