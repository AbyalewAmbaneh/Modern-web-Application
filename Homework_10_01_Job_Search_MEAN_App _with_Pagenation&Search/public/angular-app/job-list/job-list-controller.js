angular.module("meanJobs").controller("JobsController", JobsController);

function JobsController(JobFactory, $route, $location) {
  const vm = this;
  vm.title = "Avaliable Job Opportunities";
  let offset = 0;
  let count = 2;
  var query = $location.search();

  if (query.offset) offset = query.offset;
  if (query.count) count = query.count;

  JobFactory.getAlljobs(offset, count).then(function (response) {
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

  vm.nextPage = function () {
    console.log("am here", offset);
    offset += count;
    JobFactory.getAlljobs(offset, count).then(function (response) {
      vm.jobs = response;
    });
  };

  vm.previousPage = function () {
    if (offset != 0) offset -= 2;
    JobFactory.getAlljobs(offset, count).then(function (response) {
      vm.jobs = response;
    });
  };
}
