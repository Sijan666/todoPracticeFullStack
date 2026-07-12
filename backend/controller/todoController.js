const Todo = require('../model/todoModel');

// create task
const createTodo = async (req,res) => {
    const {task , priority} = req.body
    // const fileType = req.file.mimetype
    
    if (!task || !priority) {
        return res.send({
            success : false,
            message : "task and priority fields are required"
        })
    }

    if (!req.file) {
        res.send({
            success : false,
            message : "please upload a media file"
        })
    }

const todos = new Todo({
    task: task,
    priority: priority,
    path: req.file.path,
    // mediaType: fileType
});

    await todos.save()
    res.send({
        success : true,
        message : "Task created successfully"
    })
}

// alltasks
const allTodo = async (req,res) => {
    const data = await Todo.find({})
    res.send({
        success : true,
        message : "All tasks fetched successfully",
        data : data
    })
}

// deletetasks
const deleteTodos = async (req, res) => {
    let { id } = req.params;
    await Todo.findByIdAndDelete(id); 
    res.send({
        success: true,
        message: 'Task deleted successfully'
    });
}

// updatetasks
const updateData = async (req, res) => {
    const { id } = req.params;
    const updateTask = await Todo.findByIdAndUpdate({_id:id},req.body)
    res.send({
        success: true,
        message: "Task updated successfully"
    });
}

module.exports = { createTodo, allTodo , deleteTodos , updateData };