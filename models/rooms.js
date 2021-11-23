const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/User',{ useNewUrlParser :true, useUnifiedTopology : true});
//const bcrypt = require('bcrypt')

const roomSchema = new mongoose.Schema({
    //  id:[
    //     {
    //         blockno:{
    //             type: String,
    //             required: [true,'blockno. cannot be empty'],
    //             unique:false
    //         },
    //         roomno: {
    //             type: Number,
    //             required: [true, 'Username cannot be blank'],
    //             unique:false
    //         }
            
    //     }
    //   ]
      blockno:{
        type: String,
        required: [true,'blockno. cannot be empty'],
        unique:[false]
    },
    roomno: {
        type: Number,
        required: [true, 'Username cannot be blank'],
        unique:[false]
    }
    ,
    capacity: {
        type:Number,
        required: [true,'capacity cant be blank']
    },
    
})
module.exports = mongoose.model('Room', roomSchema);