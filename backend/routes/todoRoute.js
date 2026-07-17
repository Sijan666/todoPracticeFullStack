const express = require('express');
const router = express.Router();
const { createtodo, alltodo, deletetodos, updatedata } = require('../controller/todoController');
const upload = require('../utlis/storage');

router.post('/createtodo', upload.single('image'), createtodo);
router.get('/alltodo', alltodo);
router.delete('/deletetodos/:id', deletetodos);
router.post('/updatedata/:id', upload.single('image'), updatedata);

module.exports = router;