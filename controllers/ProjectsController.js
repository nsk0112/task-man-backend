const db = require('../models');

const projectList = async (req, res) => {
    try {
        const projects = await db.project.findAll();
        res.json({ projects });

    }
    catch (err) {
        res.send({ message: err.message });
    }
};

const addNewProject = async (req, res) => {
    try {
        const { id, title, description } = req.body;

        await db.project.create({
            id: id,
            title: title,
            description: description,
        }).then((project) => {
            res.send({ message: "Project saved successfully" })
        })

    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.send({ status: 'error', message: 'Project already exists' });
        }

        else {
            res.send({
                message: err.message
            })
        }
    }
};

const projectDelete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.project.destroy({
            where: {
                id: id
            },
            // force: true
        }).then(project => {
            res.send({ message: "Project deleted successfully." });
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to delete project",
        });
    }
};

const projectUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await db.project.findOne({
            where: {
                id: id
            }
        }).then(project => {
            project.update({
                id: id,
                title: title,
                description: description
            })

        }).then(project => {
            res.status(200).json({ message: "Project updated successfully." });
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to delete project",
        });
    }
};


const projectUserAdd = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        await db.projectuser.create({
            user_id: user_id,
            project_id: id

        }).then((projectuser) => {
            res.json({ message: "User successfully added to project." });
        })

    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to add user to project.",
        });
    }
};


const projectUserFilter = async (req, res) => {
    try {
        const { id } = req.params;

        const usersProjects = await db.projectuser.findAll({
            where: {
                user_id: id
            }
        }).then((usersProjects) => {
            res.send({ 
                message: "User successfully added to project.",
                output: usersProjects
            });
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message,
            message: "Failed to add user to project.",
        });
    }
}


module.exports = { projectList, addNewProject, projectDelete, projectUpdate, projectUserAdd, projectUserFilter };
