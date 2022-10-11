
angular.module('BankApp').controller('UserController', function ($rootScope, $scope, $http, $state, $timeout, Urls) {
 	
    $rootScope.user.name = "";
    $rootScope.user.email = "";
    $rootScope.user.password = "";
    $rootScope.user.id = 0;
    $rootScope.user.mobile = "";
	$scope.user = $rootScope.user ;  
    /************************************************************************/
    $scope.register = function () {
         
         if ($scope.user.name == null ||  $scope.user.name.trim() === "") {
            alert("You  must Enter your  name");
            return;
        }
       
         if ($scope.user.mobile.trim() == "" || $scope.user.mobile.length !== 12) {
             alert("You must Enter your mobile number");
            return;
        }
        if ($scope.user.password.trim() == "" || $scope.user.password.length < 6 || $scope.user.password.length > 20) {
             alert("You must Enter password");
            return ;
        }
 $rootScope.showLoader();
 
        var data = $.param({
            action: "register",
            name: $scope.user.name,
            mobile: $scope.user.mobile,
            email: $scope.user.email,
            password:$scope.user.password,
            
        });
        $http.post(Urls.apiUrl + 'users.php', data, Urls.config)
                .then(function (result) {
                      console.log(result);
                    if (result.data.error == false) {
                        $rootScope.user.name = result.data.userdata.name;
                      
                        $rootScope.user.email = result.data.userdata.email;
                        $rootScope.user.id = result.data.userdata.userid;
                         $rootScope.hideLoader();
                        $state.go("home");
                    } else {
                        alert(result.data.message);
						  $rootScope.hideLoader();
                    }

                }, function (error) {
                    console.log("error "+ error);
                   $rootScope.hideLoader();
                });
    };
    /************************************************************************/
   
    $scope.login = function () {
        $rootScope.showLoader();
 	        var data = $.param({
            action: "login",
            email: $rootScope.user.email.trim(),
            password: $rootScope.user.password.trim()
        });
        
        $http.post(Urls.apiUrl + 'users.php', data, Urls.config)
                .then(function (result) {
                      console.log(result);
                    if (result.data.error == false || result.data.error == 'false') {
                        $rootScope.user = result.data.userdata[0];
                        $rootScope.hideLoader();
					 $rootScope.storeUser();
                         $state.go("home");
                      }else {
                        alert(result.data.message);
                    }
                    $rootScope.hideLoader();
                }
				, function (error) {
                    console.log("error "+ error);
                   $rootScope.hideLoader();
                });
    };
    
   
   
    
    
    /******************************************************************/
   
     
    
    $scope.validateLogin = function ( ) {
        if (!$rootScope.validateEmail($rootScope.user.email)) {
            return false;
        }
        if ($rootScope.user.password == "undefined" || $rootScope.user.password == "" || $rootScope.user.password == null) {
            return false;
        }
        if ($rootScope.user.password.length < 6 || $rootScope.user.password.length > 20) {
            return false;
        }
        return true;
    };
     $scope.change = function () {
 console.log($rootScope.user.id);
 if($rootScope.user.id==undefined || isNaN($rootScope.user.id)){
	 $state.go("home");
 }
        var data = $.param({
            action: "changepassword",
            id:$rootScope.user.id ,
            password: $rootScope.user.password
        });


        $http.post(Urls.apiUrl + 'users.php', data, Urls.config)
                .then(function (result) {
                    console.log(result);
                    if (result.data.error == false) {
                        
                        alert("Password Changed");
                        $state.go("home");
                    } else {
                        alert("Erorr happened");
                    }


                });
    };
    /***************************************************************************/
$scope.validateChangePassword = function ( ) {

        if ($rootScope.user.password == "" || $rootScope.user.password.length < 4 || $rootScope.user.password.length > 20) {
            return false;
        }
        if ($rootScope.user.password != $rootScope.user.repassword) {
            return false;
        }
        return true;
    };
    

 
 
    $rootScope.getUser();//get user from local store if stored already
     

});
