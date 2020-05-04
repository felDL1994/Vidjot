const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const path = require("path");
const session = require("express-session");
const router = express.Router();

const app = express();

//Load Routes
const ideas = require("./routes/ideas");

const users = require("./routes/users");

//Map global promise - get ride of warning
mongoose.Promise = global.Promise;

//Connect to DB
mongoose
  .connect("mongodb://localhost/acme", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connecté"))
  .catch((err) => console.log(err));

//How middleware works
app.use(function (req, res, next) {
  /* console.log(Date.now()); */
  req.name = "Antoine";
  next();
});

//Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//Method Override middleware
app.use(methodOverride("_method"));

//Express Session Middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Connect-flash middleware
app.use(flash());

//Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Index Route
app.get("/", (req, res) => {
  /*   console.log(req.name);
   */

  const titre = "Bienvenue";
  res.render("index", {
    title: titre,
  });
});

//About Route
app.get("/about", (req, res) => {
  res.render("about");
});

//Use routes
app.use("/ideas", ideas);
app.use("/users", users);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
