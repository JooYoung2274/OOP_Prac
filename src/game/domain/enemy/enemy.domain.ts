import { IEnemyStatusType } from '../../dataType/enemyStatusType';

import { Etc } from '../../setting/etc';

import { IEnemyOutput } from './port/IEnemyOutput';
import { ICharacterCommandOutput } from '../character/port/ICharacterCommandOutput';
import { ICharacterQueryOutput } from '../character/port/ICharacterQueryOutput';

export class EnemyDomain {
  constructor(
    private _enemyOutput: IEnemyOutput,
    private _characterCommandOutput: ICharacterCommandOutput,
    private _characterQueryOutput: ICharacterQueryOutput,
    private _etc: Etc,
  ) {}

  getEnemyStatusByCoordinate(coordinate: number[]): any {
    return this._enemyOutput.getEnemyStatusByCoordinate(coordinate);
  }

  escapeTrial(isEnermyStatus: { atk: number }): IEnemyStatusType | string {
    const randomNumber = this._etc.randomGenerator(2);
    if (!randomNumber) {
      const userHp = this._characterCommandOutput.subtractUserHp(isEnermyStatus.atk);
      if (userHp <= 0) {
        const jobList = this._characterQueryOutput.getJobList();
        this._characterCommandOutput.updateUserLocation(jobList[0].스탯.location);
        return '죽었습니다';
      }
      return '실패';
    }
    return '성공';
  }

  fightEnemy(answer: string, coordinate: number[], isEnermyStatus: { hp: number[]; exp: number; atk: number }): string | IEnemyStatusType {
    if (answer === '도망') {
      return this.escapeTrial(isEnermyStatus);
    }

    // 공격
    // 유저 공격력 가져오고
    const userData = this._characterQueryOutput.getUserData();

    // 유저 공격력 만큼 적 체력 깎고
    const newEnermyStatus = this._enemyOutput.subtractEnemyHp(userData.atk, coordinate);

    if (newEnermyStatus <= 0) {
      // 만약 적 체력이 0 이하로 떨어지면 유저의 경험치 올리고
      const userExp = this._characterCommandOutput.updateUserExp(isEnermyStatus.exp);

      // 만약 유저 경험치가 10 이상이면 레벨업 + 기타 등등
      if (userExp >= 10) {
        this._characterCommandOutput.updateUserLv();
        this._characterCommandOutput.twiceUserAtk();
        this._characterCommandOutput.updateUserHp(1);
        this._characterCommandOutput.updateUserExp(userExp * -1);
      }

      // 30초 뒤 다시 체력 100%으로
      this._enemyOutput.regenEnemy(coordinate);
      return '적을 처치했습니다';
    }

    // 적 공격력 만큼 유저 체력 깎고
    const userHp = this._characterCommandOutput.subtractUserHp(isEnermyStatus.atk);

    // 만약 유저 체력이 0 이하로 떨어지면 유저를 광장으로 리턴시킴
    if (userHp <= 0) {
      const jobList = this._characterQueryOutput.getJobList();
      this._characterCommandOutput.updateUserLocation(jobList[0].스탯.location);
      return '죽었습니다';
    }

    return '공격했습니다';
  }
}
