const bcrypt = require("bcryptjs");
const User = require("../models/user");

const BT_SALT_ROUNDS = 12;

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(() => {
              res.redirect("/");
            });
          }
          return res.redirect("/login");
        })
        .catch((error) => res.redirect("/login"));
    })
    .catch((error) => console.log(error));
};

exports.postSignup = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then((userDocument) => {
      if (userDocument) return res.redirect("/signup");
      return bcrypt
        .hash(password, BT_SALT_ROUNDS)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => res.redirect("/login"));
    })

    .catch((error) => console.log(error));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
