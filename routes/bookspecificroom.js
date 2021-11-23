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
    if(!req.session.date)
    {
        req.flash('error','some error occured while filling the form. kindly fill it again');
        res.redirect('/error');

    }
    else{
        const t= req.session.time;
        const allroomsblock = await Room.find({blockno: req.session.blockno});
        //console.log(allroomsblock);
        const foundall=new Array();
        for(i =0;i< allroomsblock.length;i++)
        {
            console.log(allroomsblock[i].roomno);
            if(t=="ninetotwelve")
                found= await Booking.find({blockno:allroomsblock[i].blockno , roomno: allroomsblock[i].roomno ,dateofbooking: req.session.date,ninetotwelve:true });            
            else if(t=="twelvetothree")
                found= await Booking.find({blockno:allroomsblock[i].blockno , roomno: allroomsblock[i].roomno ,dateofbooking: req.session.date,twelvetothree:true });
                //s= await Booking.insertMany([{roomno: roomno , blockno: req.session.blockno, capacity:req.session.capacity,bookername:user.name ,bookercontactno: user.contactno , bookerteacherid: user.teacherid , bookerloginid: user.loginid,bookerusertype: user.usertype,dateofbooking: req.session.date, twelvetothree: true}]);
            else if (t=="threetosix")
                found= await Booking.find({blockno:allroomsblock[i].blockno , roomno: allroomsblock[i].roomno ,dateofbooking: req.session.date,threetosix:true });
                //s= await Booking.insertMany([{roomno: roomno , blockno: req.session.blockno, capacity:req.session.capacity,bookername:user.name ,bookercontactno: user.contactno , bookerteacherid: user.teacherid , bookerloginid: user.loginid,bookerusertype: user.usertype,dateofbooking: req.session.date, threetosix: true}]);
            else if(t=="sixtoeight")
                found= await Booking.find({blockno:allroomsblock[i].blockno , roomno: allroomsblock[i].roomno ,dateofbooking: req.session.date,sixtoeight:true });
                //s= await Booking.insertMany([{roomno: roomno , blockno: req.session.blockno, capacity:req.session.capacity,bookername:user.name ,bookercontactno: user.contactno , bookerteacherid: user.teacherid , bookerloginid: user.loginid,bookerusertype: user.usertype,dateofbooking: req.session.date, sixtoeight: true}]);
            
            //const found= await Booking.find({blockno:allroomsblock[i].blockno , roomno: allroomsblock[i].roomno ,dateofbooking: req.session.date,t:true });
            if(found==0)
            {
                //i.e. this room is not booked for that date and time
                foundall.push(allroomsblock[i]);
            }
        }
        console.log("the rooms with no booking are");
        console.log(foundall);
        for(i=0;i<foundall.length;i++)
        {
            console.log(foundall[i].roomno);
        }
        //const found=await Booking.find({blockno: req.session.blockno , dateofbooking: req.session.date , t: true ,capacity :{$gte : req.session.capacity}});
        //i.e. find if the room already has booking at that time
        // if(found==0)//i.e, atleast one room has same blockno
        // {
        //     console.log("working");
        //     console.log(found);
            
            
        // }
        res.render('../views/bookspecificroom.ejs',{user , foundall});
    }
    //User.remove({usertype:'faculty'}).then (msg=>console.log(msg));
    //res.render('../views/home.ejs',{user,messages: req.flash('success')});
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
    const {roomno}=req.body;
    req.session.roomno = roomno;
    console.log(req.session);
    const room = await Room.findOne({roomno: roomno , blockno: req.session.blockno});
    console.log(room);
    t=req.session.time;
    console.log(t);
    if(t=="ninetotwelve")
        s= await Booking.insertMany([{roomno: roomno , blockno: req.session.blockno, capacity:req.session.capacity,bookername:user.name ,bookercontactno: user.contactno , bookerteacherid: user.teacherid , bookerloginid: user.loginid,bookerusertype: user.usertype,dateofbooking: req.session.date, ninetotwelve: true}]);
    else if(t=="twelvetothree")
        s= await Booking.insertMany([{roomno: roomno , blockno: req.session.blockno, capacity:req.session.capacity,bookername:user.name ,bookercontactno: user.contactno , bookerteacherid: user.teacherid , bookerloginid: user.loginid,bookerusertype: user.usertype,dateofbooking: req.session.date, twelvetothree: true}]);
    else if (t=="threetosix")
        s= await Booking.insertMany([{roomno: roomno , blockno: req.session.blockno, capacity:req.session.capacity,bookername:user.name ,bookercontactno: user.contactno , bookerteacherid: user.teacherid , bookerloginid: user.loginid,bookerusertype: user.usertype,dateofbooking: req.session.date, threetosix: true}]);
    else if(t=="sixtoeight")
        s= await Booking.insertMany([{roomno: roomno , blockno: req.session.blockno, capacity:req.session.capacity,bookername:user.name ,bookercontactno: user.contactno , bookerteacherid: user.teacherid , bookerloginid: user.loginid,bookerusertype: user.usertype,dateofbooking: req.session.date, sixtoeight: true}]);
    console.log("booking successfull");
    console.log(s);
    console.log(Booking.find({}));
    // req.session.capacity = capacity;
    // req.session.society=society;
    req.flash("success","room booked successfully");
    res.redirect('/home');
})
module.exports=router;