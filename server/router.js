'use strict';

var index = require('./controller/index');
var users = require('./controller/users');

module.exports = app => {
	app.use('/', index);
	app.use('/users', users);
}