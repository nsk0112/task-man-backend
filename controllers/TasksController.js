const db = require('../models');


const addTask = async (req, res) => {
    try {
        const { id, title, description, start_date, finish_date, status, user_id, project_id } = req.body;

        await db.task.create({
            id: id,
            title: title,
            description: description,
            start_date: start_date,
            finish_date: finish_date,
            status: status,
            user_id: user_id,
            project_id: project_id
        }).then(task => {
            res.json({
                message: "Task created successfully."
            })
        })


    } catch (err) {
        if (err.name == "SequelizeForeignKeyConstraintError") {
            res.status(500).json({
                error: err.message,
                message: "User or Project ID could not be found.",
            });
        }
        else if (err.name == "SequelizeDatabaseError") {
            res.status(500).json({
                error: err.message,
                message: "Status is not valid.",
            });
        }
        else {
            res.status(500).json({
                error: err.message,
                message: "Failed to add task",
            });
        }
    };
};


const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await db.task.destroy({
            where: {
                id: id
            }
        }).then(task => {
            res.json({ message: "Task deleted successfully." });
        })
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to delete tas"
        });
    }
};


const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, start_date, finish_date, user_id, project_id } = req.body;

        await db.task.findOne({
            where: {
                id: id
            }
        }).then(task => {
            task.update({
                title: title,
                description: description,
                start_date: start_date,
                finish_date: finish_date,
                user_id: user_id,
                project_id: project_id
            })
        }).then(task => {
            res.status(200).json({ message: "Task updated successfully." });
        })
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Failed to update task.",
        });
    }
};


const summaryList = async (req, res) => {
    const tasks = await db.task.findAll();
    res.json({ tasks });

};



module.exports = { addTask, deleteTask, editTask, summaryList };



