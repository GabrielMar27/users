const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user");
const con = require("./database");
const session = require("express-session");
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "secrete-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/user", userRoute);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
