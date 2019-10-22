const express = require("express");

const mongoos = require("mongoose");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

const db = require("./config/key").mongoURI;
mongoos
  .connect(db)
  .then(() => console.log("MongoDb Connect Successfully!"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello ! Buddy How Are You"));

//Use Routes
app.use("./api/users", users);
app.use("./api/profile", profile);
app.use("./api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is Running on Port ${port}`));
