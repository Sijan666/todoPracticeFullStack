const mongoose = require('mongoose')
const {Schema} =  mongoose

const todoSchema = new Todo({
    task:{
        type : String ,
        required : true
    },
    priority:{
        type : String ,
        enum : ['low','medium','high'],
        required : true
    },
})


module.exports = mongoose.model('Todo',todoSchema)