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
        req.flash('error','you are not currently logged into your account');
        res.redirect('/error');
    }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    if(!req.session.purpose)
    {
        req.flash('error',"some error occured. please book the room again");
        res.redirect('/error');
    }
    else{
        purpose=req.session.purpose;
        capacity=req.session.capacity;
        society=req.session.society;
        date=req.session.date;
        time=req.session.time;
        res.render('../views/bookblockno.ejs',{user , society, purpose, capacity});
    }
})
router.post('/',async(req,res)=>{
    //check if the person is not logged in
    if(!req.session.login_id)
    {
        req.flash('error','you are not currently logged into your account');
        res.redirect('/error');
    }
    //find user details 
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    console.log("req body is ",req.body);
    const {blockno}=req.body;
    req.session.blockno = blockno;
    res.redirect('/bookspecificroom');
})

module.exports=router;