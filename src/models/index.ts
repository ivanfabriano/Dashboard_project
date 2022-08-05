import { Sequelize, Op } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";

import AccountModel from "./Account";
import RoleModel from "./Roles";
import ProjectModel from "./Projects";
import DetailProjectModel from "./DetailProjects";
import ClientModel from "./Clients";
import MeetingModel from "./MeetingMethod";
import ForgotModel from "./ForgotPasswords";
import BlacklistModel from "./BlacklistTokens";

dotenv.config();

const DBNAME: any = process.env.DBNAME;
const DBPASS: any = process.env.DBPASS;
const HOST: any = process.env.HOST;
const DBDIALECT: any = process.env.DBDIALECT;
const SERVERNAME: any = process.env.SERVERNAME;

const sequelize = new Sequelize(DBNAME, SERVERNAME, DBPASS, {
  host: HOST,
  dialect: DBDIALECT,
  dialectModule: pg,
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.accounts = AccountModel(sequelize, Sequelize);
db.roles = RoleModel(sequelize, Sequelize);
db.projects = ProjectModel(sequelize, Sequelize);
db.meetingMethods = MeetingModel(sequelize, Sequelize);
db.clients = ClientModel(sequelize, Sequelize);
db.detailProjects = DetailProjectModel(sequelize, Sequelize);
db.blacklists = BlacklistModel(sequelize, Sequelize);
db.forgotpasswords = ForgotModel(sequelize, Sequelize);

db.projects.hasMany(db.detailProjects, {
  foreignKey: "detail_project_id",
});
db.detailProjects.belongsTo(db.projects, {
  foreignKey: "detail_project_id",
});

db.clients.hasMany(db.projects, {
  foreignKey: "project_client_id",
});
db.projects.belongsTo(db.clients, {
  foreignKey: "project_client_id",
});

db.roles.hasMany(db.accounts, {
  foreignKey: "account_role_id",
});
db.accounts.belongsTo(db.roles, {
  foreignKey: "account_role_id",
});

export default db;
