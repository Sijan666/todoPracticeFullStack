const Todo = require('../model/todoModel');

// create task
const createtodo = async (req, res) => {
    try {
        const { task, priority } = req.body;
        
        if (!task || !priority) {
            return res.status(400).json({
                success: false,
                message: "task and priority fields are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "please upload a media file"
            });
        }

        const todos = new Todo({
            task: task,
            priority: priority,
            path: req.file.path,
        });

        await todos.save();
        return res.status(201).json({
            success: true,
            message: "Task created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating task",
            error: error.message
        });
    }
}

// alltasks
const alltodo = async (req, res) => {
    try {
        const data = await Todo.find({});
        return res.status(200).json({
            success: true,
            message: "All tasks fetched successfully",
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching tasks",
            error: error.message
        });
    }
}

// deletetasks
const deletetodos = async (req, res) => {
    try {
        let { id } = req.params;
        const deletedTask = await Todo.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting task",
            error: error.message
        });
    }
}

// updatetasks
const updatedata = async (req, res) => {
    try {
        const { id } = req.params;

        // for image
        if (req.file) {
            req.body.path = req.file.path;
        }

        const updateTask = await Todo.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json({
            success: true,
            message: "Task updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating task",
            error: error.message
        });
    }
}

module.exports = { createtodo, alltodo, deletetodos, updatedata };