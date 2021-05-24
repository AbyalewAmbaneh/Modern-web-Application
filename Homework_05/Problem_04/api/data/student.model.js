const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  JPA: Number,
  Address: [addressSchema],
});

mongoose.model("Student", studentSchema, "Students");
