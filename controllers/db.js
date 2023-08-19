const express = require('express');
const Sequelize = require('sequelize');
const models = require('../models');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize("postgres://postgres:anka_vision@localhost:5481/task_management_db");


const testdb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
};


sequelize.sync()
    .then(async () => {
        let hashedPassword = await bcrypt.hash("admin123", 10);
        console.log("Synced db.");

        await db.user.findOne({
            where: {
                username: "admin",
            }
        }).then(async user => {
            if (user == null) {
                db.user.create({
                    username: "admin",
                    password: hashedPassword,
                    is_admin: true
                })
            }
        })
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

module.exports = { sequelize, testdb }
