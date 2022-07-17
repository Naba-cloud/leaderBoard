const express = require("express");
const app = express();
const mongoose = require("mongoose");
const players = require("./routes/players");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose
.connect("mongodb+srv://naba:naba1234@cluster0.dz056bm.mongodb.net/test")
.then(() => {
    console.log("Connected to Mongodb...");
  })
  .catch((err) => {
    console.log("Couldnot Connected To Mongodb...");
  });
 
app.use("/api/players", players);
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening On Port ${port}`));
