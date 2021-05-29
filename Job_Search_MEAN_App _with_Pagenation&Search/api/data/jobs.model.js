const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
});

const jobSchema = new mongoose.Schema({
  title: String,
  salary: Number,
  description: String,
  experience: Number,
  skill: [String],
  postDate: Date, // date typt
  location: locationSchema,
});

mongoose.model("Job", jobSchema, "jobs");
