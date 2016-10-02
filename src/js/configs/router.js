angular
  .module("goodVibes")
  .config(Router);

Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "/js/views/home.html",
  })
  .state("register", {
    url: "/register",
    templateUrl: "/js/views/register.html",
    controller: "registerCtrl as register",
  })
  .state("login", {
    url: "/login",
    templateUrl: "/js/views/login.html",
    controller: "loginCtrl as login",
  })
  .state("usersShow", {
    url: "/users/:userid",
    templateUrl:  "/js/views/users/show.html",
    controller:   "usersShowCtrl as usersShowCtrl",
  })
  .state("myTasks", {
    url: "/mytasks/",
    templateUrl:  "/js/views/users/mytasks.html",
    controller:   "MyTasksCtrl as MyTasksCtrl",
  })
  .state("deedIndex", {
    url: "/deeds",
    templateUrl:  "/js/views/deeds/index.html",
    controller:   "DeedIndexCtrl as DeedIndexCtrl",
  })
  .state("deedNew", {
    url: "/deeds/new/user=:userid",
    templateUrl:  "/js/views/deeds/new.html",
    controller:   "DeedNewCtrl as DeedNewCtrl",
  })
  .state("deedShow", {
    url: "/deeds/:id",
    templateUrl:  "/js/views/deeds/show.html",
    controller:   "DeedShowCtrl as deed",
  })
  .state("deedEdit", {
    url: "/deeds/:id/edit",
    templateUrl:  "/js/views/deeds/edit.html",
    controller:   "DeedEditCtrl as deed",
  });
  $urlRouterProvider.otherwise("/");
}
