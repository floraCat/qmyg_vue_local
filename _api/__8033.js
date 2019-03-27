var fs= require("fs");
var path = require('path');
var express = require('express');
var app = express();

app.set('port',8033);

app.get('/', function(req, res) {
   res.send('Hello World');
});


app.use(express.static(path.join(__dirname,'./')));
app.listen(app.get('port'));


