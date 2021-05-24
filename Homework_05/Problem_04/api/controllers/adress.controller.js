const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentGetAllAddresses = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("Address")
    .exec(function (err, student) {
      res.status(200).json(student.Address);
    });
};

module.exports.studentGetOneAddress = function (req, res) {
  const studentId = req.params.studentId;
  const addressId = req.params.addresseId;

  Student.findById(studentId)
    .select("Address")
    .exec(function (err, student) {
      const Address = student.Address.id(addressId);
      res.status(200).json(Address);
    });
};

module.exports.studentAddAddress = function (req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .select("Address")
    .exec(function (err, student) {
      const response = { status: 204 };
      if (err) {
        console.log("Error finding student");
        response.status = 500;
        response.message = err;
      } else if (!student) {
        response.status = 404;
        response.message = { message: "student ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        if (!Array.isArray(student.address)) {
          student.address = [];
        }
        const addressname = req.body.name;
        student.Address.push({ name: addressname });
        student.save(function (err, student) {
          console.log("Successfully added", student);
          res.status(204).json(student);
        });
      }
    });
};

module.exports.studentUpdateAddress = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Student.updateOne(
    { _id: req.params.studentId, "Address._id": req.params.addressId },
    {
      $set: {
        "Address.$.name": req.body.name,
      },
    },
    function (err, Student) {
      if (err) {
        __res(500, err);
        return;
      }
      console.log("student", Student);
      res.status(204).json(Student);
    }
  );
};

module.exports.studentDeleteAdress = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Student.findById(req.params.studentId)
    .select("Address")
    .exec(function (err, Student) {
      Student.Address.id(req.params.addressId).remove();

      if (err) {
        __res(500, err);
        return;
      }

      if (!Student) {
        __res(400, "address id not found");
        return;
      }

      Student.save(function (err, Student) {
        if (err) {
          __res(500, err);
          return;
        }
        console.log("successfully deleted", Student);
        res.status(204).json(Student);
      });
    });
};
