var express = require('express');
var router = express.Router();

var ctrlTasks = require('../controllers/TasksController');


router.post('/', ctrlTasks.addTask);
router.delete('/:id', ctrlTasks.deleteTask);
router.put('/:id', ctrlTasks.editTask);
router.get('/', ctrlTasks.summaryList)


module.exports = router;

