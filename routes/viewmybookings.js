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
const Booking = require('../models/bookingdetails');
//const bookingdetails = require('../models/bookingdetails');
app.set('view engine','ejs');
//for ejs files
app.set('views',path.join(__dirname,'/views'));
app.set('views',path.join(__dirname,'/models'));

router.get('/',async(req,res)=>{
    if(!req.session.login_id)
    {
      req.flash('error',"you are not currently logged into your account .kindly login to continue");
      res.redirect('/error');
    }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    {
        today=new Date();
        const s= await Booking.find({bookerloginid: user.loginid,dateofbooking:{$gte:today}});
        res.render('../views/viewmybookings.ejs',{s});
    }
    })
router.post('/',async(req,res)=>{
    if(!req.session.login_id)
    {
      req.flash('error',"you are not currently logged into your account .kindly login to continue");
      res.redirect('/error');
    }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    console.log("req body is ",req.body);
    const {id}=req.body;
    const del= await Booking.find({_id:id});
    if(del==0)
    res.send("no such booking exist");
    else 
    {const dele=await Booking.deleteOne({_id:id});
    
    //console.log(s);
    // else 
    //     console.log("nothing found");
    //console.log(Booking.find({}));
    // req.session.capacity = capacity;
    // req.session.society=society;
    if(dele)
    req.flash("success","booking cancelled successfully");
    res.redirect('/home');}
})
module.exports=router;