const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/User',{ useNewUrlParser :true, useUnifiedTopology : true});
//const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    usertype:{
        type: String,
        required: [true,'Usertype cannot be empty']
    },
    loginid: {
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: [true,'this loginid already exists ']
       },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    teacherid:{
        type:Number,
        required: [true, 'teacher id cannot be blank'],
        unique: [true,'this teacher id already exists ']
    },
    contactno: {
        type:Number,
        required: [true, 'conatct no.field cannot be blank']
    }
    
})
module.exports = mongoose.model('User', userSchema);