var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var middlewares = require("./middlewares");
var api = require("./api");

var app = express();
var User = require("./models/user");

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose
  .connect("mongodb://localhost:27017/project-forum", {
    promiseLibrary: require("bluebird")
  })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);

app.get("/", (req, res) => {
  var indexObj = {
    message: "Welcome to forum api",
    createdBy: "Fisnik Zejnullahu"
  };
  res.json(indexObj);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
