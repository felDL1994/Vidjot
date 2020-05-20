module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Vous devez d'abord vous connecter !");
    res.redirect("/users/login");
  },
};
