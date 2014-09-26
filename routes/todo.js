var Todo = require('../models/todo.js');

module.exports = function(app) {

  //find todos
  findAllTodos = function(req, res) {
    console.log("GET - /api/todos");
    return Todo.find(function(err, todos) {
      if(!err) {
        return res.send(todos);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //find todo by id

  findById = function(req, res) {

    console.log("GET - /api/todos:id");
    return Todo.findById(req.params.id, function(err, todo) {

      if(!todo) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', todo:todo });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //add todo
  addTodo = function(req, res) {

    console.log('POST - /api/todo');

    var todo = new Todo({
      text:    req.body.text
    });

    todo.save(function(err) {

      if(err) {

        console.log('Error while saving todo: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Todo created");
        return res.send({ status: 'OK', todo:todo });

      }

    });

    return Todo.find(function(err, todos) {
      if(!err) {
        return res.send(todos);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });

  };

  //delete by id

  deleteTodo = function(req, res) {

    console.log("DELETE - /api/todo/:id");


    return Todo.findById(req.params.id, function(err, todo) {
      if(!todo) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return todo.remove(function(err) {
        if(!err) {
          console.log('Removed todo');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }


  //Link routes and actions
  app.get('/api/todos', findAllTodos);
  app.get('/api/todos/:id', findById);
  app.post('/api/todos', addTodo);
  app.delete('/api/todos/:id', deleteTodo);
}