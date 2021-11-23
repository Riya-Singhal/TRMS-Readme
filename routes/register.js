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

router.get('/',(req,res)=>
{
    if(!req.session.login_id){
        req.flash('error',"you are not currently logged into your account .kindly login to continue");
        res.redirect('/error');
      }
    res.render('../views/register.ejs',{messages: req.flash('input error')});
    //res.send(User.findOne());
});

router.post('/',riya=async(req,res)=>
{
    if(!req.session.login_id){
        req.flash('error',"you are not currently logged into your account .kindly login to continue");
        res.redirect('/error');
      }
    console.log("req body is ",req.body);
    const {usertype  ,loginid ,password,name,teacherid,contact}=req.body;
    try{
        const user =new User({ usertype:usertype,loginid:loginid,password:password,name:name,teacherid:teacherid,contactno:contact});
        console.log("value of usertype is ",usertype)
        const x=  await  user.save();
        console.log(req.session);
        req.session.login_id= user.loginid;
        req.session.usertype = user.usertype;
        console.log(req.session);
        req.flash('success','welcome to the newly created account');
        res.redirect('/home');
    }
    catch(e){
        req.flash("input error","hey the input is already occupied by an exissting user. kindly register again");
        res.redirect('/register');
    }
    
}
)


module.exports=router;
