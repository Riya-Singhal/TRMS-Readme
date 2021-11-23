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
        
        res.render('../views/viewallbookings.ejs');
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
    const {blockno,roomno,date,time}=req.body;
    // arr=[blockno,roomno,date,time];
    // console.log(arr);
    //req.session.roomno = roomno;
    //console.log(req.session);
    // const room = await Room.findOne({roomno: roomno , blockno: req.session.blockno});
    // console.log(room);
    //t=req.session.time;
    //console.log(t);
    //s=await Booking.find({roomno:roomno,blockno:blockno , dateofbooking:date, time:true});
    //console.log(s);
    if(time=="ninetotwelve"){
        s=await Booking.find({roomno:roomno,blockno:blockno , dateofbooking:date, ninetotwelve:true});
        if(s!=0)
            console.log(s);
        else
            console.log("nothing found");
            res.render('../views/showallbookings.ejs',{s});
    }
    else if(time=="twelvetothree"){
        s=await Booking.find({roomno:roomno,blockno:blockno , dateofbooking:date, twelvetothree:true});
        if(s!=0)
            console.log(s);
        else
            console.log("nothing found");
            res.render('../views/showallbookings.ejs',{s});
    }
    else if (time=="threetosix"){
        s=await Booking.find({roomno:roomno,blockno:blockno , dateofbooking:date, threetosix:true});
        if(s!=0)
            console.log(s);
        else
            console.log("nothing found");
            res.render('../views/showallbookings.ejs',{s});
    }
    else if(time=="sixtoeight"){
        s=await Booking.find({roomno:roomno,blockno:blockno , dateofbooking:date, sixtoeight:true});//console.log("booking successfull");
        if(s!=0)
            console.log(s);
        else 
            console.log("nothing found");
            res.render('../views/showallbookings.ejs',{s});
    }
    else 
    console.log("error");
    for(i=0;i<s.length;i++)
        {
            console.log(s[i].roomno);
        }
})
module.exports=router;