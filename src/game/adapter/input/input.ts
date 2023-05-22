import * as readline from "readline";
import * as util from "util";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

import { IUserStatusType } from "../../dataType/userStatusType";

import { CharacterDomain } from "../../domain/character/character.domain";
import { EnemyDomain } from "../../domain/enemy/enemy.domain";
import { MoveDomain } from "../../domain/move/move";
import { NpcDomain } from "../../domain/npc/npc.domain";
import { Injectable } from "../../../decorators/di.decorator";

@Injectable()
export class Input {
  constructor(
    private _charaterDomain: CharacterDomain,
    private _npcDomain: NpcDomain,
    private _moveDomain: MoveDomain,
    private _enemyDomain: EnemyDomain
  ) {}

  startPhase(): void {
    console.log(
      "\n==========================머드 게임==========================="
    );
    rl.question(`\n\n아무 버튼이나 입력해주세요 \n\n INPUT :`, (answer) => {
      const jobList = this._charaterDomain.getJobList();
      return this.characterPhase(jobList);
    });
  }

  characterPhase(jobList: { 번호: number; 스탯: IUserStatusType }[]): void {
    console.log(
      "\n==========================직업 리스트==========================="
    );
    console.log("\n", util.inspect(jobList, false, null));
    console.log("\n");
    console.log(
      "\n==========================캐릭터 생성==========================="
    );
    rl.question(`\n원하는 캐릭터 번호를 입력하세요 \n INPUT :`, (answer) => {
      console.log("\n");
      const userData = this._charaterDomain.addUser(answer, jobList);

      if (!userData) {
        console.log("\n잘못된 입력입니다. 다시 선택해주세요");
        return this.characterPhase(jobList);
      }
      console.log(
        "\n==========================유저 데이터==========================="
      );
      console.log("\n", util.inspect(userData, false, null));
      console.log("\n");
      return this.plazaPhase();
    });
  }

  plazaPhase(): void {
    console.log(
      "\n==========================현재 위치 : 광장========================"
    );
    this._charaterDomain.updateUserHp();
    this.movePhase();
  }

  movePhase(): void {
    rl.question(`\n이동 :[동 / 서 / 남 / 북 / 귀환] \n INPUT :`, (answer) => {
      const returned = this._moveDomain.moveUser(answer);
      console.log("\n");
      console.log("\n", util.inspect(returned, false, null));
      if (!returned) {
        console.log("더이상 갈 수 없습니다");
        return this.movePhase();
      }

      const roomType = this._moveDomain.getRoomTypeByUserData(returned);

      return this.phaseGuide({ returned, roomType });
    });
  }

  npcPhase(coordinate: number[], isNpcItem: string): void {
    console.log("\n");
    console.log(
      "\n==========================현재 위치 : NPC========================"
    );
    rl.question(
      `\nNPC : ${isNpcItem} 이/가 있습니다. [사용 / 미사용] \n INPUT :`,
      (answer) => {
        const returned = this._npcDomain.useNpcItem(
          answer,
          coordinate,
          isNpcItem
        );
        console.log("\n");
        console.log(returned);
        return this.movePhase();
      }
    );
  }

  enemyPhase(
    coordinate: number[],
    isEnermyStatus: { hp: number[]; exp: number; atk: number }
  ): void {
    console.log("\n");
    console.log(
      "\n========================현재 위치 : ENEMY======================="
    );

    const userData = this._charaterDomain.getUserData();
    console.log(util.inspect(isEnermyStatus, false, null));
    console.log(util.inspect(userData, false, null));
    rl.question(
      `\n 공격하시겠습니까? \n\n[공격 / 도망] \n INPUT :`,
      (answer) => {
        const returned = this._enemyDomain.fightEnemy(
          answer,
          coordinate,
          isEnermyStatus
        );

        // console.log(userData);

        if (returned === "실패") {
          console.log("\n", returned);
          return this.enemyPhase(coordinate, isEnermyStatus);
        }

        if (returned === "죽었습니다") {
          console.log("\n", returned);
          return this.plazaPhase();
        }

        if (returned === "적을 처치했습니다") {
          console.log("\n", returned);
          return this.movePhase();
        }

        if (returned === "공격했습니다") {
          console.log("\n", returned);
          return this.enemyPhase(coordinate, isEnermyStatus);
        }
        console.log("\n", returned);
        return this.movePhase();
      }
    );
  }

  boxPhase(coordinate: number[], isNpcItem: string): void {
    console.log("\n");
    console.log(
      "\n========================현재 위치 : Box======================="
    );
    rl.question(`\nBOX : ${isNpcItem} [사용 / 미사용] \n INPUT :`, (answer) => {
      const returned = this._npcDomain.useNpcItem(
        answer,
        coordinate,
        isNpcItem
      );

      console.log("\n");
      console.log(returned);
      return this.movePhase();
    });
  }

  phaseGuide({ returned, roomType }: { returned: any; roomType: any }): void {
    if (roomType["type"] === "plaza") {
      return this.plazaPhase();
    }

    if (roomType["type"] === "npc") {
      const isNpcItem = this._npcDomain.getNpcItemByCoordinate(
        returned.location
      );
      return this.npcPhase(returned.location, isNpcItem);
    }

    if (roomType["type"] === "box") {
      const isNpcItem = this._npcDomain.getNpcItemByCoordinate(
        returned.location
      );
      return this.boxPhase(returned.location, isNpcItem);
    }

    if (roomType["type"] === "enemy") {
      const isEnemyStatus = this._enemyDomain.getEnemyStatusByCoordinate(
        returned.location
      );
      if (isEnemyStatus.hp[0] <= 0) {
        console.log("\n");
        console.log(
          "\n========================현재 위치 : ENEMY======================="
        );
        console.log("\nENERMY : 적이 없습니다");
        return this.movePhase();
      }
      return this.enemyPhase(returned.location, isEnemyStatus);
    }
  }
}
