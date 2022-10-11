<?php

class Database {
 
    private static $dbName = 'banks';
    private static $dbHost = 'localhost';
    private static $dbUsername = 'root';
    private static $dbUserPassword = '';
  
    
    private static $cont = null;
 

    public static function connect() {
        // One connection through whole application
        if (null == self::$cont) {
            try {
                self::$cont = new PDO("mysql:host=" . self::$dbHost . ";" . "dbname=" . self::$dbName . ";"
                        . "charset=utf8", self::$dbUsername, self::$dbUserPassword);
            } catch (PDOException $e) {
                echo($e->getMessage());
            }
        }
        return self::$cont;
    }

    public static function disconnect() {
        self::$cont = null;
    }

     
}

?>