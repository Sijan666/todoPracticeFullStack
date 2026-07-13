// require("node:dns").setServers(['1.1.1.1'] , ['8.8.8.8'])
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { createTodo, deleteTodos, updateData, allTodo } = require('./controller/todoController');
const storage = require('./utlis/storage')


const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// mongo atlas server
mongoose.connect('mongodb+srv://666majharulislam_db_user:25250180@cluster0.nzekssh.mongodb.net/todo?appName=Cluster0')
    .then(() => console.log('Database Connected successfully'))
    .catch((error) => console.log('Database connection failed:', error));



// api routes
app.post('/createTodo', upload.single('image'), createTodo);
app.get('/allTodo', allTodo);
app.delete('/deleteTask/:id', deleteTodos);
app.post('/updateData/:id', upload.single('image'), updateData);

// server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});