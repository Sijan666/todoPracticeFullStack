const mongoose = require('mongoose')
const Schema = mongoose

const todoSchema = new Schema({
    task:{
        type : String,
        require : true
    }
})