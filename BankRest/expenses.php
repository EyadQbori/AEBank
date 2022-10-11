<?php
header("Access-Control-Allow-Origin: *");
require_once 'database.php';

$name = "";
$response = array();
$res = 0;
$action = $_POST["action"];
if ($action == "add") {
    $name = $_POST['name'];
	$amount = $_POST['amount'];
	$detailid = $_POST['detailid'];
    $userid = $_POST['userid'];
	$bankid = $_POST['bankid'];
    $res =create($name,$amount , $detailid , $userid,$bankid) ;
    if ($res > 0) {
        $response["error"] = false;
        $response["message"] = "expense is successfully added";
       
    } else {
        $response["error"] = true;
        $response["message"] = "Sorry expense is not added";
        
    }
}  
   
 else if ($action == "delete") {
    $id = $_POST["id"];
    $results = deleteExpense($id);
    $response["error"] = false;
    $response["message"] = "Expense is successfully deleted";
     
}  
   if ($action == "list") {
	$userid = $_POST["userid"];
    $results = expensesList( $userid );
	$response["error"] = false;
    $response["message"] = "expenses is successfully added";
	$response["expenses"] = array();

    foreach ($results as $row) {
        $tmp = array();
        $tmp["id"] = $row["id"];
        $tmp["name"] = $row["name"];
        $tmp["amount"] = $row["amount"];
		$tmp["detailid"] = $row["detailid"];
		$tmp["userid"] = $row["userid"];
		$tmp["bankid"] = $row["bankid"];
		$tmp["bankname"] = $row["bankname"];
 
		$tmp["expense_month"] =$row["expense_month"];
	 
        array_push($response["expenses"], $tmp);
    }
    
	
} 
else if ($action == "expenseslist") {
	$userid = $_POST["userid"];
    $bankid = $_POST["bankid"];
    $year = date("Y");
    $results = expensesBankList( $userid,$bankid,$year);
	$response["error"] = false;
    $response["message"] = "expenses is successfully read $userid,$bankid  ";
	$response["bankexpenses"] = array();

    foreach ($results as $row) {
		 
        $tmp = array();
		 
		$tmp["detailid"] = $row["detailid"];
        $tmp["budgetname"] = $row["budgetname"];
        array_push($response["bankexpenses"], $tmp);
		
		  
    }
    
	
} 
else if ($action == "searchexpenseslist") {
	$userid = $_POST["userid"];
    $bankid = $_POST["bankid"];
    $year = date("Y");
    $results = searchExpensesBankList( $userid,$bankid,$year);
 
 $response["error"] = false;
    $response["message"] = "expenses is successfully added";
	$response["expenses"] = array();

    foreach ($results as $row) {
        $tmp = array();
        $tmp["id"] = $row["id"];
        $tmp["name"] = $row["name"];
        $tmp["amount"] = $row["amount"];
		$tmp["detailid"] = $row["detailid"];
		$tmp["userid"] = $row["userid"];
		$tmp["bankid"] = $row["bankid"];
		$tmp["bankname"] = $row["bankname"];
        array_push($response["expenses"], $tmp);
    }
    
	
}              
echo json_encode($response);

function create($name,$amount , $detailid , $userid,$bankid) {
    $count = 0;

    $pdo = Database::connect();
    $sql = 'INSERT INTO expenses (name,amount , detailid , userid ,bankid) VALUES (?,?,?,?,? ) ';
    $q = $pdo->prepare($sql);
    $q->execute(array($name,$amount , $detailid , $userid,$bankid ));
    $count = $pdo->lastInsertId();
    Database::disconnect();

    return $count;
}

  
function expensesList($userid) {

    $pdo = Database::connect();
    $sql = ' SELECT expenses.id, expenses.name ,  MONTH(expenses.expensedate) AS  expense_month,expenses.amount , expenses.detailid , expenses.userid , `expensedate`, `bankid` ,bank_accounts.name as bankname  FROM `expenses` ,   bank_accounts
     WHERE expenses.bankid= bank_accounts.id AND expenses.userid='. $userid;
    
    $q = $pdo->prepare($sql);
    $result = $pdo->query($sql);
    Database::disconnect();
    return $result;
}
     
function expensesBankList($userid,$bankid,$year) {
    $pdo = Database::connect();
  $sql = 'SELECT budgets_details.budgetname,budgets_details.detailid FROM  budgets_details  inner join budgets  on budgets_details.budgetid=budgets.id   where  budgets.id='.$bankid.' AND userid='. $userid.' and year='.$year;
 
    
    
    $q = $pdo->prepare($sql);
    $result = $pdo->query($sql);
    Database::disconnect();
    return $result;
} 

function searchExpensesBankList($userid,$bankid,$year) {
    $pdo = Database::connect();
	$sql='SELECT expenses.id, expenses.name , expenses.amount , expenses.detailid , expenses.userid , `expensedate`, `bankid` ,bank_accounts.name as bankname  FROM `expenses` ,   bank_accounts
     WHERE expenses.bankid= bank_accounts.id AND expenses.userid='.$userid.' AND expenses.bankid='.$bankid.' AND  YEAR(expensedate)='.$year;
    $q = $pdo->prepare($sql);
    $result = $pdo->query($sql);
    Database::disconnect();
    return $result;
} 
function deleteExpense($id) {
   
    $pdo = Database::connect();
    $sql = 'DELETE FROM   expenses WHERE  (id=?) ';
    $q = $pdo->prepare($sql);
    $q->execute(array($id));
    $count = $q->rowCount();
     
    Database::disconnect();

return $count;
}
 
