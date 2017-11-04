const mongoose = require('mongoose');
// const promise = require('bluebird');

// mongoose.Promise = promise;
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useMongoClient: true });

module.exports = { mongoose };