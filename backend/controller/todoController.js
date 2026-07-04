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

module.exports = {createTodo}