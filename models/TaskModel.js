// const { sq } = require("../controllers/db");
// const { DataTypes } = require("sequelize");

// const { Sequelize } = require(".");
// const Project = require('./ProjectModel');
// const User = require('./UserModel');
// const models = require('../models');


module.exports = function (sequelize, DataTypes) {
    const Task = sequelize.define("task", {
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
        },
        start_date: {
            type: DataTypes.DATE,
        },
        finish_date: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM,
            values: ['todo', 'inprogress', 'done'],
            defaultValue: "todo",
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: 'id'
            }
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "projects",
                key: 'id'
            }
        }
    });


    Task.associate = function (models) {
        Task.belongsTo(models.project, {
            foreignKey: 'project_id',
            targetKey: 'id'
        });

        Task.belongsTo(models.user, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
    };

    return Task;
};
