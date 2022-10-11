
angular.module('BankApp').controller('ReportsController', function ($rootScope, $scope, $http, $state, $timeout, Urls,$filter) {
 
  
 $page=$state.current.name;
  $scope.currentSearchBank =  {id: 0, name: "Select Bank"};
   
  $scope.labels = [];
  $scope.series = [];
  $scope.data = [ ];
    

      $scope.seriess = [];  
	  $scope.labelss = [];
  $scope.datas = [];
 
      $scope.getAllUserExpenses= function () {
		    var data = $.param({
            action: 'userexpenses',
			userid:$scope.user.id
        });
        $http.post(Urls.apiUrl + 'reports.php', data, Urls.config)
                .then(function (result) {
				 	console.log(result.data.expenses);
                    $scope.data=[];
				 $scope.series=[];
				  $scope.labelss = [];
                $scope.datas = [];
					for (var i=0;i<result.data.expenses.length;i++ ){
				 	//$scope.labels.push($scope.expenses[i].expense_month);
					//console.log($scope.expenses[i].name);
				  $scope.data.push( [parseInt(result.data.expenses[i].amount)]);
				 $scope.series.push (result.data.expenses[i].name);
				// console.log($scope.expenses[i].amount);
				$scope.labelss.push(result.data.expenses[i].name);
				$scope.datas.push(result.data.expenses[i].amount) ;
					}
					 console.log($scope.data);
				  console.log($scope.series);
                });
	  }
			 
 $scope.getBankExpenses=function () {
		  var data = $.param({
            action: 'userbankexpenses',
			bankid:$scope.bankid,
			userid:$scope.user.id
        });
		console.log($scope.bankid+" "+ $scope.user.id);
        $http.post(Urls.apiUrl + 'reports.php', data, Urls.config)
                .then(function (result) {
					$scope.data=[];
					$scope.series=[];
					 $scope.labelss = [];
					$scope.datas = [];
				 	console.log(result.data.expenses);
                    
					for (var i=0;i<result.data.expenses.length;i++ ){
				 	//$scope.labels.push($scope.expenses[i].expense_month);
					//console.log($scope.expenses[i].name);
				  $scope.data.push( [parseInt(result.data.expenses[i].amount)]);
				 $scope.series.push (result.data.expenses[i].name);
				// console.log($scope.expenses[i].amount);
				$scope.labelss.push(result.data.expenses[i].name);
				$scope.datas.push(result.data.expenses[i].amount) ;
					}
                });
        
     
    }; 
	  $scope.getBudgetDifference= function () {
		    var data = $.param({
            action: 'budgetdifference',
			userid:$scope.user.id
        });
        $http.post(Urls.apiUrl + 'reports.php', data, Urls.config)
                .then(function (result) {
				 	console.log(result.data.expenses);
                    $scope.data=[];
				 $scope.series=[];
				  $scope.labelss = [];
  $scope.datas = [];
					for (var i=0;i<result.data.expenses.length;i++ ){
				 	//$scope.labels.push($scope.expenses[i].expense_month);
					//console.log($scope.expenses[i].name);
				  $scope.data.push( [parseInt(result.data.expenses[i].difference)]);
				 $scope.series.push (result.data.expenses[i].budgetname);
				// console.log($scope.expenses[i].amount);
				$scope.labelss.push(result.data.expenses[i].budgetname);
				$scope.datas.push(result.data.expenses[i].difference) ;
					}
					 console.log($scope.data);
				  console.log($scope.series);
                });
	  }
	   $scope.getBankBudgetDifference= function () {
		    var data = $.param({
            action: 'budgetbankdifference',
			bankid:$scope.bankid,
			userid:$scope.user.id
        });
        $http.post(Urls.apiUrl + 'reports.php', data, Urls.config)
                .then(function (result) {
				 	console.log(result.data.expenses);
                    $scope.data=[];
				 $scope.series=[];
				  $scope.labelss = [];
  $scope.datas = [];
					for (var i=0;i<result.data.expenses.length;i++ ){
				 	//$scope.labels.push($scope.expenses[i].expense_month);
					//console.log($scope.expenses[i].name);
				  $scope.data.push( [parseInt(result.data.expenses[i].difference)]);
				 $scope.series.push (result.data.expenses[i].budgetname);
				// console.log($scope.expenses[i].amount);
				$scope.labelss.push(result.data.expenses[i].budgetname);
				$scope.datas.push(result.data.expenses[i].difference) ;
					}
					 console.log($scope.data);
				  console.log($scope.series);
                });
	  }
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
	 $scope.$watch('currentSearchBank', function(newVal, oldVal){
		console.log(newVal );
		if(newVal.id==0){
			if($page=="reports") {
				 $scope.getAllUserExpenses ();
			}
		 if($page=="reportsdifference") {
				  $scope.getBudgetDifference ();;
			}
		   return;
	     }
    $scope.bankid=newVal.id;
	console.log("currentBank was changed to:"+newVal.id);
	if(newVal.id >0){
     if($page=="reports") {
				 $scope.getBankExpenses ();
			}
		 if($page=="reportsdifference") {
				  $scope.getBankBudgetDifference ();
			}
	}
  });
  
	
	   
  
  
	$scope.getBanksList ();
	if($page=="reports") {
			$scope.getAllUserExpenses();;
	}
	
	
	$scope.gotoDifferenceReport=function(){
		$state.go("reportsdifference");
	}
	$scope.goBack=function(){
		$state.go("reports");
	}
 
});
