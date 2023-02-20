import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { BanhmiMeat, BanhmiService, NotSoldError } from "../interfaces/Banhmi";
import { BanhMiStore } from "../store.ts/banhMiStore";

export const banhMiRestaurant = (store: BanhMiStore): BanhmiService => {
  return {
    checkIfRequestedMeatIsSold: (
      ingredient: string
    ): E.Either<NotSoldError, BanhmiMeat> => {
      if (store.isSold(ingredient)) {
        return E.right(ingredient as BanhmiMeat);
      } else {
        return E.left(NotSoldError.of());
      }
    },

    getRequestedMeat: (meat: BanhmiMeat): O.Option<BanhmiMeat> => {
      return store.getMeatStock(meat) > 0 ? O.some(meat) : O.none;
    },

    reduceStock: (meat: BanhmiMeat) => {
      store.reduceStock(meat);
    },
  };
};
