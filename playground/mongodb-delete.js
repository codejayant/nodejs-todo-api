const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err)  {
    return console.log('Unable to connect to MongoDB server : ' + err);
  }

  console.log('Connected to MongoDB server');

  //deleteMany
  db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    console.log(result);
  });

  //deleteOne
  db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    console.log(result);
  });

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

  db.collection('Users').deleteMany({name: 'del'}).then((result) => {
    console.log(result);
  });


  db.collection('Users').findOneAndDelete({_id: new ObjectId('59eabdddbe68650addde7c1d')}).then((result) => {
    console.log(result);
  });

  db.close();
});