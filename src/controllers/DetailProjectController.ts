import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.detailProjects;

const Client = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { 
        detailTime, 
        detailLocation, 
        detailMethod, 
        detailAttendee, 
        detailActivity, 
        detailProgress, 
        detailNextAction,
        detailTarget,
        detailProjectId
    } = req.body;

      const data = {
        detail_time: detailTime,
        detail_location: detailLocation,
        detail_method: detailMethod,
        detail_attendee: detailAttendee,
        detail_activity: detailActivity,
        detail_progress: detailProgress,
        detail_next_action: detailNextAction,
        detail_target: detailTarget,
        detail_project_id: detailProjectId,
      };

      const detailProject = await Service.Creating(dbMaster, data);

      res.status(201).json(Service.responseBuilder("success", "Create Data Success", detailProject));
    } catch (err: any) {
      console.log(err);
      
      res.status(400).json(Service.responseBuilder("error", err , []));
    }
  },

  async Update(req: express.Request, res: express.Response): Promise<void> {
    try{
      const { id } = req.params;
      const { 
        detailTime, 
        detailLocation, 
        detailMethod, 
        detailAttendee, 
        detailActivity, 
        detailProgress, 
        detailNextAction,
        detailTarget,
        detailProjectId
    } = req.body;

      const data = {
        detail_time: detailTime,
        detail_location: detailLocation,
        detail_method: detailMethod,
        detail_attendee: detailAttendee,
        detail_activity: detailActivity,
        detail_progress: detailProgress,
        detail_next_action: detailNextAction,
        detail_target: detailTarget,
        detail_project_id: detailProjectId,
      };
      const detailProject = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", detailProject));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const detailProject = await Service.FindingAll(dbMaster);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", detailProject));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const detailProject = await Service.FindingOne(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "Find data success", detailProject));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Delete(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const detailProject = await Service.Deleting(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "delete data success", detailProject));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err));
    }
  }
};

export default Client;
