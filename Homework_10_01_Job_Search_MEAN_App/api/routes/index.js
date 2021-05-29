const express = require("express");
const router = express.Router();

const controllerJob_Opening = require("../controllers/jobs.controller");
const controllerLocation = require("../controllers/locations.controller");

router
  .route("/jobs")
  .get(controllerJob_Opening.jobsGetAll)
  .post(controllerJob_Opening.jobAddOne);

router
  .route("/jobs/:jobId")
  .get(controllerJob_Opening.jobGetOne)
  .put(controllerJob_Opening.jobUpdateOne)
  .delete(controllerJob_Opening.jobDeletOne);

router
  .route("/jobs/:jobId/location")
  .get(controllerLocation.jobGetLocation)
  .post(controllerLocation.jobAddLocation)
  .put(controllerLocation.jobUpdateLocation);

router
  .route("/jobs/:jobId/location/:locationId")
  .delete(controllerLocation.jobDeleteLocation);

module.exports = router;
