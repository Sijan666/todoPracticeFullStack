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

module.exports = {createTodo}