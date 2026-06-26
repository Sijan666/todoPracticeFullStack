const Todo = require('../model/todoModel')

const createTodo = async (req,res) => {
    const {task , priority , status} = req.body

    if (!task || !priority || !status) {
        return res.send({
            success : false ,
            message : "fill all the fields"
        })
    }

    const todos = new Todo({
        task : task,
        priority : priority,
        status : status
    })

    await todos.save()
    res.send({
        success : true,
        message : "todo created"
    })
}


const allTodos = async (req,res) => {
    let data = await Todo.find({})
    res.send({
        success : true,
        message : "collected",
        data : data
    })
}


module.exports = {createTodo ,allTodos}