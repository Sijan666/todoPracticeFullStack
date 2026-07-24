// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo Api",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
            url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;