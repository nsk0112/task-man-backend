// const { sq } = require("../controllers/db");
// const { DataTypes } = require("sequelize");

// create schema
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("user", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true
        }
    });

    User.associate = function(models) {
        User.hasMany(models.task, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
        User.hasMany(models.projectuser, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        })
    }

    return User;
};
