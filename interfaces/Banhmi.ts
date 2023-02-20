import { Either } from "fp-ts/lib/Either";
import { Option } from "fp-ts/lib/Option";

export type BanhmiMeat = "pork" | "chicken" | "tofu";

export class NotSoldError extends Error {
  public _tag: "BanhMiNotSoldError";

  private constructor() {
    super(`Requested meat is not sold at this banh mi store!`);
    this._tag = "BanhMiNotSoldError";
  }

  public static of(): NotSoldError {
    return new NotSoldError();
  }
}

export class NoStockError extends Error {
  public _tag: "BanhMiNoStockError";

  private constructor() {
    super(`We have no more of that meat at this banh mi store!`);
    this._tag = "BanhMiNoStockError";
  }

  public static of(): NoStockError {
    return new NoStockError();
  }
}

export interface BanhmiService {
  checkIfRequestedMeatIsSold(
    ingredient: string
  ): Either<NotSoldError, BanhmiMeat>;
  getRequestedMeat(meat: BanhmiMeat): Option<BanhmiMeat>;
  reduceStock(meat: BanhmiMeat): void;
}
