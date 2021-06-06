const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Environment configuration
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hcqem.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((conn) => console.log(`Connected to: ${conn.connection.host}`));

const app = express();

// Morgan logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());

// Routes
app.use("/auth", require("./routes/user"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
