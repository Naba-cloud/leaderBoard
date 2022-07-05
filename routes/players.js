const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const playerSchema= require("../models/player");
const moment = require("moment");
 const Player = mongoose.model("players", playerSchema);
 const ObjectId = require('mongodb').ObjectId;

router.post("/:id", async (req, res) => {
  const player = new Player({
    id: req.params.id,
    participantName: req.body.participantName,
    location: req.body.location,
    units: req.body.units,
     type_: req.body.type_,
    points: req.body.points,
     selectedDate:req.body.selectedDate
  });
  console.log(req.body);
console.log(player);

  const result = await player.save()
    res.send(result);
  
 
});

  
 router.get("/", async(req,res)=>{
 try {
    const players = await Player.find().sort("participantName");
    console.log(players);
   res.send(players);
    
  } catch (error) {
    console.log(error);
  }
 })
router.get("/:id",async(req,res)=>{
 

const id = req.params.id;
  try {
    const player= await Player.findOne({ _id: ObjectId(id)})
    console.log(req.params.id);
    console.log(player);
   res.send(player);
  
  } catch (error) {
    console.log(error);
  }
})
router.delete("/:id", (req, res) => {
  const id=req.body.id;
 Player.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful deletion");
    }
  });
});
  router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const objectToUpdate = await Player.findOne({  _id: ObjectId(id) });
    console.log(objectToUpdate);
    console.log(req.body.participantName);
    objectToUpdate.participantName = req.body.participantName;
     objectToUpdate.save();
    console.log(objectToUpdate);
    res.send(objectToUpdate);
  });
module.exports = router;
