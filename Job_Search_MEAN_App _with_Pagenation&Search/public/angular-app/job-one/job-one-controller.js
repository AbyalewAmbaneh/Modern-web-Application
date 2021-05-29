angular.module("meanJobs").controller("JobController", JobController);

function JobController(JobFactory, $routeParams, $location) {
  const vm = this;
  let jobId = $routeParams.id;
  vm.IsHidden = true;
  JobFactory.getOneJob(jobId).then(function (response) {
    vm.jobs = response;
  });

  vm.show_hide = function () {
    console.log(vm.IsHidden);
    vm.IsHidden = vm.IsHidden ? false : true;
  };

  vm.replaceOneJob = function () {
    const updatedJob = {
      title: vm.newJob.title,
      salary: vm.newJob.salary,
      description: vm.newJob.description,
      experience: vm.newJob.experience,
      postDate: vm.newJob.postDate,
      skill: vm.newJob.skill,
    };

    JobFactory.replaceOneJob(jobId, updatedJob)
      .then(function (response) {
        console.log("Job Modified", response);
        $route.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  vm.RemoveOneJob = function () {
    JobFactory.removeOneJob(jobId)
      .then(function (response) {
        console.log("Job removed", response);
        $location.path("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
