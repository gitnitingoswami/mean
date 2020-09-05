const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const  path = require("path")
const postRoutes = require('./models/posts/posts');
const userRoutes = require('./models/posts/users')


const app = express();

mongoose.connect
("mongodb+srv://nitin:9b1AClgsdqIKsTuq@cluster0.ovnxb.mongodb.net/node-angular?retryWrites=true&w=majority",
{useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>
console.log('connected'))
.catch(()=>{
    console.log('faild');
});
mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/images',express.static(path.join(__dirname,'./images')));


//9b1AClgsdqIKsTuq

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Accept,Authorization,Content-Type,Origin,X-Request-With");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,OPTIONS,PATCH,PUT");
    next();

});
app.use('/api/backend',postRoutes);
app.use('/api/user',userRoutes);

module.exports = app;