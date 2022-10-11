
angular.module('BankApp').controller('ExpensesController', function ($rootScope, $scope, $http, $state, $timeout, Urls,$filter) {
 
// `id`, `name`, `amount`, `detailid`, `userid`, `expensedate`
$scope.expense = {} ;
$scope.expense.id=0;
$scope.expense.amount=0;
$scope.expense.name="";
$scope.expense.detailid=0;
$scope.expense.bankid=0;
$scope.expense.userid=$rootScope.user.id;
$scope.expenses = [] ;
 $scope.banks =[];
 $scope.currentBank=0;
 $scope.bankexpenses = [] ;
 $scope.currentExpense=0;
 
 
$scope.currentSearchBank =  {id: 0, name: "Select Bank"};
    /************************************************************************/
     
	   
    $scope.getList = function () {
		console.log("here "+$scope.user.id);
		if(isNaN($rootScope.user.id)){
			$state.go("login");
		}
        var data = $.param({
            action: 'list',
			userid:$scope.user.id
        });
        $http.post(Urls.apiUrl + 'expenses.php', data, Urls.config)
                .then(function (result) {
				//	console.log(result.data.expenses);
                    $scope.expenses = result.data.expenses;
                });
    }; 
	//$scope.getList ();
  
 //////////////////////////////////////////
   
     $scope.doBack = function () {
		 $state.go("expenses");
	 };
 
 
 $scope.getBanksList = function () {
		console.log("rootScope "+$rootScope.user.id);
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
					$scope.banks .unshift(  $scope.currentSearchBank);
					 
                });
    }; 
	$scope.getBanksList ();
$scope.getExpensesList = function () {
		 //	console.log( "$scope.currentBank "+ $scope.currentBank.id);
		//	console.log( "$scope.user.id "+ $scope.user.id);
		if(isNaN($rootScope.user.id)){
			$state.go("login");
		}
        var data = $.param({
            action: 'expenseslist',
			bankid:$scope.currentBank.id,
			userid:$scope.user.id
        });
        $http.post(Urls.apiUrl + 'expenses.php', data, Urls.config)
                .then(function (result) {
					//console.log( result.data);
                    $scope.bankexpenses = result.data.bankexpenses;
					//console.log($scope.bankexpenses);
                });
    }; 
	
	$scope.$watch('currentBank', function(newVal, oldVal){
    //console.log("currentBank was changed to:"+newVal);
	if(newVal.id==0){
		$scope.getList ();
		return;
	}
	$scope.expense.bankid=newVal.id;
    $scope.getExpensesList();
  });
  $scope.$watch('currentExpense', function(newVal, oldVal){
   // console.log("currentExpense was changed to:"+newVal.detailid);
	$scope.expense.name=newVal.budgetname;
	$scope.expense.id=newVal.detailid;
     
  });
    $scope.$watch('currentSearchBank', function(newVal, oldVal){
		console.log(newVal );
		if(newVal.id==0){
		$scope.getList ();
		return;
	}
    $scope.bankid=newVal.id;
	console.log("currentBank was changed to:"+newVal.id);
	 $scope.searchBank ();
     
  });
    
	
	 $scope.searchBank = function () {
		  console.log( "$scope.currentBank here  "+ $scope.bankid);
		 console.log( "$scope.user.id "+ $scope.user.id);
		if(isNaN($rootScope.user.id)){
			$state.go("login");
		}
	 
      var data = $.param({
            action: 'searchexpenseslist',
			bankid:$scope.bankid,
			userid:$scope.user.id
        });
        $http.post(Urls.apiUrl + 'expenses.php', data, Urls.config)
                .then(function (result) {
				//	console.log(result.data.expenses);
                    $scope.expenses = result.data.expenses;
                });
        
        $http.post(Urls.apiUrl + 'expenses.php', data, Urls.config)
                .then(function (result) {
					//console.log( result.data);
                    $scope.bankexpenses = result.data.bankexpenses;
					//console.log($scope.bankexpenses);
                });
    }; 
	
 
 
});
