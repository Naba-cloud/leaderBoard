const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {playerSchema}= require("../models/player");
const moment = require("moment");
 const Player = mongoose.model("players", playerSchema);
 const ObjectId = require('mongodb').ObjectId;
 var DateOnly = require('mongoose-dateonly')(mongoose);
//  Create New Player Api
router.post("/:id", async (req, res) => {
let player=await Player.create({
    id: req.params.id,
        participantName: req.body.participantName,
        location: req.body.location,
        units: req.body.units,
         type_: req.body.type_,
        points: req.body.points,
         selectedDate:moment(req.body.selectedDate, 'DD-MM-YYYY').format('MM/DD/YYYY')
  })


    await player.save()
  res.send(player);

 
});

  // Get All The Players Api
 router.get("/", async(req,res)=>{
 try {
    const players = await Player.find().sort("participantName");
    console.log(players);
   res.send(players);
    
  } catch (error) {
    console.log(error);
  }
 })
//  Get One Player Api
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
// Delete Player Api
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
// Player Points Increment Api
  router.put("/incrementpoints/:id", async (req, res) => {
    const id = req.params.id;
    const objectToUpdate = await Player.findOne({  id:id });
    objectToUpdate.points=req.body.points+1;
     objectToUpdate.save();
    console.log(objectToUpdate);
    res.send(objectToUpdate);
  });
  // Player Points decrement Api
  router.put("/decrementpoints/:id", async (req, res) => {
    const id = req.params.id;
    const objectToUpdate = await Player.findOne({  id: id});
    objectToUpdate.points = req.body.points-1;
     objectToUpdate.save();
    console.log(objectToUpdate);
    res.send(objectToUpdate);
  });
module.exports = router;
