import { Request, Response } from "express";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { flow } from "fp-ts/lib/function";
import { BanhmiService } from "./interfaces/Banhmi";

// type check
// inStock
// reduce level of specified stock
export type Context = {
  banhMiService: BanhmiService;
};

export const handleBanhMiOrder =
  ({ banhMiService }: Context) =>
  (req: Request, res: Response) => {
    const banhMiPipeline = flow(
      // flow is basically reusable pipeline of functions
      banhMiService.checkIfRequestedMeatIsSold, // Right<BanhMiMeat>
      E.map(
        // Some<BanhMiMeat>
        flow(banhMiService.getRequestedMeat, O.map(banhMiService.reduceStock))
      )
    );
    const result = banhMiPipeline(req.params["ingredient"]);
    E.match(
      // in the case of left: do ____, right: do ____
      (e) => {
        console.log(e);
        res.send(`There was a problem with your order: ${e}`);
      },
      (v) => {
        console.log(v);
        res.send(
          `Thanks for your order! Your ${req.params["ingredient"]} banh mi is coming soon.`
        );
      }
    )(result);
  };
