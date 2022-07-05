const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
  id: Number,
  participantName:  String,
   location:  String,
  units:  Number,
  type_: { type: String, required: true },
  points: Number,
  selectedDate: { type: Date, required: true },
});

module.exports.playerSchema = playerSchema;
