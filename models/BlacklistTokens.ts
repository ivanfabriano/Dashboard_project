const BlacklistModel = (sequelize: any, Sequelize: any) => {
  const Blacklists = sequelize.define("Blacklist", {
    token: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return Blacklists;
};

export default BlacklistModel;
