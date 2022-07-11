import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.projects;
const dbJoin = db.detailProjects;

const Project = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { projectName, projectClientId, projectPic, projectContact } = req.body;

      const data = {
        project_name: projectName,
        project_client_id: projectClientId,
        project_pic: projectPic,
        project_contact: projectContact,
      };

      const project = await Service.Creating(dbMaster, data);

      res.status(201).json(Service.responseBuilder("success", "Create Data Success", project));
    } catch (err: any) {
      res.status(400).json(Service.responseBuilder("error", err , []));
    }
  },

  async Update(req: express.Request, res: express.Response): Promise<void> {
    try{
      const { projectName, projectClientId, projectPic, projectContact } = req.body;
      const { id } = req.params;

      const data = {
        project_name: projectName,
        project_client_id: projectClientId,
        project_pic: projectPic,
        project_contact: projectContact,
      };
      const project = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const project = await Service.FindingAll(dbMaster, dbJoin);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const project = await Service.FindingOne(dbMaster, id, dbJoin);
      res.status(200).json(Service.responseBuilder("success", "Find data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Delete(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const project = await Service.Deleting(dbMaster, id);
      res.status(200).json(Service.responseBuilder("success", "delete data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err));
    }
  }
};

export default Project;
