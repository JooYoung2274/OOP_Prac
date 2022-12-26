import { Etc } from './etc';

export const itemData = ['sword', 'portion'];

export class ItemGenerator {
  constructor(private _etc: Etc) {}

  randomItemGenrator(): string {
    if (this._etc.randomGenerator(2)) {
      return this.swordGenerator();
    }
    return this.portionGenerator();
  }

  swordGenerator(): string {
    const ark = this._etc.randomGenerator(10) + 1;
    return `${itemData[0]}/${ark}`;
  }

  portionGenerator(): string {
    return 'portion';
  }
}
