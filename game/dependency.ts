import { Etc } from './setting/etc';
import { ItemGenerator } from './setting/itemGenerator';
import { JobGenerator } from './setting/jobGenerator';
import { UserGenerator } from './setting/userGenerator';
import { MapGenerator } from './setting/mapGenerator';

import { JobList } from './data/jobList';
import { MapList } from './data/mapList';
import { UserData } from './data/userData';

import { MoveOutput } from './adapter/output/move/move.output';
import { NpcOutput } from './adapter/output/npc/npc.output';
import { EnemyOutput } from './adapter/output/enemy/enemy.output';
import { CharacterCommandOutput } from './adapter/output/character/characterCommand.output';
import { CharacterQueryOutput } from './adapter/output/character/characterQuery.output';

import { IMoveOutput } from './domain/move/port/IMoveOutput';
import { INpcOutput } from './domain/npc/port/INpcOutput';
import { IEnemyOutput } from './domain/enemy/port/IEnemyOutput';
import { ICharacterCommandOutput } from './domain/character/port/ICharacterCommandOutput';
import { ICharacterQueryOutput } from './domain/character/port/ICharacterQueryOutput';

import { MoveDomain } from './domain/move/move';
import { NpcDomain } from './domain/npc/npc.domain';
import { EnemyDomain } from './domain/enemy/enemy.domain';
import { CharacterDomain } from './domain/character/character.domain';

import { Input } from './adapter/input/input';

import { Game } from './game';

// 의존성 주입

// 그냥 공통으로 사용하는 기타 함수들
const etc = new Etc();

// 게임 시작 전

// 게임 중에 계속 바뀌는 class (상태)
const mapList = new MapList();
const jobList = new JobList();
const userData = new UserData();

// 위의 클래스들을 만들어주는 class (행동)
const item = new ItemGenerator(etc);
const mapGenerator = new MapGenerator(item, etc, mapList);
const jobGenerator = new JobGenerator(jobList);
const userGenerator = new UserGenerator(userData);

// 게임 시작 후

// 바깥쪽 (setting)
const characterCommandOutput: ICharacterCommandOutput = new CharacterCommandOutput(jobList, userData);
const characterQueryOutput: ICharacterQueryOutput = new CharacterQueryOutput(jobList, userData);
const moveOutput: IMoveOutput = new MoveOutput(userData, mapList);
const npcOutput: INpcOutput = new NpcOutput(mapList);
const enemyOutput: IEnemyOutput = new EnemyOutput(mapList);

// 핵심 로직
const charaterDomain = new CharacterDomain(characterCommandOutput, characterQueryOutput);
const moveDomain = new MoveDomain(moveOutput, characterQueryOutput);
const npcDomain = new NpcDomain(npcOutput, characterCommandOutput);
const enemyDomain = new EnemyDomain(enemyOutput, characterCommandOutput, characterQueryOutput, etc);

// 바깥쪽2 (외부입력)
const input = new Input(charaterDomain, npcDomain, moveDomain, enemyDomain);

// 최종 인스턴스
const game = new Game(mapGenerator, jobGenerator, userGenerator, input);

game.start(21, 21);
