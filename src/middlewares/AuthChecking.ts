import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Service from "../services";
import db from "../models";

dotenv.config();

const AccessToken: any = process.env.TOKEN_SECRET;
const dbMaster = db.blacklists;

const AuthCheck = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res
      .status(401)
      .json(Service.responseBuilder("error", "Token is not found", []));
  } else {
    jwt.verify(token, AccessToken, async (err: any, user: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
            res.status(403).json(Service.responseBuilder("error", "TokenExpiredError", []));
        } else {
            res.status(403).json(Service.responseBuilder("error", "Invalid Token", []));
        }
      } else {
        const blacklistToken = await Service.FindingCustom(dbMaster, {
          token: token,
        });

        if (blacklistToken === null) {
          next();
        } else {
          res.status(403).json(Service.responseBuilder("error", "Token is disabled", []));
        }
      }
    });
  }
};

export default AuthCheck;
