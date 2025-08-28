const mongoose = require('mongoose')

const addUserSchema = mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('addUser' , addUserSchema )