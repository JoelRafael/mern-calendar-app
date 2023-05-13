const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./database/config");

// create server the express

const app = express();

//Connection MongoDb
dbConnection();

// CORS
app.use(cors());

//Directory public

app.use(express.static("public"));

//read and parse the body

app.use(express.json());

// Route my server

//TODO: auth // create // login // renew
app.use("/api/auth", require("./routes/auth"));

//TODO: CRUD: event
app.use("/api/events", require("./routes/events"));
// Listen port server

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
