import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.clients;

const Client = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { clientName } = req.body;

      const data = {
        client_name: clientName,
      };

      const client = await Service.Creating(dbMaster, data);

      res.status(201).json(Service.responseBuilder("success", "Create Data Success", client));
    } catch (err: any) {
      res.status(400).json(Service.responseBuilder("error", err , []));
    }
  },

  async Update(req: express.Request, res: express.Response): Promise<void> {
    try{
      const { clientName } = req.body;
      const { id } = req.params;

      const data = {
        client_name: clientName,
      };

      const client = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", client));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const client = await Service.FindingAll(dbMaster);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", client));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const client = await Service.FindingOne(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "Find data success", client));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Delete(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const client = await Service.Deleting(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "delete data success", client));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err));
    }
  }
};

export default Client;
