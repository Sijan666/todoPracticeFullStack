// require("node:dns").setServers(['1.1.1.1' , '8.8.8.8'])
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoDb = require('./config/mongoDb');
const todoRoutes = require('./routes/todoRoute');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const { apiLimiter } = require("./utils/rateLimiters");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// console.log(process.env);

// database connection
mongoDb();

// limiter
app.use(apiLimiter);

// Swagger Route
app.use(
    "/regi",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// api routes
app.use('/api/v1/alltodo', todoRoutes);

// server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});