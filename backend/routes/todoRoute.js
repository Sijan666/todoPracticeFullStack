const express = require('express');
const router = express.Router();
const { createtodo, alltodo, deletetodos, updatedata } = require('../controller/todoController');
const upload = require('../utlis/storage');

router.post('/createtodo', upload.single('image'), createTodo);
router.get('/alltodo', allTodo);
router.delete('/deletetodos/:id', deleteTodos);
router.post('/updatedata/:id', upload.single('image'), updateData);

module.exports = router;