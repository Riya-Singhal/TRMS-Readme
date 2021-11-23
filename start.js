//express , mongoose , ejs are the dependencies
const express=require("express");
const session = require('express-session');
const flash=require('connect-flash');
const path=require('path');
const mongoose=require('mongoose');

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({ secret: 'notagoodsecret',resave:false , saveUninitialized:false }))
app.use(flash());
//for ejs files 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.set('views',path.join(__dirname,'/models'));
//for routes folder
//app.use(express.urlencoded({extended:true}));
const loginroute=require('./routes/login.js');
const registerroute=require('./routes/register');
const logoutroute=require('./routes/logout');
const homeroute=require('./routes/home.js');
const bookformroute=require('./routes/bookform.js');
const createroomroute=require('./routes/createroom');
const errorroute=require('./routes/error');
const bookblocknoroute=require('./routes/bookblockno');
const bookspecificroomroute=require('./routes/bookspecificroom');
const deleteaccountroute=require('./routes/deleteaccount');
const viewallbookingsroute=require('./routes/viewallbookings');
const viewmybookingsroute=require('./routes/viewmybookings');
//connect to database
mongoose.connect("mongodb://localhost:27017/TRMS", {
  useNewUrlParser: "true",
  useUnifiedTopology: true,
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

const User = require('./models/user.js');// using model folder file user.js

app.use('/login',loginroute);
app.use('/register',registerroute);
app.use('/logout',logoutroute);
app.use('/home',homeroute);
app.use('/bookform',bookformroute);
app.use('/createroom',createroomroute);
app.use('/error',errorroute);
app.use('/bookblockno',bookblocknoroute);
app.use('/bookspecificroom',bookspecificroomroute);
app.use('/deleteaccount',deleteaccountroute);
app.use('/viewallbookings',viewallbookingsroute);
app.use('/viewmybookings',viewmybookingsroute);
app.use(
    (req,res)=>
    {
        res.send('<h1>"heyy this is TRMS project. you reached a wrong link"</h1><form action="/login" method="GET"> <button>LOGIN PAGE</button> </form>');
    }
    );
app.listen(3000,()=>{console.log("listening on port 3000 by nodemon");});
//console.log(User.findOne())