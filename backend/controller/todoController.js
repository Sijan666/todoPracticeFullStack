const Todo = require('../model/todoModel')

const createTodo = async (req,res) => {
    const {task , priority , status} = req.body

    if (!task || !priority || !status) {
        return res.send({
            success : false,
            message : "please fill all the fields"
        })
    }

    const todo = new Todo({
        task : task,
        priority : priority,
        status : status
    })

    await todo.save()
    res.send({
        success : true,
        message : "Todo Created"
    })
}



module.exports = {createTodo}