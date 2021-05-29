const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.jobsGetAll = function (req, res) {
  if (req.query && req.query.offset) {
    var offset = parseInt(req.query.offset); // default = 0
  }
  if (req.query && req.query.count) {
    var count = parseInt(req.query.count); // default = 1
  }
  Job.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, jobs) {
      if (err) {
        console.log(err);
        res.status(404).json(err);
      }
      console.log("Found jobs", jobs.length);
      res.json(jobs);
    });
};

module.exports.jobGetOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);

  Job.findById(req.params.jobId).exec(function (err, job) {
    if (err) {
      console.log(err);
      __res(500, err);
      return;
    } else if (!job) {
      console.log("job Id is not found");
      __res(404, err);
      return;
    } else {
      res.status(200).json(job);
    }
  });
};

module.exports.jobAddOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);
  Job.create(
    {
      title: req.body.title,
      salary: req.body.salary,
      description: req.body.description,
      experience: req.body.experience,
      skill: req.body.skill,
      postDate: req.body.postDate,
    },
    function (err, job) {
      if (err) {
        console.log("Error creating job");
        __res(404, err);
      } else {
        console.log("job created", job);
        res.status(201).json(job);
      }
    }
  );
};
module.exports.jobUpdateOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);

  Job.findById(req.params.jobId).exec(function (err, job) {
    if (err) {
      console.log("job cannot be Updated");
      __res(500, err);
      return;
    } else if (!job) {
      console.log("Job Id is not found");
      __res(404, err);
      return;
    }
    if (!Array.isArray(job.skill)) {
      job.skill = [];
    }
    (job.title = req.body.title),
      (job.salary = req.body.salary),
      (job.description = req.body.description),
      (job.experience = req.body.experience),
      (job.skill = req.body.skill),
      (job.postDate = req.body.postDate),
      job.save(function (err, updatedJob) {
        if (err) {
          console.log("Job cannot be Updated");
          __res(500, err);
          return;
        } else {
          console.log("Job updated");
          res.status(204).json(updatedJob);
        }
      });
  });
};

module.exports.jobDeletOne = function (req, res) {
  __res = (status, msg) => res.status(status).json(msg);

  Job.findByIdAndRemove(req.params.jobId).exec(function (err, job) {
    if (err) {
      console.log("Error deleting job");
      __res(500, err);
      return;
    }
    if (!job) {
      console.log("job Id is not found");
      __res(404, err);
    } else {
      console.log("successfully deleted", job);
      res.status(204).json(job);
    }
  });
};
