const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {playerSchema}= require("../models/player");
const moment = require("moment");
 const Player = mongoose.model("players", playerSchema);
 const ObjectId = require('mongodb').ObjectId;
 var DateOnly = require('mongoose-dateonly')(mongoose);
let num=0;

//  Create New Player Ap
router.post("/", async (req, res) => {
 
let player=await Player.create({
    // id:num+1,
        participantName: req.body.participantName,
        location: req.body.location,
        units: req.body.units,
         type_: req.body.type_,
        points: req.body.points,
         selectedDate:(req.body.selectedDate)
  })
  await player.save()
  res.send(player);




   

 
});

  // Get All The Players Api
 router.get("/", async(req,res)=>{
 try {
    const players = await Player.find().sort("participantName");
    // console.log(players);
   res.send(players);
    
  } catch (error) {
    console.log(error.message);
  }
 })
//  Get One Player Api
router.get("/:id",async(req,res)=>{
 

const id = req.params.id;
  try {
    const player= await Player.findOne({ _id: ObjectId(id)})
    console.log(req.params.id);
    // console.log(player);
   res.send(player);
  
  } catch (error) {
    console.log(error);
  }
})
// Delete Player Api
router.delete("/:id", (req, res) => {
 Player.deleteOne({  _id:(req.params.id) }, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      
      res.status(204).end();
      
    }
  });
});
// Player Points Increment Api
  router.put("/incrementpoints/:id", async (req, res) => {
   
    let objectToUpdate = await Player.findOneAndUpdate({_id:req.params.id},{points:req.body.points+1})
    // console.log("object from server",objectToUpdate);
     objectToUpdate.points=req.body.points;
      objectToUpdate.save();
   let allPlayers=await Player.find();
   console.log(allPlayers); 
    //  console.log(objectToUpdate);
    // res.send(objectToUpdate);
     res.send(allPlayers);
  });
  // Player Points decrement Api
  router.put("/decrementpoints/:id", async (req, res) => {
    const id = req.params.id;
    const objectToUpdate = await Player.findOneAndUpdate({  _id: id},{points:req.body.points-1});
    objectToUpdate.points = req.body.points;
     objectToUpdate.save();
    // console.log(objectToUpdate);
    // res.send(objectToUpdate);
    let allPlayers=await Player.find();
   console.log(allPlayers); 
    //  console.log(objectToUpdate);
    // res.send(objectToUpdate);
     res.send(allPlayers);
  });
module.exports = router;
