const MeetingModel = (sequelize: any, Sequelize: any) => {
  const Meetings = sequelize.define("Meeting", {
    meeting_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Meeting method field must be not empty",
        },
      },
    },
  });

  return Meetings;
};

export default MeetingModel;
