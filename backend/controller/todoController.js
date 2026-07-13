const Todo = require('../model/todoModel');

// create task
const createTodo = async (req, res) => {
    try {
        const { task, priority } = req.body;
        // const fileType = req.file.mimetype;
        
        if (!task || !priority) {
            return res.send({
                success: false,
                message: "task and priority fields are required"
            });
        }

        if (!req.file) {
            return res.send({
                success: false,
                message: "please upload a media file"
            });
        }

        const todos = new Todo({
            task: task,
            priority: priority,
            path: req.file.path,
            // mediaType: fileType
        });

        await todos.save();
        res.status(200).send({
            success: true,
            message: "Task created successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occurred while creating task",
            error: error.message
        });
    }
}

// alltasks
const allTodo = async (req, res) => {
    try {
        const data = await Todo.find({});
        res.status(200).send({
            success: true,
            message: "All tasks fetched successfully",
            data: data
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occurred while fetching tasks",
            error: error.message
        });
    }
}

// deletetasks
const deleteTodos = async (req, res) => {
    try {
        let { id } = req.params;
        await Todo.findByIdAndDelete(id); 
        res.send({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occurred while deleting task",
            error: error.message
        });
    }
}

// updatetasks
const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const updateTask = await Todo.findByIdAndUpdate({ _id: id }, req.body);
        res.send({
            success: true,
            message: "Task updated successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occurred while updating task",
            error: error.message
        });
    }
}

module.exports = { createTodo, allTodo, deleteTodos, updateData };