// const MongoClient = require('mongodb').MongoClient;

// es 6 destructuring
const {MongoClient, ObjectId} = require('mongodb');

// var obj = new ObjectId();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err)  {
    return console.log('Unable to connect to MongoDB server : ' + err);
  }

  console.log('Connected to MongoDB server');

  db.collection('Todos').insertOne({
    text: 'Learn NodeJS',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo due to : ', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.collection('Users').insertOne({
    name: 'jayant',
    age: 29,
    location: 'san francisco'
  }, (err, result) => {
    if (err)  {
      return console.log('Unable to insert user due to : ', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});