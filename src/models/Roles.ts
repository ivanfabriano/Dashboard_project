const RoleModel = (sequelize: any, Sequelize: any) => {
  const Roles = sequelize.define("Role", {
    role_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role field must be not empty",
        },
      },
    },
  });

  return Roles;
};

export default RoleModel;
