<?php 

require __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;


class Response
{
    private $conn;
    

    private $admins_table = "admins_table";
    private $users_table = "users_table";
    private $help_requests_table = "help_requests_table";
    private $beneficiaries_table = "beneficiaries_table";
    private $sponsors_table = "sponsors_table";
    private $nominations_history_table = "nominations_history_table";
    private $donations_table = "donations_table";
    private $tokens_table = "tokens_table";
    private $bank_codes_table = "bank_codes_table";
    private $crypto_info_table = "crypto_info_table";

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
        $query_check = "SELECT id, access_key FROM " . $this->users_table . " WHERE email_address = :email";
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
                    p.voter_consistency,
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
                    p.opened_welcome_msg,
                    p.vote_weight 
                FROM " . $this->users_table . " p  WHERE p.email_address = :email";
            
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
        $query = "SELECT COUNT(*) AS count FROM " . $this->nominations_history_table;
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
        u.opened_welcome_msg as user_opened_welcome_msg, 
        u.vote_weight as user_vote_weight 
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
        u.opened_welcome_msg as user_opened_welcome_msg,
        u.vote_weight as user_vote_weight 
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


        

    $query = "UPDATE " . $this->users_table . " 
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


        

    $query = "UPDATE " . $this->users_table . " 
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
                p.opened_welcome_msg,
                p.vote_weight 
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
        $query_check = "SELECT id FROM " . $this->users_table . " WHERE email_address = :email";
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

        $query = "INSERT INTO " . $this->users_table . " SET             
            
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
            $query = "UPDATE " . $this->users_table . " 
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

public function CreateHelpRequest($email, $fullname, $description, $requestImage, $helpToken)
{
    $query = "INSERT INTO " . $this->help_requests_table . " SET 
        email_address = :email,
        fullname_for_comparison = :fullname_for_comparison,
        description = :description,
        request_image = :request_image,
        help_token = :help_token";

    // prepare query
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":fullname_for_comparison", $fullname);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":request_image", $requestImage);
    $stmt->bindParam(":help_token", $helpToken);

    // execute query
    if ($stmt->execute()) {
        // return newly inserted ID
        $insertedId = $this->conn->lastInsertId();
        return [
            "success" => true,
            "id" => $insertedId
        ];
    }

    return [
        "success" => false,
        "message" => "Unable to create help request."
    ];
}


    public function UpdateHelpRequest($email, $description, $helpToken)
    {
        $query = "";
        {
            $query = "UPDATE " . $this->help_requests_table . " SET 
            
            description=:description
            WHERE email_address = :email AND help_token = :help_token
            ";
        }
        

        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":help_token", $helpToken);

        $stmt->bindParam(":description", $description);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }




    public function checkIfUserCanPostHelpRequest($email) 
    {
        // Step 1: Check user details
        $query_check = "SELECT * FROM " . $this->users_table . " WHERE email_address = :email";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email", $email);
        $stmt_check->execute();
    
        if ($stmt_check->rowCount() > 0) {
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);

            // Store fullname in variable
            $fullname = $user['fullname'];
    
            // Step 2: Validate user credentials
            if ($user['is_cheat'] !== 'No') {
                return ["status" => false, "message" => "User is flagged for cheating."];
            }
    
            if ($user['email_verified'] !== 'Yes') {
                return ["status" => false, "message" => "Email address is not verified."];
            }
    
            if ($user['eligibility'] !== 'Yes') {
                return ["status" => false, "message" => $fullname . " you are not eligible to proceed."];
            }
    
            if (strtoupper($user['kyc_status']) !== 'APPROVED') {
                return ["status" => false, "message" => $fullname . " your KYC is not approved."];
            }
    
            if (empty($user['bank_name']) || empty($user['account_name']) || empty($user['account_number'])) {
                return ["status" => false, "message" => "Bank details are incomplete."];
            }
    
            // Step 3: Check if a recent beneficiary record exists (within 12 months)
            $query_beneficiary = "SELECT date FROM " . $this->beneficiaries_table . " WHERE fullname_for_comparison = :fullname_for_comparison ORDER BY date DESC LIMIT 1";
            $stmt_beneficiary = $this->conn->prepare($query_beneficiary);
            $stmt_beneficiary->bindParam(":fullname_for_comparison", $fullname);
            $stmt_beneficiary->execute();
    
            if ($stmt_beneficiary->rowCount() > 0) {
                $beneficiary = $stmt_beneficiary->fetch(PDO::FETCH_ASSOC);
                $lastDate = new DateTime($beneficiary['date']);
                $now = new DateTime();
                $interval = $now->diff($lastDate);
    
                // if ($interval->y < 1) {
                //     return ["status" => false, "message" => "You can only request help again after 12 months."];
                // }

                // Calculate total months difference
                $totalMonths = ($interval->y * 12) + $interval->m;
    
                if ($totalMonths < 12) {
                    $elapsedMonths = $totalMonths;
                    $remainingMonths = 12 - $elapsedMonths;
        
                    return [
                        "status" => false, 
                        "message" => sprintf(
                            "Your request was granted %d month(s) ago. You can request again in %d month(s).",
                            $elapsedMonths,
                            $remainingMonths
                        )
                    ];
            }
            }
    
            // Step 4: Ensure user hasn't already submitted a help request
            $query_help_requests = "SELECT id FROM " . $this->help_requests_table . " WHERE fullname_for_comparison = :fullname_for_comparison LIMIT 1";
            $stmt_help_requests = $this->conn->prepare($query_help_requests);
            $stmt_help_requests->bindParam(":fullname_for_comparison", $fullname);
            $stmt_help_requests->execute();
    
            if ($stmt_help_requests->rowCount() > 0) {
                return ["status" => false, "message" => "Hmm, it seems you have already submitted a previous help request this week."];
            }
    
            // All checks passed
            return ["status" => true, "message" => "All user checks passed.", "user_id" => $user['id']];
        } else {
            return ["status" => false, "message" => "User does not exist."];
        }
    }
    

    public function ReadMyHelpRequest($email)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT 
                    p.id,
                    p.date,
                    p.nomination_count,
                    p.description,
                    p.remark,
                    p.email_address,
                    p.request_image,
                    p.help_token 
                FROM " . $this->help_requests_table . " p  WHERE p.email_address = :email";
            
            // Prepare the statement
            $stmt = $this->conn->prepare($query);
    
            // Bind the email parameter to the prepared statement
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    
            // Execute the statement
            $stmt->execute();
    
            // Fetch the result
            $request = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($request === false) {
                return null; // No record found
            }

        return $request; // User not found
    
        } catch (Exception $e) {
            // Log the error message and return null for security
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }

    }
    
    public function checkIfUserCanUpdateHelpRequest($email) 
    {
        // Step 1: Check user details
        $query_check = "SELECT * FROM " . $this->users_table . " WHERE email_address = :email";
        $stmt_check = $this->conn->prepare($query_check);
        $stmt_check->bindParam(":email", $email);
        $stmt_check->execute();
    
        if ($stmt_check->rowCount() > 0) {
            $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
    
            // Step 2: Validate user credentials
            if ($user['is_cheat'] !== 'No') {
                return ["status" => false, "message" => "User is flagged for cheating."];
            }
    
            if ($user['email_verified'] !== 'Yes') {
                return ["status" => false, "message" => "Email address is not verified."];
            }
    
            if ($user['eligibility'] !== 'Yes') {
                return ["status" => false, "message" => "User is not eligible to proceed."];
            }
    
            if (strtoupper($user['kyc_status']) !== 'APPROVED') {
                return ["status" => false, "message" => "KYC is not approved."];
            }
    
            if (empty($user['bank_name']) || empty($user['account_name']) || empty($user['account_number'])) {
                return ["status" => false, "message" => "Bank details are incomplete."];
            }
    
            
    
            // All checks passed
            return ["status" => true, "message" => "All user checks passed.", "user_id" => $user['id']];
        } else {
            return ["status" => false, "message" => "User does not exist."];
        }
    }

    public function ReadSingleHelpRequest($helpToken)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT 
                    p.id,
                    p.date,
                    p.nomination_count,
                    p.description,
                    p.remark,
                    p.fullname_for_comparison,
                    p.email_address,
                    p.request_image,
                    p.help_token 
                FROM " . $this->help_requests_table . " p  WHERE p.help_token = :help_token";
            
            // Prepare the statement
            $stmt = $this->conn->prepare($query);
    
            // Bind the email parameter to the prepared statement
            $stmt->bindParam(':help_token', $helpToken, PDO::PARAM_STR);
    
            // Execute the statement
            $stmt->execute();
    
            // Fetch the result
            $request = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($request === false) {
                return null; // No record found
            }

        return $request; // User not found
    
        } catch (Exception $e) {
            // Log the error message and return null for security
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }

    }

    public function checkIfUserCanNominate($email, $help_token, $fingerPrint) 
{
    // Step 1: Check user details
    $query_check = "SELECT * FROM " . $this->users_table . " WHERE email_address = :email";
    $stmt_check = $this->conn->prepare($query_check);
    $stmt_check->bindParam(":email", $email);
    $stmt_check->execute();

    if ($stmt_check->rowCount() > 0) {
        $user = $stmt_check->fetch(PDO::FETCH_ASSOC);
        $fullname = $user['fullname'];
        $userKyc = $user['kyc_status'];

        // Step 2: Validate user credentials
        if ($user['is_cheat'] !== 'No') {
            return ["status" => false, "message" => "Oops! you were flagged for cheating. Complete your KYC and contact Support to resume nominating."];
        }

        if ($user['email_verified'] !== 'Yes') {
            return ["status" => false, "message" => "Email address is not verified."];
        }

        // Step 3: Get nominee data from help_requests_table using help_token
        $query_nominee = "SELECT * FROM " . $this->help_requests_table . " WHERE help_token = :help_token LIMIT 1";
        $stmt_nominee = $this->conn->prepare($query_nominee);
        $stmt_nominee->bindParam(":help_token", $help_token);
        $stmt_nominee->execute();

        if ($stmt_nominee->rowCount() > 0) {
            $nominee = $stmt_nominee->fetch(PDO::FETCH_ASSOC);

            // Step 4: Prevent self-nomination
            if ($email === $nominee['email_address']) {
                return ["status" => false, "message" => "Oops! Sorry, self-nominations are not allowed."];
            }

            // // Step 4: Check if user KYC is approved
            // if ($userKyc === 'APPROVED') {
            //     return [
            //         "status" => true, 
            //         "message" => "KYC approved", 
            //         "userData" => $user, 
            //         "nomineeData" => $nominee
            //     ];
            // } 
            
            

            if ($userKyc !== "APPROVED") { //NOT LVL2 KYC check for device
// Step 5a: Check for existing nomination (same voter+today+device)
            $today = date('Y-m-d');
            $query_existing = "SELECT COUNT(*) as existing_count 
                             FROM " . $this->nominations_history_table . " 
                             WHERE (voter_fullname = :voter_fullname 
                               OR voter_device_id = :voter_device_id)
                               AND (voter_email != nominee_email OR voter_fullname != nominee_fullname)
                              AND DATE(voting_date) = CURRENT_DATE()";
            $stmt_existing = $this->conn->prepare($query_existing);
            $stmt_existing->bindValue(":voter_fullname", $fullname, PDO::PARAM_STR);
            $stmt_existing->bindValue(":voter_device_id", $fingerPrint, PDO::PARAM_STR);  
            // $stmt_existing->bindValue(":today", $today, PDO::PARAM_STR);
            if (!$stmt_existing->execute()) {
                return ["status" => false, "message" => "System error checking nominations"];
            }
            $result = $stmt_existing->fetch(PDO::FETCH_ASSOC);
            if ($result && $result['existing_count'] > 0) {
                // // Calculate time remaining until midnight
                // $now = new DateTime();
                // $midnight = new DateTime('tomorrow');
                // $interval = $now->diff($midnight);
                // $timeLeft = $interval->format('%h hour(s) %i minute(s)');

                // $response = ["status" => false, "message" => "You have already nominated today. Try again in $timeLeft."];
                $response = ["status" => false, "message" => "Oops! Try again tomorrow. You have either nominated already or trying to share device, complete KYC to enable device sharing or come back tomorrow."];
                return $response;
            }
            } else { //LVL2 do not check for device
// Step 5b: Check for existing nomination (same voter+today)
            $today = date('Y-m-d');
            $query_existing = "SELECT COUNT(*) as existing_count 
                             FROM " . $this->nominations_history_table . " 
                             WHERE (voter_fullname = :voter_fullname)
                               AND (voter_email != nominee_email OR voter_fullname != nominee_fullname)
                              AND DATE(voting_date) = CURRENT_DATE()";
            $stmt_existing = $this->conn->prepare($query_existing);
            $stmt_existing->bindValue(":voter_fullname", $fullname, PDO::PARAM_STR);
            // $stmt_existing->bindValue(":voter_device_id", $fingerPrint, PDO::PARAM_STR);  
            // $stmt_existing->bindValue(":today", $today, PDO::PARAM_STR);
            if (!$stmt_existing->execute()) {
                return ["status" => false, "message" => "System error checking nominations"];
            }
            $result = $stmt_existing->fetch(PDO::FETCH_ASSOC);
            if ($result && $result['existing_count'] > 0) {
                // // Calculate time remaining until midnight
                // $now = new DateTime();
                // $midnight = new DateTime('tomorrow');
                // $interval = $now->diff($midnight);
                // $timeLeft = $interval->format('%h hour(s) %i minute(s)');

                // $response = ["status" => false, "message" => "You have already nominated today. Try again in $timeLeft."];
                $response = ["status" => false, "message" => "Oops! Try again tomorrow to nominate.#You have already nominated today."];
                return $response;
            }
            } 


            
            // Step 6: Silently update voter consistency
            $this->updateVoterConsistencySilently($email);
            
            // All checks passed
            return [
                "status" => true, 
                "message" => "All user checks passed.", 
                "userData" => $user, 
                "nomineeData" => $nominee
            ];
        } else {
            return ["status" => false, "message" => "Nominee request not found."];
        }
    } else {
        return ["status" => false, "message" => "User does not exist."];
    }
}

/**
 * Silently updates voter consistency without returning any value
 */
private function updateVoterConsistencySilently($email) {
    try {
        // Get current consistency
        $currentConsistency = $this->getCurrentConsistency($email);
        
        // Check voting history
        $lastVoteDate = $this->getLastVoteDate($email);
        $daysSinceLastVote = $this->getDaysSinceLastVote($lastVoteDate);
        
        // Determine new consistency value
        $newConsistency = $this->calculateNewConsistency($daysSinceLastVote, $currentConsistency);
        
        // Update consistency
        $this->updateConsistency($email, $newConsistency);
        
    } catch (Exception $e) {
        error_log("Silent consistency update failed: " . $e->getMessage());
    }
}

private function getLastVoteDate($email) {
    $query = "SELECT DATE(voting_date) as last_vote_date 
              FROM " . $this->nominations_history_table . " 
              WHERE voter_email = :email 
              ORDER BY voting_date DESC 
              LIMIT 1";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    return $result ? $result['last_vote_date'] : null;
}

private function getDaysSinceLastVote($lastVoteDate) {
    if (!$lastVoteDate) {
        return null; // Never voted before
    }
    
    $query = "SELECT DATEDIFF(CURRENT_DATE(), :lastVoteDate) as days_diff";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":lastVoteDate", $lastVoteDate, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    return $result ? (int)$result['days_diff'] : null;
}

private function calculateNewConsistency($daysSinceLastVote, $currentConsistency) {
    if ($daysSinceLastVote === null) {
        return 1; // First time voting
    }
    
    if ($daysSinceLastVote === 1) {
        return $currentConsistency + 1; // Voted yesterday - increment streak
    }
    
    if ($daysSinceLastVote === 0) {
        return $currentConsistency; // Voted today - no change
    }
    
    return 1; // Missed more than one day - reset to 1
}

private function updateConsistency($email, $newConsistency) {
    $updateQuery = "UPDATE " . $this->users_table . " 
                   SET voter_consistency = :consistency 
                   WHERE email_address = :email";
    
    $stmt = $this->conn->prepare($updateQuery);
    $stmt->bindParam(":consistency", $newConsistency, PDO::PARAM_INT);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->execute();
}

private function getCurrentConsistency($email) {
    $query = "SELECT voter_consistency 
              FROM " . $this->users_table . " 
              WHERE email_address = :email";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    return $result ? (int)$result['voter_consistency'] : 1;
}
/**
 * Silently updates voter consistency without returning any value
 */


    public function CreateNomination($email, $voterFullname, $voterConsistency, $voterDeviceId, $votingWeight, $nomineeEmail, $nomineeFullname, $helpToken)
    {
        $query = "";
        {
            $query = "INSERT INTO " . $this->nominations_history_table . " SET 
            
            voter_email=:voter_email,
            voter_fullname=:voter_fullname,
            voter_device_id=:voter_device_id,

            voting_weight=:voting_weight,
            nominee_email=:nominee_email,
            nominee_fullname=:nominee_fullname,
            help_token=:help_token
            ";
        }

        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":voter_email", $email);
        $stmt->bindParam(":voter_fullname", $voterFullname);
        $stmt->bindParam(":voter_device_id", $voterDeviceId);

        $stmt->bindParam(":voting_weight", $votingWeight);
        $stmt->bindParam(":nominee_email", $nomineeEmail);
        $stmt->bindParam(":nominee_fullname", $nomineeFullname);
        $stmt->bindParam(":help_token", $helpToken);
        
        // execute query
        if ($stmt->execute()) {
            // Now update nomination_count in help_requests_table
            $updateQuery = "UPDATE " . $this->help_requests_table . " 
            SET nomination_count = nomination_count + :voting_weight 
            WHERE help_token = :help_token";

            $updateStmt = $this->conn->prepare($updateQuery);
            $updateStmt->bindParam(":voting_weight", $votingWeight);
            $updateStmt->bindParam(":help_token", $helpToken);

            // ✅ Execute the update query
            if ($updateStmt->execute()) {
                return true;
            }

            return false; // fail if update fails
        }

        return false;
    }



    public function CreateSponsor($sponsorName, $sponsorType, $requestImage)
    {
        $query = "";
        {
            $query = "INSERT INTO " . $this->sponsors_table . " SET 
            
            name=:name,
            type=:type,
            image=:image
            ";
        }

        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":name", $sponsorName);

        $stmt->bindParam(":type", $sponsorType);
        $stmt->bindParam(":image", $requestImage);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    public function updateSponsor(
        $sponsorId, 
        $sponsorName,
        $sponsorType
        ) {
    
    
            
    
        $query = "UPDATE " . $this->sponsors_table . " 
                  SET 
                  
                    name =:name, 
                    type =:type
    
                  WHERE id = :id";
    
        // Prepare the SQL statement
        $stmt = $this->conn->prepare($query);
    
        // Bind parameters
        $stmt->bindParam(":id", $sponsorId);
    
        $stmt->bindParam(":name", $sponsorName);
        $stmt->bindParam(":type", $sponsorType);
    
        // Execute query and return the result
        if ($stmt->execute()) {
            return true;
        }
    
        // Optionally, log the error or handle it appropriately
        // error_log("Failed to update customer details: " . implode(":", $stmt->errorInfo()));
    
        return false;
    }

    public function ReadAllCryptos()
{
    $query = "SELECT
        p.id,
        p.network,
        p.address,
        p.image
        FROM
        " . $this->crypto_info_table . " p 
        
        ORDER BY id DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

public function CreateCrypto($cryptoNetwork, $cryptoAddress, $requestImage)
    {
        $query = "";
        {
            $query = "INSERT INTO " . $this->crypto_info_table . " SET 
            
            network=:network,
            address=:address,
            image=:image
            ";
        }

        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":network", $cryptoNetwork);

        $stmt->bindParam(":address", $cryptoAddress);
        $stmt->bindParam(":image", $requestImage);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    public function updateCrypto(
        $cryptoId, 
        $cryptoNetwork,
        $cryptoAddress
        ) {
    
    
            
    
        $query = "UPDATE " . $this->crypto_info_table . " 
                  SET 
                  
                    network =:network, 
                    address =:address
    
                  WHERE id = :id";
    
        // Prepare the SQL statement
        $stmt = $this->conn->prepare($query);
    
        // Bind parameters
        $stmt->bindParam(":id", $cryptoId);
    
        $stmt->bindParam(":network", $cryptoNetwork);
        $stmt->bindParam(":address", $cryptoAddress);
    
        // Execute query and return the result
        if ($stmt->execute()) {
            return true;
        }
    
        // Optionally, log the error or handle it appropriately
        // error_log("Failed to update customer details: " . implode(":", $stmt->errorInfo()));
    
        return false;
    }
    

    public function ReadPasswordReset($passwordResetToken)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT 
                    p.id,
                    p.email_address,
                    p.token,
                    p.created_at 
                FROM " . $this->password_reset_tokens_table . " p  WHERE p.token = :token";
            
            // Prepare the statement
            $stmt = $this->conn->prepare($query);
    
            // Bind the email parameter to the prepared statement
            $stmt->bindParam(':token', $passwordResetToken, PDO::PARAM_STR);
    
            // Execute the statement
            $stmt->execute();
    
            // Fetch the result
            $request = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($request === false) {
                return null; // No record found
            }

        return $request; // User not found
    
        } catch (Exception $e) {
            // Log the error message and return null for security
            // error_log("Error reading user: " . $e->getMessage());
            return null;
        }

    }

    public function ReadAllAdmins()
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
                FROM " . $this->admins_table . " p  ";
            
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

public function UpdatePasswordResetUserPassword($email, $newPassword) {
    $hashed = password_hash($newPassword, PASSWORD_DEFAULT);
    $query = "UPDATE " . $this->users_table . " 
              SET access_key = :access_key 
              WHERE email_address = :email_address";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    $stmt->bindParam(":access_key", $hashed);
    if ($stmt->execute()) {
        // Check if any row was actually updated
        return $stmt->rowCount() > 0;
    }
    return false;
}


public function DeletePasswordResetEmailToken($email) {
    $query = "DELETE FROM " . $this->password_reset_tokens_table . " WHERE email_address = :email_address";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    return $stmt->execute();
}

 // // // password reset // //

//
}
?>