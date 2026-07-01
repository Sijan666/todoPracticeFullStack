const mongoose = require('mongoose')
const Schema = mongoose

const todoSchema = new Schema({
    task:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['active','pending','block']
    },
    priority:{
        type: String,
        required: true,
        enum: ['high','low','medium']
    }
})