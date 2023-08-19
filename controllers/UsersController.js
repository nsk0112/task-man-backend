const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userList = async (req, res) => {
    try {
        let auth = jwt.verify(req.headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN_SECRET).is_admin;
        if(!auth){
            return res.status(401).json({error: 'Not authorized'});
        }
        
        const users = await db.user.findAll();
        res.json({ users });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to get users.",
        });
    }
};


const addNewUser = async (req, res) => {
    try {
        const { firstname, lastname, username, password, is_admin, email } = req.body;
        const safePass = await bcrypt.hash(password, 10);

        await db.user.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: safePass,
            is_admin: is_admin,
            email: email
        }).then(user => {
            res.json({
                message: "User created successfully."
            })
        })
    }

    catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.send({ status: 'error', message: 'Project already exists' });
        }

        else {
            res.send({
                message: err.message
            });
        }
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, username, password, is_admin, email } = req.body;

        await db.user.findOne({
            where: {
                id: id
            }
        }).then(user => {
            user.update({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                is_admin: is_admin,
                email: email
            })
        })
            .then(user => {
                res.status(200).json({ message: "User updated successfully." });
            })
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to update user.",
        });
    }
};

const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.user.destroy({
            where: {
                id: id
            }
        }).then(user => {
            res.json({ message: "User deleted successfully." });
        })
    }catch(err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to delete user",
        });
    }
}




module.exports = { userList, addNewUser, updateUser, userDelete };
