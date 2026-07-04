const Todo = require('../model/todoModel')

const createTodo = async (req,res) => {
    const {task , priority} = req.body

    if (!task || !priority) {
        return res.send({
            success : false,
            message : 'please fill all the fields'
        })
    }

    const todo = new Todo({
        task : task,
        priority : priority
    })

    await todo.save()
    res.send({
        success : true,
        message : 'todo created'
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

const deleteData = async (req,res) => {
    const {id} = req.params
    let deleteTodo = await Todo.findByIdAndDelete(id)
    res.send({
        success : true,
        message : "Todo deleted",
    })
}


const updateData = async (req,res) => {
    const {id} = req.params
    let updateTodo = await Todo.findByIdAndUpdate({_id:id},req.body)
    res.send({
        success : true,
        message : "Todo Updated",
    })
}

module.exports = {createTodo , allTodos , deleteData , updateData}