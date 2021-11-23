const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/User',{ useNewUrlParser :true, useUnifiedTopology : true});
//const bcrypt = require('bcrypt')

const bookingSchema = new mongoose.Schema({
    
    roomno:{
        type: Number,
        default: undefined
    },
    blockno:{
        type: String,
        default: undefined
    }
    ,
    capacity:{
        type: Number,
        default: undefined
    },

    bookername:{
        type: String,
        default: undefined
    },
    bookerloginid:{
        type: String,
        default: undefined
    },
    bookerteacherid:{
        type: String,
        default: undefined
    },
    bookercontactno:{
        type: Number,
        default: undefined
    },
    bookerusertype:{
        type: String,
        default: undefined
    },
    
    ninetotwelve: {
        type: Boolean,
        default :false,
    },
    twelvetothree: {
        type: Boolean,
        default :false,
    },
    threetosix:{
        type: Boolean,
        default :false,
    },
    sixtoeight: {
        type: Boolean,
        default :false,
    },
    dateofbooking: {
        type: Date,
        default: undefined
    },
})
module.exports = mongoose.model('Booking', bookingSchema);