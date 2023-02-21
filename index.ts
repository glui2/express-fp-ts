import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Context, handleBanhMiOrder } from "./controller";
import bodyParser from "body-parser";
import { banhMiService } from "./services/banhmiService";
import { BanhMiStore } from "./store.ts/banhMiStore";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const context: Context = {
  banhMiService: banhMiService(new BanhMiStore()),
};

app.use(bodyParser.json());
app.get("/order/:ingredient", handleBanhMiOrder(context));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
