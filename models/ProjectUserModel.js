// const { sq } = require("../controllers/db");
// const { DataTypes } = require("sequelize");


module.exports = function (sequelize, DataTypes) {
    const ProjectUser = sequelize.define("projectuser", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        project_id: {
            type: DataTypes.INTEGER,
        }
    });

    ProjectUser.associate = function (models) {
        ProjectUser.belongsTo(models.project, {
            foreignKey: 'project_id',
            targetKey: 'id'
        });
        ProjectUser.belongsTo(models.user, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
    }

    return ProjectUser;
};
