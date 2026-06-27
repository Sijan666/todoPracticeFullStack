const mongoose = require('mongoose')
const {Scheme} = mongoose

const todoSchema = new Schema({
    task:{
        type : String,
        required : true,
    },
    priority:{
        type : String,
        enum : ['low' , 'medium' , 'high'],
        required : true,
    }
})

module.exports = mongoose.model('Todo' , todoSchema)