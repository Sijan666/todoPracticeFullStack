const Todo = require('../model/todoModel')

const createTask = async (req,res) => {
    const {task , priority} = req.body

    if (!task || !priority) {
        return res.send({
            success : false,
            message : 'kichu ekta'
        })
    }

    const todo = new Todo({
        task : task,
        priority : priority
    })

    await todo.save()
    res.send({
        success : true,
        message : " done"
    })
}


module.exports = {createTask}