require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/viewPost');

const app = express();

//Connect mongo database
const mongoDB = "mongodb://localhost:27017/overflowDB";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mango connection error"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/viewPost', postsRouter);
//do the setup accordingly depending on the environment
if (process.env.NODE_ENV === "development") {
    app.use(
      cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
      })
    );
  } else if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../front/build")));
    app.use("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../front/build/index.html"));
    });
}

module.exports = app;