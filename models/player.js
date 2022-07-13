const mongoose = require("mongoose");
var DateOnly = require('mongoose-dateonly')(mongoose);
const playerSchema = new mongoose.Schema({
  id: {Number,required:true},
  participantName:  {String,required:true},
   location:  {String,required:true},
  units:  {Number,required:true},
  type_: { type: String, required: true },
  points: {Number,required:true},
  selectedDate: { type: String, required: true },
});

module.exports.playerSchema = playerSchema;
