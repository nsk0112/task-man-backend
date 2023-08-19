const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
require("dotenv").config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



const sequelize = new Sequelize("postgres://postgres:anka_vision@localhost:5481/task_management_db");


const testdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};


const db = require('./models');


// db.sequelize.sync()
//     .then(async () => {
//         let hashedPassword = await bcrypt.hash("admin123", 10);
//         console.log("Synced db.");

//         await db.user.findOne({
//             where: {
//                 username: "admin",
//             }
//         }).then(async user => {
//             if (user == null) {
//                 db.user.create({
//                     username: "admin",
//                     password: hashedPassword,
//                     is_admin: true
//                 })
//             }
//         })
//     })
//     .catch((err) => {
//         console.log("Failed to sync db: " + err.message);
//     });

db.sequelize.sync({ alter: true })
  .then(async () => {
    let hashedPassword = await bcrypt.hash("admin123", 10);
    ("Synced db.");

    const usersCount = await db.user.count()
    if (usersCount === 0) {
      db.user.create({
        username: "admin",
        password: hashedPassword,
        is_admin: true
      })
    } else {
      return
    }
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


require('./routes/RouteManager')(app);





const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
});
