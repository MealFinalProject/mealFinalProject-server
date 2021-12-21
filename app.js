// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Require swagger
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);
app.use('/apidoc', express.static('apidoc', { 'index': ['index.html'] }))
app.use(
  '/swagger',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;