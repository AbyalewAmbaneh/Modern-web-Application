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

module.exports.addStudent = function (req, res) {
  Student.create(
    {
      name: req.body.name,
      JPA: parseFloat(req.body.JPA),
      Address: req.body.Address,
    },
    function (err, newStudent) {
      if (err) {
        console.log("Error creating Student");
        res.status(400).json(err);
      } else {
        console.log("Student created ", newStudent);
        res.status(201).json(newStudent);
      }
    }
  );
};

module.exports.studentUpdateOne = function (req, res) {
  Student.findById(req.params.studentId).exec(function (err, updatedStudent) {
    const response = { status: 204 };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!updatedStudent) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      console.log(updatedStudent);
      updatedStudent.name = req.body.name;
      updatedStudent.JPA = parseFloat(req.body.JPA);

      updatedStudent.save(function (err, updatedStudent) {
        if (err) {
          response.status = 500;
          response.message = err;
        }
        res.status(response.status).json(updatedStudent);
      });
    }
  });
};

module.exports.studentDeleteOne = function (req, res) {
  console.log(req.params.studentId);
  Student.findByIdAndRemove(req.params.studentId).exec(function (
    err,
    deletedStudent
  ) {
    const response = { status: 204 };
    console.log("DELETE studentId ", req.params.studentId);
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    } else if (!deletedStudent) {
      response.status = 404;
      response.message = { message: "student ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      res.status(response.status).json(deletedStudent);
    }
  });
};
