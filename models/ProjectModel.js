// const { sq } = require("../controllers/db");
// const { DataTypes } = require("sequelize");

// create schema
module.exports = function (sequelize, DataTypes) {
    const Project = sequelize.define("project", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        }
    });

    Project.associate = function(models) {
        Project.hasMany(models.task, {
            foreignKey: 'project_id',
            sourceKey: 'id'
        });
        Project.hasMany(models.projectuser, {
            foreignKey: 'project_id',
            sourceKey: 'id'
        });
    }

    return Project;
};
