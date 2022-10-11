<?php
header("Access-Control-Allow-Origin: *");
require_once 'database.php';

$name = "";
$response = array();
$results = 0;

$action = $_POST["action"];
if ($action == "userbankexpenses") {
    $year = date("Y");
    $userid = $_POST['userid'];
	$bankid = $_POST['bankid'];
    $results =userbankexpenses(  $userid,$bankid,$year) ;
     
        $response["error"] = false;
        $response["message"] = "expense is successfully fetched";
		$response["expenses"] = array();
       foreach ($results as $row) {
		    $tmp = array();
        
        $tmp["name"] = $row["name"];
        $tmp["amount"] = $row["amount"];
		 
		 
        array_push($response["expenses"], $tmp);
          
    }
     
} else if ($action == "userexpenses") {
  
   $year = date("Y");
    $userid = $_POST['userid'];
    $results = userexpenses($userid, $year );
     $response["expenses"] = array();
       foreach ($results as $row) {
		    $tmp = array();
        
        $tmp["name"] = $row["name"];
        $tmp["amount"] = $row["amount"];
        array_push($response["expenses"], $tmp);
          
    }
}
else if ($action == "budgetdifference") {
  
    $year = date("Y");
    $userid = $_POST['userid'];
    $results = budgetdifference($userid, $year );
     $response["expenses"] = array();
       foreach ($results as $row) {
		$tmp = array();
        $tmp["detailid"] = $row["detailid"];
        $tmp["budgetname"] = $row["budgetname"];
        $tmp["planned"] = $row["planned"];
		$tmp["actual"] = $row["actual"];
		$tmp["difference"] = $row["difference"]; 
        array_push($response["expenses"], $tmp);
          
    }
} 
else if ($action == "budgetbankdifference") {
  
    $year = date("Y");
	$bankid = $_POST['bankid'];
    $userid = $_POST['userid'];
    $results = budgetbankdifference($userid,  $bankid,$year );
     $response["expenses"] = array();
       foreach ($results as $row) {
		$tmp = array();
        $tmp["detailid"] = $row["detailid"];
        $tmp["budgetname"] = $row["budgetname"];
        $tmp["planned"] = $row["planned"];
		$tmp["actual"] = $row["actual"];
		$tmp["difference"] = $row["difference"]; 
        array_push($response["expenses"], $tmp);
          
    }
}  
  
echo json_encode($response);
 
 
     
function userbankexpenses($userid,$bankid,$year) {
    $pdo = Database::connect();
	$sql ="SELECT  sum(expenses.amount) as amount ,expenses.name FROM expenses  where userid=".$userid." and year(expenses.expensedate)=".$year.". and expenses.bankid=".$bankid."	GROUP BY expenses.name";
    
    $q = $pdo->prepare($sql);
    $result = $pdo->query($sql);
    Database::disconnect();
    return $result;
} 
function userexpenses($userid, $year) {
    $pdo = Database::connect();
	$sql ="SELECT  sum(expenses.amount) as amount ,expenses.name FROM expenses  where userid=".$userid." and year(expenses.expensedate)=".$year."	GROUP BY expenses.name";
    
    $q = $pdo->prepare($sql);
    $result = $pdo->query($sql);
    Database::disconnect();
    return $result;
} 
 
function budgetdifference($userid,$year ){
	$pdo = Database::connect();
	$sql =" SELECT budgets_details.detailid, budgets_details.budgetname, sum(budgets_details.amount) as planned, budgets_details.budgetid,
	sum(expenses.amount) as actual, sum(budgets_details.amount)- sum(expenses.amount) as difference
	FROM `budgets_details`
	INNER JOIN expenses ON budgets_details.detailid = expenses.detailid
	where  expenses.userid=".$userid." and year(expenses.expensedate)=".$year."
	group by  budgets_details.detailid, budgets_details.budgetname,  budgets_details.budgetid";
    
    $q = $pdo->prepare($sql);
    $result = $pdo->query($sql);
    Database::disconnect();
    return $result;
}
 
function budgetbankdifference($userid,$bankid, $year ){
	$pdo = Database::connect();
	$sql =" SELECT budgets_details.detailid, budgets_details.budgetname, sum(budgets_details.amount) as planned, budgets_details.budgetid,
	sum(expenses.amount) as actual, sum(budgets_details.amount)- sum(expenses.amount) as difference
	FROM `budgets_details`
	INNER JOIN expenses ON budgets_details.detailid = expenses.detailid
	where bankid=".$bankid." and expenses.userid=".$userid." and year(expenses.expensedate)=".$year."
	group by  budgets_details.detailid, budgets_details.budgetname,  budgets_details.budgetid";
    
    $q = $pdo->prepare($sql);
    $result = $pdo->query($sql);
    Database::disconnect();
    return $result;
}
 