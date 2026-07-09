const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { createTodo, getTodos, deleteTodos } = require('./controller/todoController');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://666majharulislam_db_user:25250180@cluster0.nzekssh.mongodb.net/todo?appName=Cluster0')
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database connection error:', err));

// multer for images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        let uniqueName = 'img-' + Date.now();
        cb(null, uniqueName + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// API Routes
app.post('/createTodo', upload.single('image'), createTodo);
app.get('/getTodos', getTodos);
app.delete('/deleteTask/:id', deleteTodos);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});