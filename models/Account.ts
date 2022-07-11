import bcrypt from "bcrypt";

const AccountModel = (sequelize: any, Sequelize: any) => {
  const Accounts = sequelize.define("Account", {
    account_username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [6, 12],
          msg: "Username must more than 6 and less then 12 character",
        },
      },
    },
    account_email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email must be validate as a email format",
        },
      },
    },
    account_password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          msg: "Password must be alphanumeric",
        },
        len: {
          args: [8, 12],
          msg: "Password must has 8-12 length charactes",
        },
      },
    },
    account_contact: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Contact must be a number",
        },
      },
    },
    account_role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role field must be not empty",
        },
      },
    },
  }, {
    hooks: {
      beforeCreate: async (Account: any) => {
       if (Account.account_password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        Account.account_password = bcrypt.hashSync(Account.account_password, salt);
       }
      },
      beforeUpdate:async (Account: any) => {
       if (Account.account_password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        Account.account_password = bcrypt.hashSync(Account.account_password, salt);
       }
      }
     },
  });

  return Accounts;
};

export default AccountModel;
