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
  .state("usersIndex", {
    url: "/users",
    templateUrl:  "/js/views/users/index.html",
    controller:   "usersIndexCtrl as usersIndex",
  })
  .state("usersShow", {
    url: "/users/:id",
    templateUrl:  "/js/views/users/show.html",
    controller:   "usersShowCtrl as userShow",
  })
  .state("deedIndex", {
    url: "/deeds",
    templateUrl:  "/js/views/deeds/index.html",
    controller:   "DeedIndexCtrl as deed",
  })
  .state("deedNew", {
    url: "/deeds/new",
    templateUrl:  "/js/views/deeds/new.html",
    controller:   "DeedNewCtrl as deed",
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
