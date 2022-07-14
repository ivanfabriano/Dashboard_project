const ProjectModel = (sequelize: any, Sequelize: any) => {
  const Projects = sequelize.define("Project", {
    project_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Project name field must be not empty",
        },
      },
    },
    project_client_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Project client field must be not empty",
        },
      },
    },
    project_pic: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Project PIC field must be not empty",
        },
      },
    },
    project_contact: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Project contact field must be not empty",
        },
        isNumeric: {
          msg: "Project contact must be a number",
        },
      },
    },
    project_filename: {
      type: Sequelize.STRING,
    }
  });

  return Projects;
};

export default ProjectModel;
