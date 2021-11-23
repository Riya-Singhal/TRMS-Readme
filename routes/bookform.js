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
const Room=require('../models/rooms');
app.set('view engine','ejs');
//for ejs files
app.set('views',path.join(__dirname,'/views'));
app.set('views',path.join(__dirname,'/models'));

router.get('/',async(req,res)=>{
    if(!req.session.login_id)
    {
      req.flash('error',"You are not currently logged into your account .Kindly login");
      res.redirect('/error');
    }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    //User.remove({usertype:'faculty'}).then (msg=>console.log(msg));
    //res.render('../views/home.ejs',{user,messages: req.flash('success')});
    res.render('../views/bookform.ejs',{user});
})
router.post('/',async(req,res)=>{
    if(!req.session.login_id)
    {
      req.flash('error',"You are not currently logged into your account .Kindly login ");
      res.redirect('/error');
    }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    console.log("req body is ",req.body);
    const {purpose  ,capacity ,society,date,time}=req.body;
    today= new Date();
    var datei = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(today);
    console.log(date);
    if(date < datei)
    {
      console.log("yes");
      res.render('../views/errorbooking.ejs');
      
    }
    req.session.purpose = purpose;
    req.session.capacity = capacity;
    req.session.society=society;
    req.session.date=date;
    req.session.time=time;
    res.redirect('/bookblockno');
    // try{
    //     const user =new Room({ usertype:usertype,loginid:loginid,password:password,name:name,teacherid:teacherid,contactno:contact});
    //     console.log("value of usertype is ",usertype)
    //     const x=  await  user.save();
    //     console.log(req.session);
    //     req.session.login_id= user.loginid;
    //     req.session.usertype = user.usertype;
    //     console.log(req.session);
    //     req.flash('success','welcome to the newly created account');
    //     res.redirect('/home');
    // }
    // catch(e){
    //     req.flash("input error","hey the input is already occupied by an exissting user. kindly register again");
    //     res.redirect('/register');
    // }
})
module.exports=router;