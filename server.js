const express = require("express");

const mongoos = require("mongoose");

const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

//passport initialize [middleware]
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);
//use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require("./config/key").mongoURI;
mongoos
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDb Connect Successfully!"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello ! Buddy How Are You"));

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is Running on Port ${port}`));
