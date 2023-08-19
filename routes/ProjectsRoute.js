var express = require('express');
var router = express.Router();


var ctrlProjects = require('../controllers/ProjectsController');

router.get('/', ctrlProjects.projectList);
router.post('/', ctrlProjects.addNewProject);
router.delete('/:id', ctrlProjects.projectDelete);
router.put('/:id', ctrlProjects.projectUpdate);
router.post('/:id', ctrlProjects.projectUserAdd);
router.get('/user/:id', ctrlProjects.projectUserFilter);



module.exports = router;
