const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session");
const csrf = require("csurf");
const flash = require("connect-flash");

const { get404 } = require("./controllers/error");
const User = require("./models/user");

require("dotenv").config();

const APP_PORT = process.env.PORT || 8080;
const MONDO_DB_URI = process.env.MONGODB_SRV_ADDRESS;
const DB_SESSIONS_COLLECTION_NAME = "sessions";

// APP
const app = express();
const mongoDBStore = mongoDBSession(session);
const store = new mongoDBStore({
  uri: MONDO_DB_URI,
  collection: DB_SESSIONS_COLLECTION_NAME,
});
const csrfProtection = csrf();

// EJX, PUG ...
app.set("view engine", "ejs");
app.set("views", "views");

// IMPORT ROUTES
const aminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "my secret", resave: false, saveUninitialized: false, store: store }));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// express local variables
//
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// ROUTES
app.use("/admin", aminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(get404);

mongoose.connect(MONDO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("DB Connected");
  app.listen(APP_PORT, () => {
    console.log(`The server is running on port ${APP_PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});
