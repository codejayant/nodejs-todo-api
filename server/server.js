require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');


const app = express();
const port = process.env.PORT;

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


app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {

    if (!todo)  {
      return res.status(404).send();
    }
    return res.send({todo});
  }).catch((e) => {
    return res.status(400).send();
  });

});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    console.log("not proper id");
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed)  {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo)  {
      console.log("no todo");
      res.status(400).send();
    }

    res.send({todo});
  }).catch((e) => {
    console.error("error in update : ", e);
    res.status(400).send();
  })

});

app.post('/users', (req, res)=> {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then((user) => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log('Started on port ', port);
});

module.exports = {app};