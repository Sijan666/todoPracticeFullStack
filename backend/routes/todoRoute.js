const express = require('express');
const router = express.Router();
const { createTodo, allTodo, deleteTodos, updateData } = require('../controller/todoController');
const upload = require('../utlis/storage');

router.post('/createTodo', upload.single('image'), createTodo);
router.get('/allTodo', allTodo);
router.delete('/deleteTask/:id', deleteTodos);
router.post('/updateData/:id', upload.single('image'), updateData);

module.exports = router;