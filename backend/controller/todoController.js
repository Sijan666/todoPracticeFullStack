const Todo = require('../model/todoModel');

const createTodo = async (req, res) => {
    const { task, priority } = req.body;

    if (!task || !priority) {
        return res.send({ success: false, message: "Please fill all the fields" });
    }

    if (!req.file) {
        return res.send({ success: false, message: "Please upload an image" });
    }

    const todo = new Todo({
        task: task,
        priority: priority,
        path: req.file.path
    });

    await todo.save();
    res.send({
        success : true,
        message : "Todo created successfully"
    })

};

const getTodos = async (req, res) => {
    const data = await Todo.find({})
    res.send({
        success : true,
        message : "collected",
        data : data
    })
};

const deleteTodos = async (req, res) => {
    let { id } = req.params;
    await Todo.findByIdAndDelete(id); 
    res.send({
        success: true,
        message: 'Task has been deleted'
    });
}
module.exports = { createTodo, getTodos , deleteTodos };