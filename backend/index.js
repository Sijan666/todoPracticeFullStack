// require('node:dns').setServers(['1.1.1.1'] , ['8.8.8.8'])
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { createTodo } = require('./controller/todoController')
const app = express()
const multer = require('multer')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://666majharulislam_db_user:25250180@cluster0.nzekssh.mongodb.net/todo?appName=Cluster0').then(()=>{
    console.log('Database Connected');
})

// const storage = multer.diskStorage({
//     destination:function (req,file,cb) {
//         cb(null,'./uploads')
//     },
//     filename:function (req,file,cb) {
//         let uniqueName = 'img'+"-"+Date.now() 
//         cb(null,uniqueName + "-" + file.originalname)
//     }
// })

const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,'./uploads')
    },
    filename : function (req,file,cb) {
        let uniqueName = 'img' + '-' + Date.now()
        cb('null' , uniqueName + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });

app.post('/createTodo' , upload.single('image') , createTodo)

app.listen(5000,()=>{
    console.log('server is running');
})