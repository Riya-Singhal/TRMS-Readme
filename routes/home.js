const express=require('express')
const session = require('express-session');
const app=express();
const flash=require('connect-flash');
const router=express.Router();
const path=require('path');
app.use(express.urlencoded({extended:true}));
app.use(flash());
app.use(session({ secret: 'notagoodsecret',resave:false , saveUninitialized:false }))


const User = require('../models/user');// using model folder file user.js
app.set('view engine','ejs');
//for ejs files
app.set('views',path.join(__dirname,'/views'));
app.set('views',path.join(__dirname,'/models'));

router.get('/',async(req,res)=>{
    //if nothing is stored in sessions then login to account
    if(!req.session.login_id){
      req.flash('error',"you are not currently logged into your account .kindly login to continue");
      res.redirect('/error');
    }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    //User.remove({usertype:'faculty'}).then (msg=>console.log(msg));
    res.render('../views/home.ejs',{user,messages: req.flash('success')});
  })
  
  module.exports=router;