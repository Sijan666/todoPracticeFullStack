const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = new todo({
    task:{
        type : String,
        required : true
    },
    Status:{
        type : String,
        enum : ['active' , 'pending' , 'block'],
        required : true
    },
    Priority:{
        type : String,
        enum : ['low' , 'medium' , 'high'],
        required : true
    }
})

module.exports = mongoose.model('Todo', todoSchema)