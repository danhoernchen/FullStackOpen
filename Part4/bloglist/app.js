const config = require("./utils/config.js");
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog.js");
const { info, error } = require("./utils/logger.js");

const app = express();
app.use(express.json());

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => info("connected"))
  .catch((error) => error(error));

app.use("/api/blogs", blogRouter);

module.exports = app;
