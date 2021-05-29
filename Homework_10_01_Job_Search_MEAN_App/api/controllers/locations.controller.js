const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.jobGetLocation = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Job.findById(req.params.jobId)
    .select("location")
    .exec(function (err, job) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!job) {
        __res(404, "Job is not found");
        return;
      } else {
        res.status(200).json(job.location);
      }
    });
};
module.exports.jobAddLocation = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Job.findById(req.params.jobId)
    .select("location")
    .exec(function (err, job) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!job) {
        __res(400, "job id not found");
        return;
      } else {
        job.location = {};
        job.location.address = req.body.address;

        job.save(function (err, location) {
          if (err) {
            __res(500, err);
            return;
          } else {
            console.log("Successfully added", location);
            res.status(204).json(location);
          }
        });
      }
    });
};

module.exports.jobUpdateLocation = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });
  Job.findById(req.params.jobId)
    .select("location")
    .exec(function (err, job) {
      if (err) {
        __res(500, err);
        return;
      }
      if (!job) {
        __res(400, "Job id not found");
        return;
      } else {
        job.location.address = req.body.address;
        job.save(function (err, location) {
          if (err) {
            __res(500, err);
            return;
          } else {
            console.log("Successfully updated", location);
            res.status(204).json(location);
          }
        });
      }
    });
};

module.exports.jobDeleteLocation = function (req, res) {
  __res = (status, msg) => res.status(status).send({ message: msg });

  Job.findById(req.params.jobId)
    .select("location")
    .exec(function (err, job) {
      job.location.remove();
      if (err) {
        __res(500, err);
        return;
      }

      if (!job) {
        __res(400, "job id not found");
        return;
      }

      job.save(function (err, updatedjob) {
        if (err) {
          __res(500, err);
          return;
        }
        console.log("successfully deleted", updatedjob);
        res.status(204).json(updatedjob);
      });
    });
};
