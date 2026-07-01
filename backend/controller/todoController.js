const Todo = require('../model/todoModel')

const createTodo = async (req,res) => {
    const {task,status,priority} = req.body

    if (!task || !status || !priority) {
        return res.send({
            success:false,
            message:'please fill all the fields'
        })
    }
}