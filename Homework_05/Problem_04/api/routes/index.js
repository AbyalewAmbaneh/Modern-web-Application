const express = require("express");
const router = express.Router();
const controllerStudents = require("../controllers/students.controller");
const controllerAdress = require("../controllers/adress.controller");

router
  .route("/students")
  .get(controllerStudents.studentsGetAll)
  .post(controllerStudents.addStudent);

router
  .route("/students/:studentId")
  .get(controllerStudents.studentGetOne)
  .put(controllerStudents.studentUpdateOne)
  .delete(controllerStudents.studentDeleteOne);

router
  .route("/students/:studentId/addresses")
  .get(controllerAdress.studentGetAllAddresses)
  .post(controllerAdress.studentAddAddress);

router
  .route("/students/:studentId/addresses/:addressId")
  .get(controllerAdress.studentGetOneAddress)
  .put(controllerAdress.studentUpdateAddress)
  .delete(controllerAdress.studentDeleteAdress); // Delete Adress

module.exports = router;
