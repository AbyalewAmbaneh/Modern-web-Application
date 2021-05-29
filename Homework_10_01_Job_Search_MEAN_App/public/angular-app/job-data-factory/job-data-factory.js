angular.module("meanJobs").factory("JobFactory", JobFactory);

function JobFactory($http) {
  return {
    getAlljobs: getAlljobs,
    getOneJob: getOneJob,
    addOneJob: addOneJob,
    replaceOneJob: replaceOneJob,
    removeOneJob: removeOneJob,
  };

  function getAlljobs() {
    return $http.get("/api/jobs").then(complete).catch(failed);
  }

  function getOneJob(id) {
    //let gameId = $routeParams.id;
    return $http
      .get("/api/jobs/" + id)
      .then(complete)
      .catch(failed);
  }

  function addOneJob(job) {
    return $http.post("/api/jobs", job).then(complete).catch(failed);
  }

  function replaceOneJob(jobId, job) {
    return $http
      .put("api/jobs/" + jobId, job)
      .then(complete)
      .catch(failed);
  }

  function removeOneJob(jobId) {
    return $http
      .delete("api/jobs/" + jobId)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response.data;
  }
  function failed(error) {
    return error.statusText;
  }
}
