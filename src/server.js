var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = require("./router");
const cors = require('cors');
app.use(express.static('public'));
app.use(express.static(__dirname + '/uploads'));
app.use(cors());
mongoose.connect("mongodb://localhost:27017/form",{useNewUrlParser:true});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);
app.listen(4444,()=>{
    console.log("Server Running!");
})