import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.accounts;

const Account = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { username, email, contact, password, role } = req.body;

      const data = {
        account_username: username,
        account_email: email,
        account_contact: contact,
        account_password: password,
        account_role_id: role,
      };

      const account = await Service.Creating(dbMaster, data);

      res.status(201).json(Service.responseBuilder("success", "Create Data Success", {username: username, role: role}));
    } catch (err: any) {
      res.status(400).json(Service.responseBuilder("error", err , []));
    }
  },

  async Update(req: express.Request, res: express.Response): Promise<void> {
    try{
      const { username, email, contact, password, role } = req.body;
      const { id } = req.params;

      const data = {
        account_username: username,
        account_email: email,
        account_contact: contact,
        account_password: password,
        account_role_id: role,
      };

      const account = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", account));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const account = await Service.FindingAll(dbMaster);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", account));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const account = await Service.FindingOne(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "Find data success", account));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Delete(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const account = await Service.Deleting(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "delete data success", account));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err));
    }
  }
};

export default Account;
