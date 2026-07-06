const createTodo = async (req, res) => {
    const { task, priority } = req.body;

    if (!task || !priority) {
        return res.send({
            success: false,
            message: "Please fill all the fields"
        });
    }

    if (!req.file) {
        return res.send({
            success: false,
            message: "Please upload an image"
        });
    }

    const todo = new Todo({
        task: task,
        priority: priority,
        path: req.file.path
    });

    await todo.save();
    res.send({
        success: true,
        message: 'Todo created successfully'
    });
};

module.exports = { createTodo };