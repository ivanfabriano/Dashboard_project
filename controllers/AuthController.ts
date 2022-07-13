import express from "express";
import Service from "../services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import db from "../models";

dotenv.config();

const AccessToken: any = process.env.TOKEN_SECRET;
const RefreshToken: any = process.env.RTOKEN_SECRET;

const dbMaster = db.accounts;
const dbSecondary = db.blacklists;
const dbAccount = db.accounts;
const dbForgot = db.forgotpasswords;

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
            res.status(400).json(Service.responseBuilder("error", "Login failed", []));
        }
    },

    async Logout(req: express.Request, res: express.Response): Promise<void> {
        try{
            const { accessToken , refreshToken } = req.body;

            const data = {
                token: accessToken, 
                refreshToken: refreshToken
            };

            const blacklist = await Service.Creating(dbSecondary, data);

            res.status(200).json(Service.responseBuilder("success", "Logout success", []))
        }catch(err: any){
            res.status(400).json(Service.responseBuilder("error", "Logout failed", []));
        }
    },

    async RefreshToken(req: express.Request, res: express.Response): Promise<void> {
        try{
            const { oldRefreshToken } = req.body;

            if(!oldRefreshToken || oldRefreshToken === ""){
                res.status(400).json(Service.responseBuilder("error", "refresh token not exist", []));
            }else{
                jwt.verify(oldRefreshToken, RefreshToken, async (err: any, user: any) => {
                    if(err){
                        res.status(403).json(Service.responseBuilder("error", "Invalid refresh Token", []));
                    }else{

                        const blacklistToken = await Service.FindingCustom(dbSecondary, {refreshToken: oldRefreshToken});

                        if(!blacklistToken === null){
                            res.status(403).json(Service.responseBuilder("error", "Refresh token is disabled", []));
                        }else{
                            const argsToken = {
                                username: user.account_username,
                                role: user.account_role_id,
                                email: user.account_email
                            };
    
                            const accessToken = jwt.sign(argsToken, AccessToken, { expiresIn: "300s" });
                            const refreshToken = jwt.sign(argsToken, RefreshToken, { expiresIn: "1200s" });
    
                            const data = {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            };
    
                            res.status(200).json(Service.responseBuilder("success", "Token renewal success", data));
                        }

                    }
                })
            }

        }catch(err){
            res.status(400).json(Service.responseBuilder("error", "refresh token failed", []));
        }
    },

    async ForgotPassword(req: express.Request, res: express.Response): Promise<void> {
        const { email } = req.body;

        const validEmail = await Service.FindingCustom(dbAccount, { account_email: email});

        if( validEmail === null){
            res.status(400).json(Service.responseBuilder("error", "Email does not exist", []));
        }else{
            const data = {
                user_id: validEmail.id,
                unix_id: Math.random().toString(36).substring(2,100),
                status: true
            }
            const sendEMail = Service.SendingEmail(email, data.unix_id);
    
            if(sendEMail){

                const forgotList = await Service.Creating(dbForgot, data);

                res.status(200).json(Service.responseBuilder("success", "Check your email for renewal password", []));
            }else{
                res.status(400).json(Service.responseBuilder("error", "Email send failed", []));
            
        }

        }
        
    }
}

export default Auth;