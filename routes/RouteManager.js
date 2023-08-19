var authRoute = require('./AuthRoute');
var projectsRoute = require('./ProjectsRoute');
var usersRoute = require('./UsersRoute');
var tasksRoute = require('./TasksRoute');


module.exports = function (app) {
    app.use('/login', authRoute);
    app.use('/api/projects', projectsRoute);
    app.use('/api/user', usersRoute);
    app.use('/api/project/task', tasksRoute);
};
