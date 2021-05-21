const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentGetAllAdresses = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("Address")
    .exec(function (err, student) {
      res.status(200).json(student.Address);
    });
};

module.exports.studentGetOneAdresses = function (req, res) {
  const studentId = req.params.studentId;
  const adressId = req.params.addresseId;

  Student.findById(studentId)
    .select("Adress")
    .exec(function (err, student) {
      const Address = student.Address.id(adressId);
      res.status(200).json(Address);
    });
};
