const Todo = require('../model/todoModel');

const createTodo = async (req,res) => {
    const {task , priority} = req.body

    if (!task || !priority) {
        return res.send({
            success : false,
            message : "please fill all the gap"
        })
    }

    const todos = new Todo({
        task : task,
        priority : priority,
        path : req.file.path
    })

    await todos.save()
    res.send({
        success : true,
        message : "todo created"
    })
}

const allTodo = async (req,res) => {
    const data = await Todo.find({})
    res.send({
        success : true,
        message : "collected all data",
        data : data
    })
}

const deleteTodos = async (req, res) => {
    let { id } = req.params;
    await Todo.findByIdAndDelete(id); 
    res.send({
        success: true,
        message: 'Task has been deleted'
    });
}

const updateData = async (req, res) => {
    const { id } = req.params;
    const updateTask = await Todo.findByIdAndUpdate({_id:id},req.body)
    res.send({
        success: true,
        message: "Todo updated successfully"
    });
}

module.exports = { createTodo, getTodos , deleteTodos , updateData };