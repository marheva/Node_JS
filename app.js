const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { get404 } = require("./controllers/error");
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
  User.findById("60671c30c13f9d1924330fd6")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log("[USER ERROR]", error));
});

app.use("/admin", aminRoutes);
app.use(shopRoutes);

app.use(get404);

const port = process.env.PORT || 8080;
const srv = process.env.MONGODB_SRV_ADDRESS;

mongoose.connect(srv, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("DB Connected");
  User.findOne().then((user) => {
    if (!user) {
      const user = new User({
        name: "Roman",
        email: "markhevkaroman@gmail.com",
        cart: {
          items: [],
        },
      });
      user.save();
    }
  });

  app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});
