// const express = require('express');
// const router = express.Router();
// const { createtodo, alltodo, deletetodos, updatedata } = require('../controller/todoController');
// const upload = require('../utils/storage');

// router.post('/createtodo', upload.single('image'), createtodo);
// router.get('/alltodo', alltodo);
// router.delete('/deletetodos/:id', deletetodos);
// router.post('/updatedata/:id', upload.single('image'), updatedata);

// module.exports = router;

// =============================
// =============================

const express = require('express');
const router = express.Router();
const { createtodo, alltodo, deletetodos, updatedata } = require('../controller/todoController');
const upload = require('../utils/storage');

/**
 * @swagger
 * /createtodo:
 *   post:
 *     summary: Create a new todo
 *     description: Creates a new todo item with an optional image upload.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo
 *               description:
 *                 type: string
 *                 description: Detailed description of the todo
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/createtodo', upload.single('image'), createtodo);

/**
 * @swagger
 * /alltodo:
 *   get:
 *     summary: Get all todos
 *     description: Retrieves a list of all available todos.
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *       500:
 *         description: Internal server error
 */
router.get('/alltodo', alltodo);

/**
 * @swagger
 * /deletetodos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     description: Removes a single todo item based on the provided ID.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.delete('/deletetodos/:id', deletetodos);

/**
 * @swagger
 * /updatedata/{id}:
 *   post:
 *     summary: Update an existing todo
 *     description: Updates a todo item by ID. You can also upload a new image to replace the old one.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.post('/updatedata/:id', upload.single('image'), updatedata);

module.exports = router;