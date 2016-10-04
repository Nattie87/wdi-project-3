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
    controller: "homeCtrl as home"
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
    url: "/users/:id",
    templateUrl:  "/js/views/users/show.html",
    controller:   "usersShowCtrl as usersShowCtrl",
  })
  .state('usersEdit', {
    url: "/users/:id/edit",
    templateUrl: "/js/views/users/edit.html",
    controller: "usersEditCtrl as usersEditCtrl"
  })
  .state("myDeeds", {
    url: "/my-deeds",
    templateUrl:  "/js/views/deeds/my-deeds.html",
    controller:   "MyDeedsCtrl as MyDeedsCtrl",
  })
  .state("deedIndex", {
    url: "/deeds",
    templateUrl:  "/js/views/deeds/index.html",
    controller:   "DeedIndexCtrl as DeedIndexCtrl",
  })
  .state("deedNew", {
    url: "/deeds/new/",
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
  })
  .state("requestsIndex", {
    url: "/requests",
    templateUrl:  "/js/views/requests/index.html",
    controller:   "RequestsIndexCtrl as request",
  })
  .state("requestsShow", {
    url: "/requests/:id",
    templateUrl:  "/js/views/requests/show.html",
    controller:   "RequestsShowCtrl as RequestsShowCtrl",
  });

  $urlRouterProvider.otherwise("/");
}
