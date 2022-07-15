import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.roles;

const Role = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { roleName } = req.body;

      const data = {
        role_name: roleName,
      };

      const role = await Service.Creating(dbMaster, data);

      res.status(201).json(Service.responseBuilder("success", "Create Data Success", role));
    } catch (err: any) {
      res.status(400).json(Service.responseBuilder("error", err , []));
    }
  },

  async Update(req: express.Request, res: express.Response): Promise<void> {
    try{
      const { roleName } = req.body;
      const { id } = req.params;

      const data = {
        role_name: roleName,
      };

      const role = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", role));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const role = await Service.FindingAll(dbMaster);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", role));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const role = await Service.FindingOne(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "Find data success", role));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Delete(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const role = await Service.Deleting(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "delete data success", role));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err));
    }
  }
};

export default Role;
