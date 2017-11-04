const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findAndRemove({_id: '59fe25607871cd42b4830483'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('59fe25607871cd42b4830483').then((todo) => {
  console.log(todo);
});
