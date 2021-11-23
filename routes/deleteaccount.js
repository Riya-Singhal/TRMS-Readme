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

router.get('/',async(req,res)=>
{
    if(!req.session.login_id)
    {
      req.flash('error',"you are not currently logged into your account .kindly login to continue");
      res.redirect('/error');
    }
    const user=await User.findOne({loginid: req.session.login_id});
    console.log(user);
    const all = await User.find({});
    console.log(all);
    res.render('../views/deleteaccount.ejs',{all});
    //res.send(User.findOne());
});

router.post('/',riya=async(req,res)=>
{
    console.log("req body is ",req.body);
    const {account}=req.body;
    try{
        const user =await User.deleteOne({loginid: account});
        console.log(user);
        req.flash('success','account deleted successfully');
        res.redirect('/home');
    }
    catch(e){
        req.flash("success","hey some error occured . please try again");
        res.redirect('/home');
    }
    
}
)


module.exports=router;