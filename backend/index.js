// require("node:dns").setServers(['1.1.1.1'] , ['8.8.8.8'])
const express = require('express');
const cors = require('cors');
const { createTodo, deleteTodos, updateData, allTodo } = require('./controller/todoController');
const storage = require('./utlis/storage')
const mongoDb = require('./config/mongoDb')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


// api routes
app.post('/createTodo', upload.single('image'), createTodo);
app.get('/allTodo', allTodo);
app.delete('/deleteTask/:id', deleteTodos);
app.post('/updateData/:id', upload.single('image'), updateData);

// server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});