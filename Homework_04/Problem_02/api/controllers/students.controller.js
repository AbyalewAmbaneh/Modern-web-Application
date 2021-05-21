const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
  var offset = 0;
  var count = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }
  Student.find().exec(function (err, students) {
    console.log("Found Students", students.length);
    res.json(students);
  });
};

module.exports.studentGetOne = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    res.status(200).json(student);
  });
};
