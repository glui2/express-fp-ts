import { Request, Response } from "express";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { flow } from "fp-ts/lib/function";
import { BanhmiService } from "./interfaces/Banhmi";

// type check
// inStock
// reduce level of specified stock
type Context = {
  banhMiService: BanhmiService;
};

export const handleBanhMiOrder = (
  req: Request,
  res: Response,
  { banhMiService }: Context
) => {
  const banhMiPipeline = flow(
    banhMiService.checkIfRequestedMeatIsSold,
    E.map(
      flow(banhMiService.getRequestedMeat, O.map(banhMiService.reduceStock))
    )
  );
  banhMiPipeline(req);
  res.send("Thanks for your order!");
};
