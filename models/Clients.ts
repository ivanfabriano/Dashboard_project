const ClientModel = (sequelize: any, Sequelize: any) => {
  const Clients = sequelize.define("Client", {
    client_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Client field must be not empty",
        },
      },
    },
  });
  return Clients;
};

export default ClientModel;
