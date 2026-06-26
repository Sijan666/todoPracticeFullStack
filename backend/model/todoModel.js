const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum : ["low" , 'high', 'medium'],
        required: true
    },
    status: {
        type: String,
        enum : ["active" , 'block', 'pending'],
        required: true
    },
});


module.exports = mongoose.model('Todo', todoSchema)
