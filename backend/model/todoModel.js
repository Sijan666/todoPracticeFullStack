const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = new Schema({
    task:{
        type : String,
        require : true
    },
    priority:{
        type : String,
        enum : ['High' , 'Medium' , "Low"],
        require : true
    },
    status:{
        type : String,
        enum : ['active' , 'block' , "pending"],
        require : true
    }
})

module.exports = mongoose.model('Todo' , todoSchema)