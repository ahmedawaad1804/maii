const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test5', {useNewUrlParser: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we are connected");
  
});
var kittySchema = new mongoose.Schema({
    name: String,
    message:String
  });
 
  
  var Kitten = mongoose.model('Kitten', kittySchema);



  
  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //<-- you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.post('/log', function (req, res) {
  console.log(req.body);
  var fluffy = new Kitten({ name: req.body.name ,message: req.body.message});


  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
   console.log("data saved");
   
  });
  res.send('hello !!')

});
app.post('/auth', function (req, res) {
    
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    res.send(kittens)

  })
    
});


app.listen(4000, function () {
    console.log(' API Server listening on port 4000!')
});

