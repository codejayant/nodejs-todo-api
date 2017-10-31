const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const id = '59f7f82b2381e07b279c00e0';

if (!ObjectID.isValid(id))  {
  return console.log('ID is not valid');
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   // return array of records (documents)
//   console.log('Todos : ', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   // return result object
//   console.log('Todo one : ', todo);
// });

// Todo.findById(id).then((todo) => {
//   // return result object
//   if (!todo)  {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id : ', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
  if (!user)  {
    return console.log('User not found');
  }

  console.log('User by ID : ', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));