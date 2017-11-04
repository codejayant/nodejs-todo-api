const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');


const app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  let todo = new Todo({
    text: request.body.text
  });

  todo.save().then((doc) => {
    response.send(doc);
  }, (err) => {
    response.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/12345
app.get('/todos/:id', (req, res) => {
  // to extract the parameter
  // res.send(req.params);

  let id = req.params.id;

  if (!ObjectID.isValid(id))  {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {

    if (!todo)  {
      return res.status(404).send();
    }
    return res.send({todo});

  }).catch((e) => {
    return res.status(400).send();
  });

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};