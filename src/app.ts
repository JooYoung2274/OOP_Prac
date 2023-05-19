import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import { game } from "./router/test.router";

const app = express();
app.use(helmet());
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  game.start(21, 21);
});
