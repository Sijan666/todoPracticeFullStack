const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = new Schema({
    task:{
        type: String,
        required : true,
    },
    priority:{
        type: String,
        required : true,
        enum : ['low' , 'high' , 'medium']
    }
})

module.exports = mongoose.model('Todo' , todoSchema)