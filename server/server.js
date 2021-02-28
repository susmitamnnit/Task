const express= require("express");
const app=express();
const http= require('http').Server(app);
const path = require("path");
var bodyParser = require("body-parser");
const jwt = require('./_helper/jwt');
const db = require('./_helper/db');
const errorHandler = require('./_helper/error-handler');
require('events').EventEmitter.defaultMaxListeners = Infinity; 



const userService = require('./users/users.service');

var fs = require('fs');

var jimp = require('jimp');
var multer = require('multer');
var upload = multer({ dest: "/data/upload" })

var cors =require("cors");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
app.use(errorHandler);  


app.use('/users', require('./users/users.controller'));

app.get('/',(req,res)=>{
    res.send("hello world !!!");
})

app.post('/profile/:id', upload.single("uploadPic"), async function (req, res, next) {
    var object = {};
    var imageSrc;
    console.log("Logs started")
    console.log(req.file.filename)
  
    await jimp.read("/data/upload/" + req.file.filename, function (err, data) {
        if (data === null || data === undefined) {
            return res.json(err);
        } else {
            data.resize(100, 100)
                .quality(60)
                .getBase64Async(jimp.MIME_JPEG).then(test => {
                    console.log('test ' + test)
                    test = test.replace('data:image/jpeg;base64,', '');
                    console.log("logs");
                    imageSrc = test;
                    console.log(req.params.id)
                    object["profilePic"] = req.file.filename;
                    object["imageSrc"] = imageSrc;
                    userService.update(req.params.id, object).then(user => {
                        console.log("new user " + user);
                        res.json(user);
                    });
                })
        }
  
    })
        .catch(err => {
            console.log(err);
        })
  });

  const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

const server=http.listen(port,()=>{
    console.log(" Server started listing on port", +port);
})