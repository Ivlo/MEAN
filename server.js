// Dependencies requirements, Express 4
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require("mongoose");
var app            = express();

app.use(express.static(__dirname + '/public'));   // set the static files location
app.use(morgan('dev'));           // log every request to the console
app.use(bodyParser());            // pull information from html in POST
app.use(methodOverride());          // simulate DELETE and PUT


//Add the routes
routes = require('./routes/todo')(app);


// MongoDB configuration
mongoose.connect('mongodb://localhost/todo', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});



app.listen(3000);
console.log('Magic happens on port 3000');      // shoutout to the user


// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {           
    res.sendfile('./public/index.html');        
});
