// require("node:dns").setServers(['1.1.1.1'] , ['8.8.8.8'])
const express = require('express');
const cors = require('cors');
const mongoDb = require('./config/mongoDb');
const todoRoutes = require('./routes/todoRoute');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// database connection
mongoDb();

// api routes
app.use('/', todoRoutes); 

// server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});