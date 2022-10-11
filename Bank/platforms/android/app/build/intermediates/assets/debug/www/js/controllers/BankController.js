
angular.module('BankApp').controller('BankController', function ($rootScope, $scope, $http, $state, $timeout, Urls) {
 
    
$scope.bank = {} ;
$scope.bank.id=0;
$scope.bank.account_number="";
$scope.bank.name="Select Bank";
$scope.bank.amount=0;

 

$scope.budgets = [] ; 
$scope.budget={};
$scope.budget.name="";
$scope.budget.amount=0;
$scope.budget.id=0;
$scope.budget.bankid=0;
$scope.names = [ "Saudi National Bank", "The Saudi British Bank", "Saudi Investment Bank","Alinma bank" ,"Banque Saudi Fransi","Riyad Bank",
"Al Rajhi Bank","Arab National Bank","Bank AlBilad","Bank AlJazira","Gulf International Bank "];
 print($scope.names);
 $scope.names .unshift( $scope.bank.name);
    /************************************************************************/
    $scope.addBank = function () {
 
      
		console.log("addBank");
        
         if ($scope.bank.name  === "Select Bank"   ) {
            alert("You  must select bank  name");
            return;
        }
       
         if ($scope.bank.account_number.trim() == "" || $scope.bank.account_number.length !== 10) {
             alert("You must enter your bank account number");
            return;
        }
        if ($scope.bank.balance.trim() == "" ||   $scope.bank.balance <0) {
             alert("You must valid balance");
            return ;
        }

 
        var data = $.param({
            action: "add",
            name: $scope.bank.name,
            account_number: $scope.bank.account_number,
            balance: $scope.bank.balance,
			userid:$scope.user.id,
            
        });
        $http.post(Urls.apiUrl + 'banks.php', data, Urls.config)
                .then(function (result) {
                    //  console.log("results ");
                      console.log(result);
                    if (result.data.error == false) {
                         alert(result.data.message);
						 $scope.getList ();
						 $scope.bank.name = "";						 
						 $scope.bank.balance = "";
                         $scope.bank.account_number = "";
                    } else {
                        alert(result.data.message);
                    }

                }, function (error) {
                    console.log("error ");
                    console.log(error);
                });
    };
    /************************************************************************/
	 $scope.editBank = function () {
 
      
		console.log("editBank");
        
         if ($scope.bank.name.trim() === "") {
            alert("You  must enter bank  name");
            return;
        }
       
         if ($scope.bank.account_number.trim() == "" || $scope.bank.account_number.length !== 10) {
             alert("You must enter your bank account number");
            return;
        }
        if ($scope.bank.balance.trim() == "" ||   $scope.bank.balance <0) {
             alert("You must valid balance");
            return ;
        }
       var id = $state.params.id;
 console.log("id "+id);
        var data = $.param({
            action: "update",
			id:  id ,
            name: $scope.bank.name,
            account_number: $scope.bank.account_number,
            balance: $scope.bank.balance,
			userid:$scope.user.id,
            
        });
        $http.post(Urls.apiUrl + 'banks.php', data, Urls.config)
                .then(function (result) {
                    //  console.log("results ");
                      console.log(result);
                    if (result.data.error == false) {
                         alert(result.data.message);
						
						$state.go("banks");
                    } else {
                        alert(result.data.message);
                    }

                }, function (error) {
                    console.log("error ");
                    console.log(error);
                });
    };
	 
	////////////////////////////////////////////////////////////
    $scope.delete = function (index) {
		
		
		if (confirm("Do you want to delete this account?") == false) {
			return;
		}  
        $scope.bank = $scope.banks[index];
        var data = $.param({
            action: 'delete',
            id: $scope.bank.id
        });
        $http.post(Urls.apiUrl + 'banks.php', data, Urls.config)
                .then(function (result) {
                    if (result.data.error == false) {
                        $scope.banks.splice(index, 1);
                    } else {
                        alert("Error happened");
                    }
                });

    };
    $scope.getList = function () {
		//console.log("here "+$rootScope.user.id);
		if(isNaN($rootScope.user.id)){
			$state.go("login");
		}
        var data = $.param({
            action: 'list',
			userid:$scope.user.id
        });
        $http.post(Urls.apiUrl + 'banks.php', data, Urls.config)
                .then(function (result) {
					console.log(result.data.banks);
                    $scope.banks = result.data.banks;
                });
    }; 
	$scope.getList ();
	
 $scope.getDetails = function () {
	  var id = $state.params.id;
 
 
 var data = $.param({
            action: 'read',
            id: id
        });
        $http.post(Urls.apiUrl + 'banks.php', data, Urls.config)
                .then(function (result) {
                    if (result.data.error == false) {
						console.log( result.data);
                        
						 $scope.bank.id = result.data.id;
						$scope.bank.name =result.data.name;
						$scope.bank.account_number =result.data.account_number;
						$scope.bank.balance =result.data.balance;
						 $scope.bank.userid =result.data.userid;
						 $scope.budgets=result.data.budgets;
						 if(data.budgets && data.budgets.length>0)
						 $scope.budget.id=$scope.budgets[0].budgetid;
                    } else {
                        alert("Error happened");
                    }
                });
 };
      if ( $state.current.name == "editbank") {
		  $scope.getDetails();
 // alert($state.current.name);
       
       
	 }
 //////////////////////////////////////////
   
   ////////////////////////////////////////////////////////////
$scope.deleteDetail = function (index) {
			 
		
if (confirm("Do you want to delete this detail?") == false) {
    return;
}  
        $scope.budget = $scope.budgets[index];
		console.log($scope.budget.detailid);
        var data = $.param({
            action: 'deletedetail',
            detailid: $scope.budget.detailid
        });
        $http.post(Urls.apiUrl + 'banks.php', data, Urls.config)
                .then(function (result) {
                    if (result.data.error == false) {
                        $scope.budgets.splice(index, 1);
                    } else {
                        alert("Error happened");
                    }
                });

    };
   ////////////////////////////////////////////////////////////
     $scope.doBack = function () {
		 $state.go("banks");
	 };
    $scope.addDetail = function () {
		if( $scope.budget.name=="" ){
			alert("Name is required");
			return;
		}
		if( $scope.budget .amount<=0){
			alert("Amount must be greater than zero");
			return;
		}
		$scope.budget.bankid=$scope.bank.id;
        console.log($scope.budget );
        var data = $.param({
            action: 'adddetail',
			budgetname : $scope.budget.name,
	 amount :$scope.budget .amount,
	 budgetid : $scope.budget.id,
	 bankid :$scope.budget.bankid
             
        });
		console.log(data);
         $http.post(Urls.apiUrl + 'banks.php', data, Urls.config)
                .then(function (result) {
                    if (result.data.error == false) {
                        $scope.getDetails();
                    } else {
                        alert("Error happened");
                    }
                });
				 

    };
 
});
