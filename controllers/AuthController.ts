import express from "express";
import Service from "../services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models";

dotenv.config();

const AccessToken: any = process.env.TOKEN_SECRET;
const RefreshToken: any = process.env.RTOKEN_SECRET;

const dbMaster = db.accounts;

const Auth = {
    async Login(req: express.Request, res: express.Response): Promise<void> {
        try{
            const { username, password } = req.body;
            const salt: string = await bcrypt.genSalt(10);
            const account = await Service.FindingCustom(dbMaster, {account_username: username});

            if(account === null){
                res.status(401).json(Service.responseBuilder("error", "User does not exist", []));
            }else{
                const validPassword  = await bcrypt.compare(password, account.account_password);

                if(!validPassword){
                    res.status(401).json(Service.responseBuilder("error", "Password is not correct", []));
                }else{
                    const argsToken = {
                        username: account.account_username,
                        role: account.account_role_id,
                        email: account.account_email
                    }
                    const accessToken = jwt.sign(argsToken, AccessToken, { expiresIn: "300s" });
                    const refreshToken = jwt.sign(argsToken, RefreshToken, { expiresIn: "1200s" });

                    const data = {
                        username: account.account_username,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }

                    res.status(200).json(Service.responseBuilder("success", "Login success", data));
                }
            }

        }catch(err: any){
            res.status(400).json(Service.responseBuilder("error", err, []));
        }
    }
}

export default Auth;