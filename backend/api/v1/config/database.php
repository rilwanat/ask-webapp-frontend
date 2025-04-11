<?php
class Database{
 
    private $host = "127.0.0.1";
    private $db_name = "askfimzp_playground";
    private $username = "askfimzp"; 
    private $password = "@5Kpassword";
    public $conn;
 
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            // Enable PDO exceptions for error handling
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Set character set
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            // Log the error instead of echoing directly
            error_log("Connection error: " . $exception->getMessage());
            // Redirect to an error page or show a generic error message
            // header("Location: error.php");
            // exit;
        }
 
        return $this->conn;
    }
}
?>