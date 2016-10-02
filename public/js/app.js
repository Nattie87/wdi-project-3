"use strict";angular.module("goodVibes",["ui.router","ngResource",//library that helps us decode the jwt to work out what the user name is
"angular-jwt"]);
"use strict";angular.module("goodVibes").constant("API",window.location.origin+"/api");
"use strict";angular.module("goodVibes").factory("AuthInterceptor",AuthInterceptor);AuthInterceptor.$inject=["API","TokenService"];function AuthInterceptor(API,TokenService){return{request:function request(config){var token=TokenService.getToken();if(config.url.indexOf(API)===0&&token){config.headers.Authorization="Bearer "+token;}return config;},response:function response(res){if(res.config.url.indexOf(API)===0&&res.data.token){TokenService.setToken(res.data.token);}return res;}};}
"use strict";angular.module("goodVibes").service("CurrentUserService",CurrentUserService);CurrentUserService.$inject=["$rootScope","TokenService"];function CurrentUserService($rootScope,TokenService){//will save the user to this service
var currentUser=TokenService.decodeToken();return{user:currentUser,saveUser:function saveUser(user){currentUser=user;$rootScope.$broadcast("loggedIn");},getUser:function getUser(){return currentUser;},clearUser:function clearUser(){currentUser=null;TokenService.clearToken();$rootScope.$broadcast("loggedOut");}};}
"use strict";angular.module("goodVibes").factory("Deed",deedFactory);deedFactory.$inject=["$resource","API"];function deedFactory($resource,API){return $resource(API+"/deeds/:id",{id:'@_id'},{'get':{method:'GET'},'save':{method:'POST'},'remove':{method:'DELETE'},'delete':{method:'DELETE'},'query':{method:'GET',isArray:false},'update':{method:'PUT'},'query_for_user':{method:'GET',url:API+"/users/:id/deeds",params:{id:'@_id'}}});}
"use strict";angular.module("goodVibes").controller("DeedEditCtrl",DeedEditCtrl);DeedEditCtrl.$inject=["Deed","$stateParams","$state"];function DeedEditCtrl(Deed,$stateParams,$state){var vm=this;Deed.get($stateParams,function(data){vm.Deed=data.Deed;});vm.submit=function(){Deed.update($stateParams,{Deed:vm.Deed}).$promise.then(function(data){$state.go("deedShow",$stateParams);});};}
"use strict";angular.module("goodVibes").controller("homeCtrl",homeCtrl);homeCtrl.$inject=["$window","CurrentUserService"];function homeCtrl($window,CurrentUserService){setTimeout(function(){if(CurrentUserService.getUser()&&!$window.localStorage.getItem("firstVisit")){$('#myModal').modal('show');$window.localStorage.setItem("firstVisit",true);}},1000);}
//this controller is getting the data from the backend
// angular
//   .module("goodVibes")
//   .controller("usersIndexCtrl", usersIndexCtrl);
//
// usersIndexCtrl.$inject = ["User"];
// function usersIndexCtrl(User){
//   const vm   = this;
//   User.query(data => {
//     vm.users = data.users;
//   });
// }
"use strict";
"use strict";angular.module("goodVibes").controller("DeedIndexCtrl",DeedIndexCtrl);DeedIndexCtrl.$inject=["Deed","$stateParams"];function DeedIndexCtrl(Deed,$stateParams){var vm=this;Deed.query($stateParams).$promise.then(function(data){vm.deeds=data.deeds;});}
"use strict";//do this because we want to affect the httpProvider
angular.module("goodVibes")//config has to be used because it is loaded right at the start
.config(setUpInterceptor);setUpInterceptor.$inject=["$httpProvider"];function setUpInterceptor($httpProvider){return $httpProvider.interceptors.push("AuthInterceptor");}
"use strict";angular.module("goodVibes").controller("loginCtrl",loginCtrl);loginCtrl.$inject=["User","CurrentUserService","$window","$state"];function loginCtrl(User,CurrentUserService,$window,$state){var vm=this;//this will send an http request to the backend and will look at req.body.email and req.body.password
vm.login=function(){//pass the whole user in
//not expecting req.body.user
//user is built from html form
User.login(vm.user).$promise.then(function(data){var user=data.user?data.user:null;if(user){user.id=user._id;CurrentUserService.saveUser(user);$state.go("home");}console.log("login controller",data);});};}
"use strict";angular.module("goodVibes").controller("mainCtrl",mainCtrl);mainCtrl.$inject=["$rootScope","CurrentUserService","$state","$stateParams"];function mainCtrl($rootScope,CurrentUserService,$state,$stateParams){var vm=this;vm.user=CurrentUserService.getUser();vm.logout=function(){event.preventDefault();CurrentUserService.clearUser();};$rootScope.$on("loggedIn",function(){vm.user=CurrentUserService.getUser();console.log("logged in",vm.user);// $state.go("usersIndex");
});$rootScope.$on("loggedOut",function(){vm.user=null;$state.go("home");});}
"use strict";angular.module("goodVibes").controller("MyTasksCtrl",MyTasksCtrl);MyTasksCtrl.$inject=["Deed","CurrentUserService"];function MyTasksCtrl(Deed,CurrentUserService){var vm=this;vm.user=CurrentUserService.getUser();console.log(vm.user);Deed.query_for_user({id:vm.user.id}).$promise.then(function(data){vm.deeds=data.deeds;});}
"use strict";angular.module("goodVibes").controller("DeedNewCtrl",DeedNewCtrl);DeedNewCtrl.$inject=["Deed","$state","CurrentUserService"];function DeedNewCtrl(Deed,$state,CurrentUserService){var vm=this;vm.user=CurrentUserService.getUser();// Must be wrapped in a function so that it is not invoked immediately
// $save is an instance method
vm.submit=function(){vm.deed.userid=vm.user.id;console.log("DeedNewCtrl.deed",vm.deed);Deed.save({deed:vm.deed}).$promise.then(function(data){$state.go("myTasks");});};}
"use strict";angular.module("goodVibes").controller("registerCtrl",registerCtrl);registerCtrl.$inject=["User","CurrentUserService"];function registerCtrl(User,CurrentUserService){//vm is controller
var vm=this;vm.register=function(){// need user key because in backend its req.body.user, so need to specify a key
//post with key of user and value being model on the form
User.register({user:vm.user}).$promise.then(function(data){var user=data.user?data.user:null;if(user){CurrentUserService.saveUser(user);}});};}
"use strict";angular.module("goodVibes").config(Router);Router.$inject=["$stateProvider","$locationProvider","$urlRouterProvider"];function Router($stateProvider,$locationProvider,$urlRouterProvider){$locationProvider.html5Mode(true);$stateProvider.state("home",{url:"/",templateUrl:"/js/views/home.html",controller:"homeCtrl as home"}).state("register",{url:"/register",templateUrl:"/js/views/register.html",controller:"registerCtrl as register"}).state("login",{url:"/login",templateUrl:"/js/views/login.html",controller:"loginCtrl as login"}).state("usersShow",{url:"/users/:id",templateUrl:"/js/views/users/show.html",controller:"usersShowCtrl as usersShowCtrl"}).state("myTasks",{url:"/mytasks/",templateUrl:"/js/views/users/mytasks.html",controller:"MyTasksCtrl as MyTasksCtrl"}).state("deedIndex",{url:"/deeds",templateUrl:"/js/views/deeds/index.html",controller:"DeedIndexCtrl as DeedIndexCtrl"}).state("deedNew",{url:"/deeds/new/",templateUrl:"/js/views/deeds/new.html",controller:"DeedNewCtrl as DeedNewCtrl"}).state("deedShow",{url:"/deeds/:id",templateUrl:"/js/views/deeds/show.html",controller:"DeedShowCtrl as deed"}).state("deedEdit",{url:"/deeds/:id/edit",templateUrl:"/js/views/deeds/edit.html",controller:"DeedEditCtrl as deed"});$urlRouterProvider.otherwise("/");}
"use strict";angular.module("goodVibes").controller("DeedShowCtrl",DeedShowCtrl);DeedShowCtrl.$inject=["Deed","$stateParams","$state"];function DeedShowCtrl(Deed,$stateParams,$state){var vm=this;Deed.get($stateParams,function(data){vm.deed=data.deed;});vm.deedDelete=function(){Deed.delete($stateParams).$promise.then(function(data){$state.go("deedIndex");});};}
"use strict";angular.module("goodVibes").controller("usersShowCtrl",usersShowCtrl);usersShowCtrl.$inject=["User","Deed","$stateParams","$state"];function usersShowCtrl(User,Deed,$stateParams,$state){var vm=this;User.get($stateParams,function(data){vm.user=data.user;});Deed.query_for_user($stateParams).$promise.then(function(data){vm.deeds=data.deeds;}).catch(console.log);}
"use strict";angular.module("goodVibes").service("TokenService",TokenService);//service is like an actual constructor function
//when injected it's newed, instantiated as new
TokenService.$inject=["$window","jwtHelper"];function TokenService($window,jwtHelper){var self=this;self.setToken=setToken;self.getToken=getToken;self.decodeToken=decodeToken;self.clearToken=clearToken;function setToken(token){return $window.localStorage.setItem("auth-token",token);}function getToken(){return $window.localStorage.getItem("auth-token");}function decodeToken(){var token=self.getToken();return token?jwtHelper.decodeToken(token):null;}function clearToken(){return $window.localStorage.removeItem("auth-token");}}
"use strict";angular.module("goodVibes").factory("User",userFactory);userFactory.$inject=["API","$resource"];function userFactory(API,$resource){return $resource(API+"/users/:id",{id:"@_id"},{'query':{method:"GET",isArray:false},//just adding another custom method to user factory and this case give it specific url
//these will overwrite url in resource on top
'register':{method:"POST",url:API+"/register"},'login':{method:"POST",url:API+"/login"}});}