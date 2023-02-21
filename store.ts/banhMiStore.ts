import { BanhmiMeat } from "../types";

export class BanhMiStore {
  pork: number;
  chicken: number;
  tofu: number;

  constructor() {
    this.pork = 5;
    this.chicken = 3;
    this.tofu = 1;
  }

  isSold(value: string): value is BanhmiMeat {
    return ["pork", "chicken", "tofu"].includes(value as BanhmiMeat);
  }

  getMeatStock(meat: BanhmiMeat): number {
    switch (meat) {
      case "pork":
        if (this.pork > 0) return this.pork;
      case "chicken":
        if (this.chicken > 0) return this.chicken;
      case "tofu":
        if (this.tofu > 0) return this.tofu;
      default:
        return 0;
    }
  }

  reduceStock(meat: BanhmiMeat): void {
    if (this.getMeatStock(meat) != null) {
      switch (meat) {
        case "pork":
          this.pork -= 1;
        case "chicken":
          this.chicken -= 1;
        case "tofu":
          this.tofu -= 1;
      }
    }
  }
}
