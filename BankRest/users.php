<?php
require_once 'database.php';
header("Access-Control-Allow-Origin: *");

$response = array();
$action = $_POST["action"];
if ($action == "register") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $password = $_POST['password'];
    $userid = register($name,  $mobile, $email, $password);
    if ($userid > 0) {
        $response["error"] = false;
        $response["message"] = "User is successfully added";
        $response["userdata"] = array();  
            $tmp = array();
            $tmp["id"] =  $userid;
            $tmp["name"] =  $name;
            $tmp["mobile"] = $mobile;
            $tmp["email"] = $email;
           
            array_push($response["userdata"], $tmp);
         
    } else {
        $response["error"] = true;
        $response["message"] = "Sorry User is not added";
    }
}
else if ($action == "login") {
    $password = $_POST['password'];
    $email = $_POST['email'];
    $res = checkLogin($email, $password);
    if ($res == 0) {
		 
		 
		  $response["error"] = true;
	 	$response["message"] = "Email or Password Wrong";
		   
		 
       
    }  else if ($res == -1) {
$response["error"] = true;
	 	$response["message"] = "Your account is locked";
	}	else if ($res == 1) {
        $results = getUserByEmail($email);
        $response["error"] = false;
        $response["message"] = "Successfully Login";
        $response["userdata"] = array();
 
        foreach ($results as $row) {
            $tmp = array();
            $tmp["id"] = $row["id"];
            $tmp["name"] = $row["name"];
            $tmp["email"] = $row["email"];
            array_push($response["userdata"], $tmp);
        }
 
    }
}  
 
else if ($action == "update") {
    $name = $_POST['name'];
    $mobile = $_POST['mobile'];
    $id = $_POST['id'];
  
    $count=updateUser($name,   $mobile , $id);
    if($count>0) {
    $response["error"] = false;
    $response["message"] = "User is successfully updated";
	}else{
		 $response["error"] = true;
    $response["message"] = "User is not updated";
	}
} 
else if ($action == "changepassword") {
    $password = $_POST['password'];
    $id = $_POST['id'];
    $result = changePassword($password, $id);
    if ($result >0) {
      $response["error"] = false;
        $response["message"] = "PASSWORD CHANGED";
    } else {
        
		$response["error"] = true;
        $response["message"] = "Sorry PASSWORD NOT CHANGED";
    }
}   

echo json_encode($response);

////Functions

function register($name,  $mobile,   $email, $password  ) {
	$password=md5($password);
    $pdo = Database::connect();
    $sql = 'INSERT INTO users (name,mobile,email,password ) VALUES (?,?,?,?) ';
    $q = $pdo->prepare($sql);
    $q->execute(array($name, $mobile, $email, $password));
    $id = $pdo->lastInsertId();
    Database::disconnect();
    return $id;
}
 
function checkLogin($email, $password) {
    $newpassword = md5($password);
    $sql = 'SELECT  * FROM `users` WHERE  email=? AND password=? And attempts<5';
    $pdo = Database::connect();
    $q = $pdo->prepare($sql);
    $q->execute(array($email,$newpassword));
    $result = $q->fetchAll(PDO::FETCH_ASSOC);
    if ($result) {
         return 1; // User password is correct
    } else {
		$attempts=getAttempts($email);
		if($attempts>4){
			return -1;
		}
		incrementAttempts($email,$attempts+1);
		 return 0;// No User with this email
    }
}

function getAttempts($email) {
	$attempts=0;
    $sql = 'SELECT  * FROM `users`  WHERE  email=?';
    $pdo = Database::connect();
    $q = $pdo->prepare($sql);
    $q->execute(array($email));
    $result = $q->fetchAll(PDO::FETCH_ASSOC);
	foreach ($result as $row) {
            $attempts=  $row["attempts"];            
        }
    return $attempts;
}
function incrementAttempts($email,$attempts) {
    $pdo = Database::connect();
    $sql = 'UPDATE   users  SET  attempts=?   WHERE  (email=?) ';
    $q = $pdo->prepare($sql);
    $q->execute(array($attempts, $email));
    $count = $q->rowCount();
    Database::disconnect();
    return $count;
}
function updateUser($name,  $mobile, $id) {
    $pdo = Database::connect();
    $sql = 'UPDATE   users  SET  name=?,mobile=?   WHERE  (id=?) ';
    $q = $pdo->prepare($sql);
    $q->execute(array($name, $mobile, $id));
    $count = $q->rowCount();
    Database::disconnect();
    return $count;
}
 
function changePassword($password, $id) {
    $password = md5($password);
    $sql = ' UPDATE   users  SET   password=?  WHERE  (id=?) ';
    $pdo = Database::connect();
    $q = $pdo->prepare($sql);
    $q->execute(array($password, $id));
    $count = $q->rowCount();
    return $count;
}

function getUserByEmail($email) {
    $sql = 'SELECT  * FROM `users`  WHERE  email=?';
    $pdo = Database::connect();
    $q = $pdo->prepare($sql);
    $q->execute(array($email));
    $result = $q->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

 ?>   