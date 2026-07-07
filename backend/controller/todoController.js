const Todo = require('../model/todoModel');

const createTodo = async (req, res) => {
    const { task, priority } = req.body;

    if (!task || !priority) {
        return res.send({ success: false, message: "Please fill all the fields" });
    }

    if (!req.file) {
        return res.send({ success: false, message: "Please upload an image" });
    }

    try {
        const todo = new Todo({
            task: task,
            priority: priority,
            path: req.file.path
        });

        await todo.save();
        res.send({ success: true, message: 'Todo created successfully' });
    } catch (error) {
        res.send({ success: false, message: 'Error creating todo' });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ _id: -1 }); 
        res.send({ success: true, todos: todos });
    } catch (error) {
        res.send({ success: false, message: "Error fetching tasks" });
    }
};

module.exports = { createTodo, getTodos };