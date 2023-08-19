var express = require('express');
var router = express.Router();
const auth = require('../authenticate');


var ctrlUsers = require('../controllers/UsersController');

router.get('/', auth, ctrlUsers.userList);
router.post('/', ctrlUsers.addNewUser);
router.put('/:id', ctrlUsers.updateUser);
router.delete('/:id', ctrlUsers.userDelete);


module.exports = router;
