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
    //if nothing is stored in sessions then login to account
    if(!req.session.login_id)
    {
        req.flash('error',"you are not currently logged into your account .kindly login to continue");
        res.redirect('/error');
    }

    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    if(user.usertype!='admin')
    {
        {
            req.flash('error',"you are not currently logged in as admin and have no admin previledges.kindly login again as admin to continue");
            res.redirect('/error');
          }
    }
    //User.remove({usertype:'faculty'}).then (msg=>console.log(msg));
    res.render('../views/createroom.ejs',{user,messages: req.flash('creationofroomsuccess')});
})

router.post('/',async(req,res)=>{
  if(!req.session.login_id)
  {
    req.flash('error',"you are not currently logged into your account .kindly login to continue");
    res.redirect('/error');
  }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    if(user.usertype!='admin')
    {
        {
            req.flash('error',"you are not currently logged in as admin and have no admin previledges.kindly login again as admin to continue");
            res.redirect('/error');
          }
    }
    console.log("req body is ",req.body);
    const {roomno,blockno,capacity}=req.body;
    const room=new Room({blockno:blockno,roomno:roomno,capacity:capacity});
    //const room=new Room({id:{blockno:blockno , roomno:roomno},capacity:capacity});
    console.log(room);
    console.log(Room.find({}).then(data=>console.log(data)));
    await room.save();
    req.flash('creationofroomsuccess','successfully added new room');
    res.redirect('/createroom');
    console.log(Room.find({}).then(data=>console.log(data.id)));
    //res.render('../views/createroom.ejs',{roomno,blockno,capacity,user});
})

module.exports=router;