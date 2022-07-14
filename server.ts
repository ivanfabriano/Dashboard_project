import express from "express";
import dotenv from "dotenv";
import db from "./models";
import fileUpload from "express-fileupload";
import cors from "cors";

import AuthCheck from "./middlewares/AuthChecking";

import Account from "./controllers/AccountController";
import Role from "./controllers/RoleController";
import Auth from "./controllers/AuthController";
import Client from "./controllers/ClientController";
import DetailProject from "./controllers/DetailProjectController";
import MeetingMethod from "./controllers/MeetingMethodController";
import Project from "./controllers/ProjectController";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(
  cors({
  origin: "*"
  })
);


// db.sequelize.sync({ alter: true });

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server PORT ${process.env.SERVER_PORT} running`)
);

app.post("/v1/login/", Auth.Login);
app.post("/v1/forgot/", Auth.ForgotPassword);

app.post("/v1/accounts/", Account.Create);
app.put("/v1/accounts/:id", Account.Update);
app.get("/v1/accounts/", AuthCheck, Account.FindAll);
app.get("/v1/accounts/:id", Account.FindOne);
app.delete("/v1/accounts/", Account.Delete);

app.post("/v1/roles/", Role.Create);
app.put("/v1/roles/:id", Role.Update);
app.get("/v1/roles/", Role.FindAll);
app.get("/v1/roles/:id", Role.FindOne);
app.delete("/v1/roles/", Role.Delete);

app.post("/v1/clients/", Client.Create);
app.put("/v1/clients/:id", Client.Update);
app.get("/v1/clients/", Client.FindAll);
app.get("/v1/clients/:id", Client.FindOne);
app.delete("/v1/clients/", Client.Delete);

app.post("/v1/detailprojects/", DetailProject.Create);
app.put("/v1/detailprojects/:id", DetailProject.Update);
app.get("/v1/detailprojects/", DetailProject.FindAll);
app.get("/v1/detailprojects/:id", DetailProject.FindOne);
app.delete("/v1/detailprojects/", DetailProject.Delete);

app.post("/v1/projects/", Project.Create);
app.post("/v1/projects/upload/:id", Project.Upload);
app.put("/v1/projects/:id", Project.Update);
app.get("/v1/projects/", Project.FindAll);
app.get("/v1/projects/:id", Project.FindOne);
app.get("/v1/projects/download/:id", Project.Download);
app.delete("/v1/projects/", Project.Delete);

app.post("/v1/meetingmethods/", MeetingMethod.Create);
app.put("/v1/meetingmethods/:id", MeetingMethod.Update);
app.get("/v1/meetingmethods/", MeetingMethod.FindAll);
app.get("/v1/meetingmethods/:id", MeetingMethod.FindOne);
app.delete("/v1/meetingmethods/", MeetingMethod.Delete);

