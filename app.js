var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var app = express();

// view engine setup
app.set("views", __dirname + "/views");

app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//引入設定檔
const config = require("./config/config");

//connect to database
mongoose.connect(config.db.url);
//if connect database error
const db = mongoose.connection;
db.on("err", (err) => console.log(err));
//if success
db.once("open", () => console.log("connected to database..."));

const Router = require("./routes/Backend");

//localhost:3000/ => go to backend
app.all("*", Router);

//app.use(/main.html/, todoRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
