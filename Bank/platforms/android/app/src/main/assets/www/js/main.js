/* BankApp */
var BankApp = angular.module("BankApp", ["ui.router",'chart.js'])
var config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
}

 
var url = "http://localhost/bankrest/";
 
BankApp.constant('domain', 'http://localhost/bankrest/');

BankApp.service('Urls', function (domain) {
    this.apiUrl = domain;
    this.config = config;
})
 
/* Setup App Main Controller */
BankApp.controller('AppController', function ($state,$scope, $rootScope, $window, $http, Urls, $timeout) {

$rootScope.Id = 5;
   
    //Global functions
    $rootScope.authenticate = function ( ) {
        if ($rootScope.user.id === 0) {
            $state.go("login");
        }
    }
    $rootScope.showLoader = function () {

        document.getElementById('overlay').style.height = "100%";
        //    document.getElementById('overlay').style.display = 'block';
    };
    $rootScope.hideLoader = function () {
        document.getElementById('overlay').style.height = '0%';
        //  document.getElementById('overlay').style.display = 'none';
    };
 
    $rootScope.storeUser = function () {

        $window.localStorage.setItem('BankAppMail', $rootScope.user.email);
		$window.localStorage.setItem('BankAppId', $rootScope.user.id);
		$window.localStorage.setItem('BankAppName', $rootScope.user.name); 
		

    };
    $rootScope.getUser = function () {

        var email = $window.localStorage.getItem('BankAppMail');
        var id = $window.localStorage.getItem('BankAppId');
		var name = $window.localStorage.getItem('BankAppName');
        if (email !== ""  ) {
            $rootScope.user.email = email;
            $rootScope.user.id = parseInt(id);
			 $rootScope.user.name = name;
        }

    };
 
 $rootScope.logout = function () {
        $rootScope.user.id = 0;
		 $window.localStorage.removeItem('BankAppMail', "");
		 $window.localStorage.removeItem('BankAppId', "");
		 $window.localStorage.removeItem('BankAppName', "");
        $state.go("login");
    };

     

    $rootScope.validateEmail = function (email) {
        if (email == null || email == "" || email == "undefined") {
            return false;
        }
        // http://stackoverflow.com/a/46181/11236
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
	$rootScope.getUser ();

});

/* SideBar  Controller */
BankApp.controller('SideBarController', function ($scope) {


});

/* About Controller */
BankApp.controller('AboutController', function ($scope) {


});
/* Contact Controller */
BankApp.controller('ContactController', function ($scope ) {

 
        
});
 
BankApp.controller('HomeController', function ($scope,$rootScope,$http,$state,Urls) {
$scope.goToBanks=function(){
		$state.go("banks");
	}
 
 
$scope.goToExpenses=function(){
		$state.go("expenses");
	}
 $scope.goToReports=function(){
		$state.go("reports");
	}
});
/* Setup Rounting For All Pages */
BankApp.config(function ($stateProvider, $urlRouterProvider) {

    // Redirect any unmatched url
    
    $stateProvider.state('home', {
        url: "/home",
        templateUrl: "views/home.html",
        controller: "HomeController"
    }) .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "UserController"
    }).state('register', {
        url: "/register",
        templateUrl: "views/register.html",
        controller: "UserController"
    }).state("changepassword", {
        url: "/changepassword",
        templateUrl: "views/changepassword.html",
        controller: "UserController",

    }).state('about', {
        url: "/about",
        templateUrl: "views/about.html",
        controller: "AboutController"
    }).state('contact', {
        url: "/contact",
        templateUrl: "views/contact.html",
		
        controller: "ContactController"
    }) .state('banks', {
        url: "/banks",
        templateUrl: "views/banks.html",
        controller: "BankController"
    }).state('editbank', {
        url: "/editbank/:id",
        templateUrl: "views/editbank.html",
        controller: "BankController"
    })  .state('expenses', {
        url: "/expenses",
        templateUrl: "views/expenses.html",
        controller: "ExpensesController"
    }).state('expensesadd', {
        url: "/expensesadd",
        templateUrl: "views/expensesadd.html",
        controller: "ExpensesController"
    }).state('reports', {
        url: "/reports",
        templateUrl: "views/reports.html",
        controller: "ReportsController"
    }).state('reportsdifference', {
        url: "/reportsdifference",
        templateUrl: "views/reportsdifference.html",
        controller: "ReportsController"
    })
$urlRouterProvider.otherwise("/home"); 	
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

    }
 
}
);

/* Init global settings and run the app */
BankApp.run(function ($rootScope) {

    $rootScope.user = {};
    $rootScope.user.name = "";
    $rootScope.user.email = "";
    $rootScope.user.password = "";
    $rootScope.user.id = 0;
    $rootScope.user.mobile = "";
 


});
  