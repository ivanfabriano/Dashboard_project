import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.meetingMethods;

const MeetingMethod = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { meetingName } = req.body;

      const data = {
        meeting_name: meetingName,
      };

      const meeting = await Service.Creating(dbMaster, data);

      res.status(201).json(Service.responseBuilder("success", "Create Data Success", meeting));
    } catch (err: any) {
      res.status(400).json(Service.responseBuilder("error", err , []));
    }
  },

  async Update(req: express.Request, res: express.Response): Promise<void> {
    try{
      const { meetingName } = req.body;
      const { id } = req.params;

      const data = {
        meeting_name: meetingName,
      };


      const meeting = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", meeting));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const meeting = await Service.FindingAll(dbMaster);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", meeting));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const meeting = await Service.FindingOne(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "Find data success", meeting));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Delete(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const meeting = await Service.Deleting(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "delete data success", meeting));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err));
    }
  }
};

export default MeetingMethod;
