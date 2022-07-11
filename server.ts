import express from "express";
import dotenv from "dotenv";
import db from "./models";

import Account from "./controllers/AccountController";

dotenv.config();

const app = express();
app.use(express.json());

// db.sequelize.sync({ alter: true });

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server PORT ${process.env.SERVER_PORT} running`)
);

app.post("/v1/accounts/", Account.Create);
