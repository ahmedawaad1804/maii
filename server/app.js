const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var db = require('diskdb');
db.connect('.', ['articles']);
  
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
 

  var mes = { name: req.body.name ,message: req.body.message}
db.articles.save(mes);
   console.log("data saved");
   
 
  res.send('hello !!')

});
app.get('/mess', function (req, res) {
  
  
   
  var x=db.articles.find();
  console.log(x);
  
    res.send(x)

  

});


app.listen(4000, function () {
    console.log(' API Server listening on port 4000!')
});

