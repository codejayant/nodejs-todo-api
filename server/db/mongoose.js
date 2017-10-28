var mongoose = require('mongoose');
// var promise = require('bluebird');

// mongoose.Promise = promise;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });

module.exports = { mongoose };