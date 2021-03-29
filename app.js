const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const { get404 } = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const User = require("./models/user");

// APP
const app = express();

// EJX, PUG ...
app.set("view engine", "ejs");
app.set("views", "views");

// IMPORT ROUTES
const aminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6060716bf415b5a589b6b936")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((error) => console.log("[USER ERROR]", error));
});

app.use("/admin", aminRoutes);
app.use(shopRoutes);

app.use(get404);

const port = process.env.PORT || 8000;
const srv = process.env.MONGODB_SRV_ADDRESS;
mongoConnect(srv, () => {
  console.log(`The server is running on port ${port}`);
  app.listen(port);
});
