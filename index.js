const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Environment configuration
dotenv.config();

const app = express();

// Morgan logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/user'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
