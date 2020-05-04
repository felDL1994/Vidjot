const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Load Idea model
require("../models/Idea");
const Idea = mongoose.model("ideas");

//Ideas index page
router.get("/", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .lean()
    .then((ideas) => {
      res.render("ideas/index", {
        ideas: ideas,
      });
    });
});

//Add idea Form
router.get("/add", (req, res) => {
  res.render("ideas/add");
});

//Edit Idea form
router.get("/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  })
    .lean()
    .then((idea) => {
      res.render("ideas/edit", {
        idea: idea,
      });
    });
});

//Process Form
router.post("/", (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add a description" });
  }

  if (errors.length > 0) {
    res.render("/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
    };
    new Idea(newUser).save().then((idea) => {
      req.flash("success_msg", "Video idea added");
      res.redirect("/ideas");
    });
  }
});

//Edit Form Process
router.put("/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => {
    //new values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then((idea) => {
      req.flash("success_msg", "Video idea edited");
      res.redirect("/ideas");
    });
  });
});

//Delete Idea
router.delete("/:id", (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Video idea remove");
    res.redirect("/ideas");
  });
});

module.exports = router;
