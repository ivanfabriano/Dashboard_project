import express from "express";
import Service from "../services";
import db from "../models";

const dbMaster = db.projects;
const dbJoin = db.detailProjects;
const dbClient = db.clients;
const dbMethod = db.meetingMethods;


const Op = db.Op;

const Project = {
  async Create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { projectName, projectClientId, projectPic, projectContact, projectEditor } = req.body;

      const data = {
        project_name: projectName,
        project_client_id: projectClientId,
        project_pic: projectPic,
        project_contact: projectContact,
        project_filename: null,
        project_editor: projectEditor
      };

      const project = await Service.Creating(dbMaster, data);

      res.status(201).json(Service.responseBuilder("success", "Create Data Success", project));
    } catch (err: any) {
      res.status(400).json(Service.responseBuilder("error", err , []));
    }
  },

  async Update(req: express.Request, res: express.Response): Promise<void> {
    try{
      const { projectName, projectClientId, projectPic, projectContact, projectEditor } = req.body;
      const { id } = req.params;

      const data = {
        project_name: projectName,
        project_client_id: projectClientId,
        project_pic: projectPic,
        project_contact: projectContact,
        project_editor: projectEditor
      };
      const project = await Service.Updating(dbMaster, data, id);

      res.status(200).json(Service.responseBuilder("success", "Update data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindAll(req: express.Request, res: express.Response): Promise<void>{
    try{
      const project = await Service.FindingAll(dbMaster, dbClient);

      res.status(200).json(Service.responseBuilder("success", "Find all data success", project));
    }catch(err: any){
      console.log(err);
      
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async FindOne(req: express.Request, res: express.Response): Promise<void>{
    try{
      const { id } = req.params;

      const project = await Service.FindingOne(dbMaster, id, dbJoin);
      // const project = await Service.FindingOne(dbMaster, id, [dbClient, {model: dbJoin, include: [dbMethod]}]);

      res.status(200).json(Service.responseBuilder("success", "Find data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Search(req: express.Request, res: express.Response): Promise<void>{
    try{
      const title = req.query.title;

      const project = await Service.FindingCustom(dbMaster, {project_name: {[Op.iLike]: `%${title}%`}});
      res.status(200).json(Service.responseBuilder("success", "Find data success", project));
    }catch(err: any){
      res.status(400).json(Service.responseBuilder("error", err, []));
    }
  },

  async Filter(req: express.Request, res: express.Response): Promise<void>{
    try{
      const id = req.query.id;

      const project = await Service.FindingCustom(dbMaster, {project_client_id: id});
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
        const project = await Service.Deleting(dbMaster, id);
        res.status(400).json(Service.responseBuilder("error", "File does not exist", []));
      } else {
        const file: any = req.files.file;

        const unix = Math.random().toString(36).substring(2,200);

        Service.Uploading(file, `${id}_${unix}_${file.name}`);

        const updateFile = await Service.Updating(dbMaster, { project_filename: `${id}_${unix}_${file.name}` }, id);

        res.status(201).json(Service.responseBuilder("success", "upload success"));
      }

    }catch(err: any){
      const { id } = req.params;
      
      const project = await Service.Deleting(dbMaster, id);
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
