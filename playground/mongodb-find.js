const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err)  {
    return console.log('Unable to connect to MongoDB server : ' + err);
  }

  console.log('Connected to MongoDB server');

  // All record
  db.collection('Todos').find().toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos due to : ', err);
  });

  // filter get record based on filter value mention in find argument
  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos due to : ', err);
  });

  // filter get record based on id
  db.collection('Todos').find({
    _id: new ObjectId('59e9c3559e53fae282d1fdfd')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos due to : ', err);
  });

  // get count of records
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count : ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos due to : ', err);
  });

  // get count of records with filter
  db.collection('Users').find({name: 'jayant'}).count().then((count) => {
    console.log(`Todos count : ${count}`);
  }, (err) => {
    console.log('Unable to fetch users due to : ', err);
  });

  db.close();
});