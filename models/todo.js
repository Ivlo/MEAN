var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Todo = new Schema({

  text:    {
    type    : String,
    require : true
  }
});

module.exports = mongoose.model('Todo', Todo);