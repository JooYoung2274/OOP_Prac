export class Etc {
  randomGenerator(num: number): number {
    return Math.floor(Math.random() * num);
  }

  generateRandomNumberList(h: number, v: number): number[] {
    let randumNumberList: number[] = [];
    while (randumNumberList.length !== h * v) {
      const randumNumber = this.randomGenerator(h * v);

      if (!randumNumberList.includes(randumNumber)) {
        randumNumberList.push(randumNumber);
      }
    }
    return randumNumberList;
  }
}
