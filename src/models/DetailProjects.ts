const DetailProjectModel = (sequelize: any, Sequelize: any) => {
  const Details = sequelize.define("Detail", {
    detail_time: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Date field must be date format",
        },
      },
    },
    detail_location: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date field must be not empty",
        },
      },
    },
    detail_method: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Method field must be not empty",
        },
      },
    },
    detail_attendee: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date field must be not empty",
        },
      },
    },
    detail_activity: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Activity field must be not empty",
        },
      },
    },
    detail_progress: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Progress field must be not empty",
        },
      },
    },
    detail_next_action: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Next action field must be not empty",
        },
      },
    },
    detail_target: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Target must be not empty",
        },
      },
    },
    detail_project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Project parent must be not empty",
        },
      },
    },
  });

  return Details;
};

export default DetailProjectModel;
