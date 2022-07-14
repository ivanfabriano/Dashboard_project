import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.projects;
const dbJoin = db.detailProjects;
const dbClient = db.clients;

const Project = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { projectName, projectClientId, projectPic, projectContact } = req.body;

      const data = {
        project_name: projectName,
        project_client_id: projectClientId,
        project_pic: projectPic,
        project_contact: projectContact,
        project_filename: null
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
        project_contact: projectContact
      };
      const project = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const project = await Service.FindingAll(dbMaster, [dbJoin, dbClient]);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const project = await Service.FindingOne(dbMaster, id, [dbJoin, dbClient]);
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
  },

  async Upload(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      if (!req.files) {
        res.status(400).json(Service.responseBuilder("error", "File does not exist", []));
      } else {
        const file: any = req.files.file;

        const unix = Math.random().toString(36).substring(2,200);

        Service.Uploading(file, `${id}_${unix}_${file.name}`);

        const updateFile = await Service.Updating(dbMaster, { project_filename: `${id}_${unix}_${file.name}` }, id);

        res.status(201).json(Service.responseBuilder("success", "upload success"));
      }

    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Download(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const project = await Service.FindingOne(dbMaster, id);

      if(project === null){
        res.status(400).json(Service.responseBuilder("error", "Project does not exist", []));
      }else{
        if(project.project_filename === null){
          res.status(400).json(Service.responseBuilder("error", "File does not exist", []));
        }else{
          const file = `assets/files/${project.project_filename}`;
          res.download(file);
        }
      }
    }catch(err){
      res.status(400).json(Service.responseBuilder("error", "Download file failed", []))
    }
  }
};

export default Project;
