const express = require("express");
const router = express.Router();
const controllerStudents = require("../controllers/students.controller");
const controllerAdress = require("../controllers/adress.controller");

router.route("/students").get(controllerStudents.studentsGetAll);

router.route("/students/:studentId").get(controllerStudents.studentGetOne);

router
  .route("/students/:studentId/addresses")
  .get(controllerAdress.studentGetAllAdresses);

router
  .route("/students/:studentId/addresses/:addresseId")
  .get(controllerAdress.studentGetOneAdresses);

// api/students/1537/addresses
// api/students/1537/addresses/1123
module.exports = router;
