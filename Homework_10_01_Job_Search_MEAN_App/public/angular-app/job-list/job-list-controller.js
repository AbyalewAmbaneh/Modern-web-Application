angular.module("meanJobs").controller("JobsController", JobsController);

function JobsController(JobFactory, $route) {
  const vm = this;
  vm.title = "Avaliable Job Opportunities";

  JobFactory.getAlljobs().then(function (response) {
    vm.jobs = response;
  });

  vm.addOneJob = function () {
    const newJob = {
      title: vm.newJob.title,
      salary: vm.newJob.salary,
      description: vm.newJob.description,
      experience: vm.newJob.experience,
      postDate: vm.newJob.postDate,
      skill: [vm.newJob.skill], // since it's an array
    };
    if (vm.jobForm.$valid) {
      console.log(newJob.title);
      JobFactory.addOneJob(newJob)
        .then(function (response) {
          console.log("Job Saved", response);
          $route.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
