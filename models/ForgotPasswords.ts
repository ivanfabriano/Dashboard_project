const ForgotModel = (sequelize: any, Sequelize: any) => {
    const ForgotPasswords = sequelize.define("ForgotPassword", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unix_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return ForgotPasswords;
}

export default ForgotModel;