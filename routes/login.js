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
    res.render('../views/login.ejs');
    //res.send(User.findOne());
});

router.post('/', async (req,res)=>
{
    const {usertype  ,loginid ,password}=req.body;
    const found=await User.find({loginid:loginid})
    if(found!=0)//i.e. atleast one matching record is found
    {
        const foundUser= await User.findOne({loginid:loginid});
        if(foundUser.password==password)
        {
            req.session.login_id = foundUser.loginid;
            req.session.usertype = foundUser.usertype;
            //res.send("hey wlcm user");
            res.redirect('/home');
        }
        else
        {
            req.flash("error","hey incorrect loginid or password. login again");
            res.redirect('/error');
        }
    }
    else{
        req.flash("error","hey incorrect loginid or password. login again");
        res.redirect('/error');
    }
    
})

module.exports=router;

