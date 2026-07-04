// require('node:dns').setServers(['1.1.1.1'] , ['8.8.8.8'])

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { createTodo, allTodos, deleteData } = require('./controller/todoController')
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://666majharulislam_db_user:25250180@cluster0.nzekssh.mongodb.net/todo?appName=Cluster0').then(()=>{
    console.log('Database Connected');
})

app.post('/createTodo' , createTodo)
app.get('/allTodos' , allTodos)
app.delete('/deleteData/:id' , deleteData)
app.post('/updateData/:id' , )

app.listen(5000,()=>{
    console.log('server is running');
})