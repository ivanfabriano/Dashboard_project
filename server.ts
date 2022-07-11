import express from "express";
import dotenv from "dotenv";
import db from "./models";

import Account from "./controllers/AccountController";
import Role from "./controllers/RoleController";
import Auth from "./controllers/AuthController";

dotenv.config();

const app = express();
app.use(express.json());


// db.sequelize.sync({ alter: true });

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server PORT ${process.env.SERVER_PORT} running`)
);

app.post("/v1/accounts/", Account.Create);

app.post("/v1/roles/", Role.Create);

app.post("/v1/login/", Auth.Login);
