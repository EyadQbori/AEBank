<?php
require_once 'database.php';
header("Access-Control-Allow-Origin: *");

$action = "";
$response = array();

$action = $_POST["action"];
if ($action == "add") {
    $name = $_POST["name"];
	$account_number= $_POST["account_number"];
    $balance = $_POST["balance"];
	$userid = $_POST["userid"];
    $res = addBank($name, $account_number,$balance,$userid);
    if ($res > 0) {
        $response["error"] = false;
        $response["message"] = "Account is successfully added";
		$year = date("Y");
		$budgetid=createBudget($year,$userid,$res );
          if ($budgetid > 0) {
			  createBudgetDetail("Food",400,$budgetid );
			  createBudgetDetail("Clothes",300,$budgetid );
			  createBudgetDetail("Shop",300,$budgetid);
			  createBudgetDetail("Travel",300,$budgetid);
			  createBudgetDetail("Health",300,$budgetid);
			  createBudgetDetail("Invoices",300,$budgetid);
			  createBudgetDetail("Renting",300,$budgetid);
			  createBudgetDetail("Gasoline",300,$budgetid);
			  createBudgetDetail("Sport",300,$budgetid);
		  }
    } else {
        $response["error"] = true;
        $response["message"] = "Sorry Account is not added";
    }
}else if ($action == "update") {
    $id = $_POST["id"];
    $name = $_POST["name"];
    $account_number=$_POST["account_number"];
    $balance = $_POST["balance"];
    $res = updateAccount($id,$name, $account_number,$balance);
    if ($res > 0) {
        $response["error"] = false;
        $response["message"] = "Account is successfully apdated";
    } else {
        $response["error"] = true;
        $response["message"] = "Sorry Account is not apdated";
    }
} else if ($action == "read") {
    $id = $_POST["id"];
    $results = readBank($id);
     $response["error"] = false;
    $response["message"] = "Account are successfully read";
   $response["budgets"] = array();
    foreach ($results as $row) {
		$tmp = array();
        $response["id"] = $row["id"];
        $response["name"] = $row["name"];
        $response["account_number"] = $row["account_number"];
		$response["balance"] = $row["balance"];
		$response["userid"] = $row["userid"];
		
        $tmp["detailid"] = $row["detailid"];
		$tmp["budgetname"] = $row["budgetname"];
		$tmp["amount"] = $row["amount"];
		$tmp["budgetid"] = $row["budgetid"];
		 
		array_push($response["budgets"], $tmp);
    }
    
} else if ($action == "delete") {
    $id = $_POST["id"];
    $res = deleteBank($id);

    if ($res > 0) {
        $response["error"] = false;
        $response["message"] = "Account is successfully deleted";
    } else {
        $response["error"] = true;
        $response["message"] = "Sorry Account is not deleted";
    }
} else if ($action == "list") {
	$userid = $_POST["userid"];
    $results = getBankList($userid);
    $response["error"] = false;
    $response["message"] = "Accounts are successfully read";
    $response["banks"] = array();

    foreach ($results as $row) {
        $tmp = array();
        $tmp["id"] = $row["id"];
        $tmp["name"] = $row["name"];
        $tmp["account_number"] = $row["account_number"];
		$tmp["balance"] = $row["balance"];
		$tmp["userid"] = $row["userid"];
        array_push($response["banks"], $tmp);
    }
}
else if ($action == "deletedetail") {
	$detailid = $_POST["detailid"];
  
    $res  = deleteBudgetDetail(  $detailid );
    if ($res > 0) {
        $response["error"] = false;
        $response["message"] = "Budget Detail is successfully deleted";
        
    } else {
        $response["error"] = true;
        $response["message"] = "Sorry Budget Detail is not deleted";
       
    }
}     
else if ($action == "adddetail") {
    $budgetname = $_POST["budgetname"];
	$amount = $_POST["amount"];
	$budgetid = $_POST["bankid"];
  
    $res = addBudgetDetail($budgetname,$amount,$budgetid );
    if ($res > 0) {
        $response["error"] = false;
        $response["message"] = "Budget Detail is successfully added";
    } else {
        $response["error"] = true;
        $response["message"] = "Sorry Budget Detail is not added";
    }
}   

echo json_encode($response);

function  addBank($name, $account_number,$balance,$userid) {
     
        $pdo = Database::connect();
        $sql = 'INSERT INTO bank_accounts (name, account_number,balance,userid ) VALUES (?,?,?,?) ';
        $q = $pdo->prepare($sql);
        $q->execute(array($name, $account_number,$balance,$userid));
        $id = $pdo->lastInsertId();
        Database::disconnect();
    
    return $id;
}
function  readBank($id) {
     
        $pdo = Database::connect();
        $sql = 'SELECT * from bank_accounts  ,budgets_details where bank_accounts.id=budgets_details.budgetid  and bank_accounts.id='.$id;
      $result = $pdo->query($sql);  
        
		 
        Database::disconnect();
    
    return $result;
}
function updateAccount($id,$name, $account_number,$balance) {
   
        $pdo = Database::connect();
        $sql = 'UPDATE   bank_accounts SET name=?, account_number=?,balance=? WHERE id=? ';
        $q = $pdo->prepare($sql);
        $q->execute(array($name, $account_number,$balance,$id));
        $count = $q->rowCount();
        Database::disconnect();
   
    return $count;
}

function deleteBank($id) {
   
        $pdo = Database::connect();
        $sql = 'DELETE FROM   bank_accounts WHERE  (id=?) ';
        $q = $pdo->prepare($sql);
        $q->execute(array($id));
        $count = $q->rowCount();
		
		$sql="DELETE FROM `budgets` WHERE (id=?)";
		$q = $pdo->prepare($sql);
        $q->execute(array($id));
		
		$sql="DELETE FROM `budgets_details` WHERE (budgetid=?)";
		$q = $pdo->prepare($sql);
        $q->execute(array($id));
		
		$sql="DELETE FROM `expenses` WHERE (bankid=?)";
		$q = $pdo->prepare($sql);
        $q->execute(array($id));
        Database::disconnect();
    
    return $count;
}

function getBankList($userid) {
 
        $pdo = Database::connect();
        $sql = 'SELECT * FROM bank_accounts where userid='.$userid.'  ORDER BY  id DESC     ';

        $result = $pdo->query($sql);
      
        Database::disconnect();
    
    return $result;
}


function createBudget($year, $userid,$bankid) {
    $pdo = Database::connect();
    $sql = 'INSERT INTO budgets (id,year,userid ) VALUES (?,?,? ) ';
    $q = $pdo->prepare($sql);
    $q->execute(array( $bankid,$year, $userid ));
    $id = $bankid;
    Database::disconnect();
    return $id;
}
 
function createBudgetDetail($budgetname,$amount,$budgetid ){
    $pdo = Database::connect();
    $sql = 'INSERT INTO budgets_details ( budgetname,amount,budgetid ) VALUES (?,?,?  ) ';
    $q = $pdo->prepare($sql);
    $q->execute(array( $budgetname,$amount,$budgetid ));
    $id = $pdo->lastInsertId();
    Database::disconnect();
	return $id;
}
 
function  deleteBudgetDetail(  $detailid ){
	  
 $count = 0;
    $pdo = Database::connect();
    $sql = 'DELETE from   budgets_details   WHERE  (detailid=?) ';
    $q = $pdo->prepare($sql);
    $q->execute(array( $detailid));
    $count = $q->rowCount();
    Database::disconnect();

    return $count;
     
}

function addBudgetDetail($budgetname,$amount,$budgetid ){
	 $count = 0;

    $pdo = Database::connect();
    $sql = 'INSERT INTO budgets_details (budgetname,amount,budgetid ) VALUES (?,?,?  ) ';
    $q = $pdo->prepare($sql);
    $q->execute(array($budgetname,$amount,$budgetid ));
    $count = $pdo->lastInsertId();
    Database::disconnect();
	return $count;
}  