const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ['high', 'low', 'medium']
    },
    path: {
        type: String
    },
    // mediaType: {
    //     type: String,
    //     enum: ['image', 'video', 'audio'], 
    //     required: false 
    // }
});

module.exports = mongoose.model('Todo', todoSchema);