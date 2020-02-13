const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1', {useNewUrlParser: true});


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



  var fluffy = new Kitten({ name: 'fluffy' ,message: 'goto hell'});


  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
   console.log("data saved");
   
  });
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200"); //<-- you can change this with a specific url like http://localhost:4200
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
//   });

app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('hello !!')
});
app.post('/log', function (req, res) {
    res.send('hello !!')
});
app.post('/api/auth', function(req, res) {
    const body = req.body;

    const user = USERS.find(user => user.username == body.username);
    if(!user || body.password != user.password ) return res.sendStatus(401);
    
    var token = jwt.sign({userID: user.id}, 'app-super-shared-secret', {expiresIn: '2h'});
    res.send({token});
});


app.listen(4000, function () {
    console.log(' API Server listening on port 4000!')
});
app.get('/new', function (req, res) {
    console.log(req.query.noti);
    arr.push({noti:req.query.noti,read:true,status:'high',position:{long:14,lat:8},date:Date.now()})
    io.emit('new-notification', arr);
    console.log(arr);
     res.send('notification recieved')
    
});
app.get('/allread', function (req, res) {
    
    arr.forEach(element => {
        element.read=false
    });
    
    
     res.send('notification zeroed')
    
});