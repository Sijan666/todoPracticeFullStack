const Todo = require('../model/todoModel')

const createTodo = async (req,res) => {
    const {task,status,priority} = req.body

    if (!task || !status || !priority) {
        return res.send({
            success:false,
            message:'please fill all the fields'
        })
    }

    const todos = new Todo({
        task:task,
        status:status,
        priority:priority
    })

    await todos.save()
    res.send({
        success:true,
        message:'todo created'
    })
}


module.exports = {createTodo}