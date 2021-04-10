const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CONNECTION_URL =
  "mongodb+srv://syed:7275456455@cluster0.hlj0c.mongodb.net/FoodDatabase?retryWrites=true&w=majority";

mongoose.connect(
  CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

const userRegisterationRoute = require("./routes/userregisteration");
const userLoginRoute = require("./routes/userlogin");
const userDashboardRoute = require("./routes/userdetails");

app.use("/", userRegisterationRoute);
app.use("/login", userLoginRoute);
app.use("/dashboard", userDashboardRoute);

server.listen(4000);
