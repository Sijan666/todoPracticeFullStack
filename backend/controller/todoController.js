const Todo = require('../model/todoModel')

const createTodo = async (req,res) => {
    const {task , priority} = req.body

    if (!task || !priority) {
        return res.send({
            success : false,
            message : 'please fill all the fields'
        })
    }
}