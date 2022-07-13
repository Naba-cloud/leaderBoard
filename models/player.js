const mongoose = require("mongoose");
var DateOnly = require('mongoose-dateonly')(mongoose);
const playerSchema = new mongoose.Schema({
  id: {type:Number,required:true},
  participantName:  {type:String,required:true},
   location:  {type:String,required:true},
  units:  {type:Number,required:true},
  type_: { type: String, required: true },
  points: {type:Number,required:true},
  selectedDate: { type: String, required: true },
});

module.exports.playerSchema = playerSchema;
