<?php 

require __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;


class Response
{
    private $conn;

    private $users_test_table = "users_test_table";
    

    private $admins_table = "admins_table";
    private $users_table = "users_table";
    private $help_requests_table = "help_requests_table";
    private $beneficiaries_table = "beneficiaries_table";
    private $sponsors_table = "sponsors_table";
    private $nominations_table = "nominations_table";
    private $donations_table = "donations_table";
    private $tokens_table = "tokens_table";
    private $bank_codes_table = "bank_codes_table";

    private $subscribe_table_name = "subscribe_table";
    private $password_reset_tokens_table = "password_reset_tokens";
    
    


    private $bene_factors_table = "bene_factors";    
    private $bene_messages_table = "bene_messages";
    private $bene_payments_table = "bene_payments";    
    private $bene_tokens_table = "bene_tokens";
    private $bene_voters_table = "bene_voters";


    // public $username;
    public $password;



    // //used for creation of new entry
    // public $id;
    public $last_modified_by;
    public $username;
    public $firstname;
    public $lastname;
    public $email;
    public $phone_number;
    public $delivery_address; //JSON
    public $orders;
    public $price;
    public $tax_id;
    public $payment_method;
    
    
    // Your secret key used for signing the tokens
    private $secretKey = "your_secret_key_here";


    public function __construct($db)
    {
        $this->conn = $db;
    }

    
    // Function to generate authentication token
    function generateAuthToken() {

    
        // Token expiration time (e.g., 1 hour from now)
        $expirationTime = time() + 2592000;//3600; 60*60*24*30 = 1 month
    
        // JWT payload
        $payload = array(
            "iat" => time(), // Issued at: time when the token was generated
            "exp" => $expirationTime, // Expiration time
            // Add any additional claims here
        );
    
        // Generate the JWT
        $jwt = JWT::encode($payload, $this->secretKey, 'HS256');
    
        return $jwt;
    }

    function validateToken($token) {
        try {
            // Decode the token
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
        
            // Check if the token is expired
            $currentTime = time();
            if ($decoded->exp < $currentTime) {
                // Token has expired
                // echo json_encode(array("status" => false, "message" => "Token expired"));
                return false;
            } else {
                // Token is valid
                // echo json_encode(array("status" => true, "message" => "Token is valid"));
                return true;
            }
        } catch (Exception $e) {
            // Token is invalid or malformed
            // echo json_encode(array("status" => false, "message" => "Invalid token: " . $e->getMessage()));
            return false;
        }
    }

    public function checkIfUserCredentialsIsValid($email, $rawPassword) 
    {
        // Check if the user exists
        $query_check = "SELECT id, access_key FROM " . $this->users_test_table . " WHERE email_address = :email";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email", $email);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // Fetch the user's record
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
            $hashedPassword = $user['access_key'];

            // Verify the password
            if (password_verify($rawPassword, $hashedPassword)) {
                // Password is correct, generate authentication token
                $authToken = $this->generateAuthToken();
                return $authToken;
            } else {
                // Password is incorrect
                return false;
            }
        } else {
            // User does not exist
            return false;
        }
    }
    
    public function checkIfAdminCredentialsIsValid($email, $rawPassword) 
    {
        // Check if the user exists
        $query_check = "SELECT id, access_key FROM " . $this->admins_table . " WHERE email_address = :email";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email", $email);
        $stmt_check->execute();

        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // Fetch the user's record
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
            $hashedPassword = $user['access_key'];

            // Verify the password
            if (password_verify($rawPassword, $hashedPassword)) {
                // Password is correct, generate authentication token
                $authToken = $this->generateAuthToken();
                return $authToken;
            } else {
                // Password is incorrect
                return false;
            }
        } else {
            // User does not exist
            return false;
        }
    }

    public function ReadUser($email)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT
                    p.id,
                    p.fullname,
                    p.email_address,
                    -- p.access_key,
                    p.phone_number,
                    p.kyc_status,
                    p.account_number,
                    p.account_name,
                    p.bank_name,
                    p.gender,
                    p.state_of_residence,
                    p.profile_picture,
                    p.email_verified,
                    p.registration_date,
                    p.user_type,
                    p.eligibility,
                    p.is_cheat,
                    p.opened_welcome_msg
                FROM " . $this->users_test_table . " p  WHERE p.email_address = :email";
            
            // Prepare the statement
            $stmt = $this->conn->prepare($query);
    
            // Bind the email parameter to the prepared statement
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    
            // Execute the statement
            $stmt->execute();
    
            // Fetch the result
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
    

        return $user; // User not found
    
        } catch (Exception $e) {
            // Log the error message and return null for security
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }
    }

    public function ReadAdmin($email)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT
                    p.id,
                    p.fullname,
                    p.email_address,
                    -- p.access_key,
                    p.phone_number,
                    p.kyc_status,
                    p.account_number,
                    p.account_name,
                    p.bank_name,
                    p.gender,
                    p.state_of_residence,
                    p.profile_picture,
                    p.email_verified,
                    p.registration_date,
                    p.user_type,
                    p.eligibility,
                    p.is_cheat,
                    p.opened_welcome_msg
                FROM " . $this->admins_table . " p  WHERE p.email_address = :email";
            
            // Prepare the statement
            $stmt = $this->conn->prepare($query);
    
            // Bind the email parameter to the prepared statement
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    
            // Execute the statement
            $stmt->execute();
    
            // Fetch the result
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
    

        return $user; // User not found
    
        } catch (Exception $e) {
            // Log the error message and return null for security
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }
    }

    public function CreateSubscribe($email)
    {
        $query = "";
        {
            $query = "INSERT INTO " . $this->subscribe_table_name . " SET 
            
            email_address=:email
            ";
        }

        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":email", $email);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    // Function to generate a random password
    function generateRandomPassword($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $password = '';
        $charactersLength = strlen($characters);
        for ($i = 0; $i < $length; $i++) {
            $password .= $characters[rand(0, $charactersLength - 1)];
        }
        return $password;
    }

    function validatePassword($password) {
        $errors = [];
    
        // Check password length (minimum 10 characters)
        if (strlen($password) < 10) {
            $errors[] = "Password must be at least 10 characters long.";
        }
    
        // Check for at least one uppercase letter
        if (!preg_match('/[A-Z]/', $password)) {
            $errors[] = "Password must contain at least one uppercase letter.";
        }
    
        // Check for at least one lowercase letter
        if (!preg_match('/[a-z]/', $password)) {
            $errors[] = "Password must contain at least one lowercase letter.";
        }
    
        // Check for at least one number
        if (!preg_match('/[0-9]/', $password)) {
            $errors[] = "Password must contain at least one number.";
        }
    
        // // Check for at least one special character
        // if (!preg_match('/[\W]/', $password)) {
        //     $errors[] = "Password must contain at least one special character.";
        // }
    
        return empty($errors) ? true : $errors;
    }
    

    //
    public function getTotalUsers() {
        $query = "SELECT COUNT(*) AS count FROM " . $this->users_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }

    public function getTotalHelpRequests() {
        $query = "SELECT COUNT(*) AS count FROM " . $this->help_requests_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }

    public function getTotalBeneficiaries() {
        $query = "SELECT COUNT(*) AS count FROM " . $this->beneficiaries_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }

    public function getTotalSponsors() {
        $query = "SELECT COUNT(*) AS count FROM " . $this->sponsors_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }

    public function getTotalNominations() {
        $query = "SELECT COUNT(*) AS count FROM " . $this->nominations_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }

    public function getTotalIncoming() {

        return 0;
        $query = "SELECT COUNT(*) AS count FROM " . $this->beneficiaries_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }

    public function getTotalOutgoing() {
        $query = "SELECT SUM(amount) AS total_amount FROM " . $this->beneficiaries_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['total_amount'] ?? 0; // Return 0 if null
    }


//ORDER BY p.id ASC";
public function ReadAllHelpRequests()
{
    $query = "SELECT
        p.id,
        p.date,
        p.nomination_count,
        p.description,
        p.remark,
        p.email_address,
        p.request_image,
        p.help_token,
        u.id as user_id,
        u.fullname as user_fullname,
        u.email_address as user_email,
        u.access_key as user_access_key,
        u.phone_number as user_phone,
        u.kyc_status as user_kyc_status,
        u.account_number as user_account_number,
        u.account_name as user_account_name,
        u.bank_name as user_bank_name,
        u.gender as user_gender,
        u.state_of_residence as user_state,
        u.profile_picture as user_profile_picture,
        u.email_verified as user_email_verified,
        u.registration_date as user_registration_date,
        u.user_type as user_type,
        u.eligibility as user_eligibility,
        u.is_cheat as user_is_cheat,
        u.opened_welcome_msg as user_opened_welcome_msg 
        FROM
        " . $this->help_requests_table . " p 
        LEFT JOIN 
            " . $this->users_table . " u ON u.email_address = p.email_address
        
        ORDER BY RAND()";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}


public function ReadAllBeneficiaries()
{
    $query = 
    "SELECT
        p.id,
        p.email_address,
        p.date,
        p.amount,
        p.status,
        p.date_resolved,
        p.nomination_count,
        u.id as user_id,
        u.fullname as user_fullname,
        u.email_address as user_email,
        u.access_key as user_access_key,
        u.phone_number as user_phone,
        u.kyc_status as user_kyc_status,
        u.account_number as user_account_number,
        u.account_name as user_account_name,
        u.bank_name as user_bank_name,
        u.gender as user_gender,
        u.state_of_residence as user_state,
        u.profile_picture as user_profile_picture,
        u.email_verified as user_email_verified,
        u.registration_date as user_registration_date,
        u.user_type as user_type,
        u.eligibility as user_eligibility,
        u.is_cheat as user_is_cheat,
        u.opened_welcome_msg as user_opened_welcome_msg
    FROM
        " . $this->beneficiaries_table . " p 
    LEFT JOIN 
        " . $this->users_table . " u ON u.email_address = p.email_address
    ORDER BY 
        p.date DESC";

    try {
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            throw new Exception("Failed to prepare query: " . $this->conn->error);
        }
        
        if (!$stmt->execute()) {
            throw new Exception("Failed to execute query: " . $stmt->error);
        }
        
        return $stmt;
    } catch (Exception $e) {
        // Log the error
        error_log("Error in ReadAllBeneficiaries: " . $e->getMessage());
        return false;
    }
}

public function ReadAllSponsors()
{
    $query = "SELECT
        p.id,
        p.name,
        p.date,
        p.type,
        p.image
        FROM
        " . $this->sponsors_table . " p 
        
        ORDER BY date DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}


public function ReadAllDonations()
{
    $query = "SELECT
        p.id,
        p.type,
        p.date,
        p.price 
        FROM
        " . $this->donations_table . " p 
        
        ORDER BY id ASC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}





public function updateUserKyc(
    $email, 
    // $fullname, 
    $phoneNumber, 
    $accountNumber,
    $accountName,
    $bankName,
    $gender,
    $residence,
    $kycStatus,
    $eligibility
    ) {


        

    $query = "UPDATE " . $this->users_test_table . " 
              SET 
                
                fullname =:fullname,
                phone_number =:phone_number,
                account_number =:account_number,
                account_name =:account_name,
                bank_name =:bank_name,
                gender =:gender,                
                state_of_residence =:state_of_residence,
                kyc_status =:kyc_status, 
                eligibility =:eligibility

              WHERE email_address = :email";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":email", $email);

    $stmt->bindParam(":fullname", $accountName);
    $stmt->bindParam(":phone_number", $phoneNumber);
    $stmt->bindParam(":account_number", $accountNumber);
    $stmt->bindParam(":account_name", $accountName);
    $stmt->bindParam(":bank_name", $bankName);
    $stmt->bindParam(":gender", $gender);
    $stmt->bindParam(":state_of_residence", $residence);

    $stmt->bindParam(":kyc_status", $kycStatus);
    $stmt->bindParam(":eligibility", $eligibility);

    // Execute query and return the result
    if ($stmt->execute()) {
        return true;
    }

    // Optionally, log the error or handle it appropriately
    // error_log("Failed to update customer details: " . implode(":", $stmt->errorInfo()));

    return false;
}

public function updateUserRemark(
    $email, 
    $remark
    ) {


        

    $query = "UPDATE " . $this->help_requests_table . " 
              SET 
              
                remark =:remark 

              WHERE email_address = :email";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":email", $email);

    $stmt->bindParam(":remark", $remark);

    // Execute query and return the result
    if ($stmt->execute()) {
        return true;
    }

    // Optionally, log the error or handle it appropriately
    // error_log("Failed to update customer details: " . implode(":", $stmt->errorInfo()));

    return false;
}


public function updateSelfiImagePath(
    $email, 
    $targetFilePath
    ) {


        

    $query = "UPDATE " . $this->users_test_table . " 
              SET 
              
                profile_picture =:profile_picture 

              WHERE email_address = :email";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":email", $email);

    $stmt->bindParam(":profile_picture", $targetFilePath);

    // Execute query and return the result
    if ($stmt->execute()) {
        return true;
    }

    // Optionally, log the error or handle it appropriately
    // error_log("Failed to update customer details: " . implode(":", $stmt->errorInfo()));

    return false;
}

public function updateUserKycSpecific(
    $email, 
    // $fullname, 
    // $phoneNumber, 
    // $accountNumber,
    // $accountName,
    // $bankName,
    // $gender,
    // $residence,
    $kycStatus
    ) {


        

    $query = "UPDATE " . $this->users_table . " 
              SET 
                
                kyc_status =:kyc_status 

              WHERE email_address = :email";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":email", $email);

    // $stmt->bindParam(":fullname", $fullname);
    // $stmt->bindParam(":phone_number", $phoneNumber);
    // $stmt->bindParam(":account_number", $accountNumber);
    // $stmt->bindParam(":account_name", $accountName);
    // $stmt->bindParam(":bank_name", $bankName);
    // $stmt->bindParam(":gender", $gender);
    // $stmt->bindParam(":state_of_residence", $residence);

    $stmt->bindParam(":kyc_status", $kycStatus);

    // Execute query and return the result
    if ($stmt->execute()) {
        return true;
    }

    // Optionally, log the error or handle it appropriately
    // error_log("Failed to update customer details: " . implode(":", $stmt->errorInfo()));

    return false;
}


public function ReadAllUsers()
{
    try {
        // Prepare the SQL query using a prepared statement
        $query = "SELECT
                p.id,
                p.fullname,
                p.email_address,
                -- p.access_key,
                p.phone_number,
                p.kyc_status,
                p.account_number,
                p.account_name,
                p.bank_name,
                p.gender,
                p.state_of_residence,
                p.profile_picture,
                p.email_verified,
                p.registration_date,
                p.user_type,
                p.eligibility,
                p.is_cheat,
                p.opened_welcome_msg
            FROM " . $this->users_table . " p  ";
        
        // Prepare the statement
        $stmt = $this->conn->prepare($query);

        // Bind the email parameter to the prepared statement
        // $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        // Execute the statement
        $stmt->execute();

        return $stmt;


    return $user; // User not found

    } catch (Exception $e) {
        // Log the error message and return null for security
        // error_log("Error reading user: " . $e->getMessage());
        return null;
    }
}

public function checkIfUserExists($email) 
    {
        // Check if the user already exists
        $query_check = "SELECT id FROM " . $this->users_test_table . " WHERE email_address = :email";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email", $email);
        $stmt_check->execute();
    
        // If the row count is greater than 0, it means the user exists
        if ($stmt_check->rowCount() > 0) {
            // User already exists
            return true;
        } else {
            // User does not exist
            return false;
        }
    }
    public function createUser($email, $password)
    {
        // $customer_id = strval(time());
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO " . $this->users_test_table . " SET             
            
            email_address=:email,
            access_key=:access_key
            ";
    
        // prepare query
        $stmt = $this->conn->prepare($query);    
        
        
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":access_key", $hashed_password);

        
        // execute query
        if ($stmt->execute()) {
            // User inserted successfully, generate authentication token
            $authToken = $this->generateAuthToken();
    
            // Return the generated authentication token
            return $authToken;
        }
    
        return false; // User creation failed
    }
    public function InsertEmailTokenForUser($email, $randomToken)
    {
        // $customer_id = strval(time());

        $query = "INSERT INTO " . $this->tokens_table . " SET             
            
            token_for=:token_for,
            email_token=:email_token
            ";
    
        // prepare query
        $stmt = $this->conn->prepare($query);    
        
        
        $stmt->bindParam(":token_for", $email);
        $stmt->bindParam(":email_token", $randomToken);

        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
    
        return false; // User creation failed
    }

public function checkIfEmailCodeIsValid($email, $verificationCode) 
{
    // Get the most recent token for this email
    $query = "SELECT email_token 
              FROM " . $this->tokens_table . " 
              WHERE token_for = :email 
              ORDER BY date DESC 
              LIMIT 1";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Compare the tokens directly (case-sensitive exact match)
        if ($tokenData['email_token'] === $verificationCode) {
            // Token is valid - you may want to delete it here to prevent reuse
            // $this->deleteToken($email, $verificationCode);


            $yes = "Yes";
            // Token is valid - update verification status
            $query = "UPDATE " . $this->users_test_table . " 
                      SET email_verified = :email_verified
                      WHERE email_address = :email";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":email_verified", $yes);

            if ($stmt->execute()) {
                return true;
            }
        }
    }
    
    return false;
}

// Optional helper function to delete used tokens
private function deleteToken($email, $token)
{
    $query = "DELETE FROM " . $this->tokens_table . " 
              WHERE token_for = :email AND email_token = :token";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":token", $token);
    return $stmt->execute();
}
    
    

public function ReadAllBankCodes()
{
    $query = "SELECT
        p.id,
        p.bank_name,
        p.bank_code
        FROM
        " . $this->bank_codes_table . " p 
        
        ORDER BY id ASC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}


public function getEmailVerificationCode($email)
{
    $query = "SELECT email_token 
              FROM " . $this->tokens_table . " 
              WHERE token_for = :email 
              ORDER BY date DESC 
              LIMIT 1";
    
    // Prepare the statement
    $stmt = $this->conn->prepare($query);

    // Bind the email parameter to the prepared statement
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);

    // Execute the statement
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::PARAM_STR);

    // Return just the token string or null if not found
    return $result ? $result['email_token'] : null;
}














 // // // password reset // //
public function InsertPasswordResetTokenForUser($email, $token) {
    $query = "REPLACE INTO " . $this->password_reset_tokens_table . " SET email_address = :email_address, token = :token";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    $stmt->bindParam(":token", $token);
    return $stmt->execute();
}

public function VerifyPasswordResetEmailToken($email, $token) {
    $query = "SELECT token FROM " . $this->password_reset_tokens_table . " WHERE email_address = :email_address LIMIT 1";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row && $row['token'] === $token;
}

public function DeletePasswordResetEmailToken($email) {
    $query = "DELETE FROM " . $this->password_reset_tokens_table . " WHERE email_address = :email_address";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    return $stmt->execute();
}

public function UpdatePasswordResetUserPassword($email, $newPassword) {
    $hashed = password_hash($newPassword, PASSWORD_DEFAULT);
    $query = "UPDATE " . $this->users_test_table . " SET access_key = :access_key WHERE email_address = :email_address";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    $stmt->bindParam(":access_key", $hashed);
    return $stmt->execute();
}
 // // // password reset // //

//
}
?>