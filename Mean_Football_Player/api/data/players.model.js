const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  stadium: String,
});

const playerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  position: String,
  current_team: teamSchema,
  teams_played_for: [teamSchema],
});

mongoose.model("Player", playerSchema, "players");
