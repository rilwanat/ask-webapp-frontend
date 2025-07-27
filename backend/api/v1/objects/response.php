<?php 

require __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;

require_once __DIR__ . '/../vendor/autoload.php'; // Adjust path based on your structure
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


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
    private $delete_account_tokens_table = "delete_account_tokens_table";
    private $bank_codes_table = "bank_codes_table";
    private $crypto_info_table = "crypto_info_table";
    private $subscriptions_table = "subscribe_table";

    private $payments_table = "payments_table";
    private $password_reset_tokens_table = "password_reset_tokens";
    
    private $dnq_values_table = "dnq_values_table";
    private $dollar_exchange_rate_table = "dollar_exchange_rate_table";
    private $daylight_savings_table = "daylight_savings_table";


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
    private $secretKey;


    public function __construct($db)
    {
        $this->conn = $db;
        $this->secretKey = $_ENV['ASK_SECRET_ENCRYPTION_KEY'];
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

    public function GetNomineeName($email)
    {
        try {
            // Prepare the SQL query using a prepared statement
            $query = "SELECT
                    -- p.id,
                    p.fullname,
                    -- p.email_address,
                    -- p.voter_consistency,
                    -- p.access_key,
                    -- p.phone_number,
                    -- p.kyc_status,
                    -- p.account_number,
                    -- p.account_name,
                    -- p.bank_name,
                    -- p.gender,
                    -- p.state_of_residence,
                    -- p.profile_picture,
                    -- p.email_verified,
                    -- p.registration_date,
                    -- p.user_type,
                    -- p.eligibility,
                    -- p.is_cheat,
                    -- p.opened_welcome_msg,
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

        public function FindPotentialCheats()
{
    try {
        // Prepare the SQL query
        // $query = "
        //     SELECT 
        //         u1.id AS id1, 
        //         u1.fullname AS name1,
        //         u2.id AS id2, 
        //         u2.fullname AS name2
        //     FROM 
        //         users_table u1
        //     JOIN 
        //         users_table u2 
        //     ON 
        //         (
        //             REPLACE(u1.fullname, '  ', ' ') = REPLACE(u2.fullname, '  ', ' ') 
        //             AND u1.fullname != u2.fullname
        //         )
        //         AND u1.id != u2.id
        //         AND u1.is_cheat = 'No'
        //         AND u2.is_cheat = 'No'
        //     ORDER BY 
        //         REPLACE(u1.fullname, '  ', ' '), u1.id
        // ";
        $query = "
SELECT 
    u1.id AS id1, 
    u1.fullname AS name1,
    u2.id AS id2, 
    u2.fullname AS name2
FROM 
    users_table u1
JOIN 
    users_table u2 
ON 
    u1.id != u2.id
    AND u1.is_cheat = 'No'
    AND u2.is_cheat = 'No'
    AND (
        -- Case 1: Names match when double spaces are normalized
        REPLACE(u1.fullname, '  ', ' ') = REPLACE(u2.fullname, '  ', ' ')
        -- Case 2: Names are exact reverses of each other
        OR (
            u1.fullname LIKE '% %' 
            AND u2.fullname LIKE '% %'
            AND SUBSTRING_INDEX(u1.fullname, ' ', 1) = SUBSTRING_INDEX(u2.fullname, ' ', -1)
            AND SUBSTRING_INDEX(u1.fullname, ' ', -1) = SUBSTRING_INDEX(u2.fullname, ' ', 1)
        )
    )
    AND u1.fullname != u2.fullname
ORDER BY 
    REPLACE(u1.fullname, '  ', ' '), u1.id
    "; // Just get some sample data
        
        // Prepare the statement
        $stmt = $this->conn->prepare($query);

        // Execute the statement
        $stmt->execute();

        // Fetch all results (not just one row)
        $potentialCheats = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $potentialCheats; // Return all potential cheat pairs
    
    } catch (Exception $e) {
        // Log the error message and return null for security
        error_log("Error finding potential cheats: " . $e->getMessage());
        return null;
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
    // First check if email already exists
    $check_query = "SELECT COUNT(*) as email_count 
                   FROM " . $this->subscriptions_table . " 
                   WHERE email_address = :email";
    
    $check_stmt = $this->conn->prepare($check_query);
    $check_stmt->bindParam(":email", $email);
    $check_stmt->execute();
    
    $result = $check_stmt->fetch(PDO::FETCH_ASSOC);
    
    // If email exists, return false
    if ($result && $result['email_count'] > 0) {
        return false;
    }
    
    // If email doesn't exist, proceed with insertion
    $insert_query = "INSERT INTO " . $this->subscriptions_table . " 
                    SET email_address = :email";
    
    $insert_stmt = $this->conn->prepare($insert_query);
    $insert_stmt->bindParam(":email", $email);
    
    return $insert_stmt->execute();
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

        $query = "SELECT SUM(price) AS total_amount FROM " . $this->payments_table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['total_amount'] ?? 0; // Return 0 if null
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

public function ReadAllHelpRequestsNotCheat()
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
        INNER JOIN 
            " . $this->users_table . " u ON u.email_address = p.email_address
        WHERE 
        (u.is_cheat IS NULL OR u.is_cheat != 'Yes' AND u.fullname != '' AND u.kyc_status = 'APPROVED')
        ORDER BY RAND()";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

public function ReadAllHelpRequestsNotCheatForAdmin()
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
        INNER JOIN 
            " . $this->users_table . " u ON u.email_address = p.email_address
        WHERE 
        (u.is_cheat IS NULL OR u.is_cheat != 'Yes' AND u.fullname != '')
        ORDER BY p.nomination_count DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}


public function ReadAllHelpRequestsNotCheatForAdminOnMobile()
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
        INNER JOIN 
            " . $this->users_table . " u ON u.email_address = p.email_address
        WHERE 
        (u.is_cheat IS NULL OR u.is_cheat != 'Yes' AND u.fullname != '') AND u.platform = 'mobile'
        ORDER BY p.nomination_count DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

public function ReadAllHelpRequestsEmailsNotCheat()
{
    $query = "SELECT
        p.id,
        
        p.email_address,
        p.nomination_count,
        u.fullname as user_fullname,
        u.email_address as user_email 
        FROM
        " . $this->help_requests_table . " p 
        INNER JOIN 
            " . $this->users_table . " u ON u.email_address = p.email_address
        WHERE 
        (u.is_cheat IS NULL OR u.is_cheat != 'Yes' AND u.fullname != '' AND u.kyc_status = 'APPROVED')
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
        p.remark,
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
    WHERE 
        u.kyc_status = 'APPROVED' 
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

public function ReadAllStates()
{
    $query = "SELECT DISTINCT u.state_of_residence 
              FROM " . $this->users_table . " u
              INNER JOIN help_requests_table h ON u.email_address = h.email_address
              WHERE u.state_of_residence IS NOT NULL 
              AND u.state_of_residence != '' 
              ORDER BY u.state_of_residence ASC";

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
        error_log("Error in ReadAllStates: " . $e->getMessage());
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
        
        ORDER BY price DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

public function ReadAllPayments()
{
    $query = "SELECT
        p.id,
        p.created_on,
        p.transaction_reference,
        p.email,
        p.price,
        p.subscription_type,
        p.payment_method 
        FROM
        " . $this->payments_table . " p 
        
        ORDER BY price DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

public function ReadAllCummulativePayments()
{
    $query = "SELECT 
                u.id as user_id,
                u.fullname,
                p.email,
                u.phone_number,
                u.account_name,
                u.bank_name,
                COUNT(p.id) as payment_count,
                SUM(p.price) as total_amount,
                MAX(p.created_on) as last_payment_date,
                GROUP_CONCAT(DISTINCT p.subscription_type SEPARATOR ', ') as subscription_types,
                GROUP_CONCAT(DISTINCT p.payment_method SEPARATOR ', ') as payment_methods
              FROM 
                " . $this->payments_table . " p
              LEFT JOIN 
                " . $this->users_table . " u ON p.email = u.email_address
              GROUP BY 
                p.email, u.id, u.fullname, u.phone_number, u.account_name, u.bank_name
              ORDER BY 
                total_amount DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

// public function ReadAllPayments()
// {
//     $query = "SELECT
//         p.id,
//         p.created_on,
//         p.transaction_reference,
//         p.email,
//         p.price,
//         (SELECT SUM(price) FROM " . $this->payments_table . " 
//          WHERE email = p.email AND created_on <= p.created_on) as cumulative_price,
//         p.subscription_type,
//         p.payment_method 
//         FROM
//         " . $this->payments_table . " p 
//         ORDER BY p.email, p.created_on ASC";  // Important to order by email and date for cumulative sum

//     $stmt = $this->conn->prepare($query);
//     $stmt->execute();
//     return $stmt;
// }


public function getTopNominations($limit = 3)
{
    $query = "SELECT
        h.id,
        h.date,
        h.nomination_count, 
        
        h.email_address,
        u.fullname
        FROM
        " . $this->help_requests_table . " h
        INNER JOIN " . $this->users_table . " u ON h.email_address = u.email_address 
        WHERE  u.fullname != ''  
        AND u.is_cheat != 'Yes' AND u.email_verified = 'Yes' AND u.kyc_status = 'APPROVED' AND u.eligibility = 'Yes'
        ORDER BY 
         
            h.nomination_count DESC,
            u.voter_consistency DESC,
            h.date ASC,
            u.registration_date ASC 

        LIMIT :limit";

    $stmt = $this->conn->prepare($query);
    $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
    $stmt->execute();
    
    // Fetch all results as an associative array
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;
}

public function getTopConsistencies($limit = 3)
{
    // $query = "SELECT
    //     u.id,
    //     u.registration_date,
    //     u.voter_consistency, 
    //     u.email_address,
    //     u.fullname, 
    //     u.phone_number 
    //     FROM " . $this->users_table . " u
    //     INNER JOIN " . $this->nominations_history_table . " nh ON u.email_address = nh.voter_email
    //     ORDER BY 
    //     DATE(nh.voting_date) DESC,
    //     u.voter_consistency DESC, 
    //     u.vote_weight DESC, 
    //     DATE(u.registration_date) ASC 
    //     LIMIT :limit";

        $query = "SELECT
            u.voter_consistency,
            u.fullname,
            u.email_address,
            COUNT(nht.voter_email) AS Active
        FROM 
            " . $this->users_table . " u
        INNER JOIN 
            " . $this->nominations_history_table . " nht ON u.email_address = nht.voter_email
        WHERE 
            u.platform = 'mobile'
        GROUP BY 
            u.voter_consistency,
            u.fullname,
            u.email_address,
            u.vote_weight
        ORDER BY 
            u.voter_consistency DESC,
            u.vote_weight DESC,
            MAX(DATE(nht.voting_date)) DESC,
            MIN(DATE(u.registration_date)) ASC
        LIMIT :limit";


    $stmt = $this->conn->prepare($query);
    $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
    $stmt->execute();
    
    // Fetch all results as an associative array
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;
}

public function getBeneficiairesBargraph()
{
    $query = "SELECT 
        u.state_of_residence, 
        COUNT(b.id) AS total_beneficiaries
        FROM 
        " . $this->beneficiaries_table . " b
        JOIN 
        " . $this->users_table . " u ON b.email_address = u.email_address
        GROUP BY 
        u.state_of_residence
        ORDER BY 
        total_beneficiaries DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    
    // Fetch all results as an associative array
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;
}


public function ReadAllSubscriptions()
{
    $query = "SELECT
        p.id,
        p.email_address 
        FROM
        " . $this->subscriptions_table . " p 
        
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


        $isCheat = "No";

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
                eligibility =:eligibility,
                is_cheat =:is_cheat

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

    $stmt->bindParam(":is_cheat", $isCheat);
    

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
    $isCheat,
    $kycStatus
) {
    // First get the current user data
    $getUserQuery = "SELECT 
                        fullname, 
                        account_number, 
                        account_name, 
                        bank_name, 
                        gender, 
                        state_of_residence,
                        kyc_status,
                        eligibility
                    FROM " . $this->users_table . " 
                    WHERE email_address = :email";
    
    $getUserStmt = $this->conn->prepare($getUserQuery);
    $getUserStmt->bindParam(":email", $email);
    $getUserStmt->execute();
    $userData = $getUserStmt->fetch(PDO::FETCH_ASSOC);

    // Clean input
    if ($kycStatus === "") { 
        $kycStatus = null; 
    }

    // Determine eligibility
    $eligibility = 'No';
    if ($kycStatus == 'APPROVED' && $isCheat == 'No') {
        $eligibility = 'Yes';
    }

    // Prepare values for update
    $fullname = $userData['fullname'] ?? null;
    $account_number = $userData['account_number'] ?? null;
    $account_name = $userData['account_name'] ?? null;
    $bank_name = $userData['bank_name'] ?? null;
    $gender = $userData['gender'] ?? null;
    $state_of_residence = $userData['state_of_residence'] ?? null;
    $current_kyc_status = $userData['kyc_status'] ?? null;

    // If eligibility is No, set these fields to null
    if ($eligibility == 'No') {
        $fullname = null;
        $account_name = null;
        $bank_name = null;
        $gender = null;
        $state_of_residence = null;
        $kycStatus = null; // Also clear kyc_status when not eligible
    } else {
        // If eligible, keep the existing kyc_status if no new one provided
        if ($kycStatus === null) {
            $kycStatus = $current_kyc_status;
        }
    }

    $query = "UPDATE " . $this->users_table . " 
              SET 
                fullname = :fullname,
                is_cheat = :is_cheat,
                kyc_status = :kyc_status,
                eligibility = :eligibility,
                account_number = :account_number,
                account_name = :account_name,
                bank_name = :bank_name,
                gender = :gender,
                state_of_residence = :state_of_residence
              WHERE email_address = :email";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":fullname", $fullname);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":is_cheat", $isCheat);
    $stmt->bindParam(":kyc_status", $kycStatus);
    $stmt->bindParam(":eligibility", $eligibility);
    $stmt->bindParam(":account_number", $account_number);
    $stmt->bindParam(":account_name", $account_name);
    $stmt->bindParam(":bank_name", $bank_name);
    $stmt->bindParam(":gender", $gender);
    $stmt->bindParam(":state_of_residence", $state_of_residence);

    // Execute query and return the result
    if ($stmt->execute()) {
        return true;
    }

    return false;
}

public function updateUserCheatOnly(
    $email, 
    $isCheat
) {
    

    // Determine eligibility
    $eligibility = 'Yes';
    if ($isCheat == 'Yes') {
        $eligibility = 'No';
    }


    $query = "UPDATE " . $this->users_table . " 
              SET 
                is_cheat = :is_cheat,
                eligibility = :eligibility 
              WHERE email_address = :email";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":is_cheat", $isCheat);
    $stmt->bindParam(":eligibility", $eligibility);

    // Execute query and return the result
    if ($stmt->execute()) {
        return true;
    }

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
                p.vote_weight,
                p.platform  
            FROM " . $this->users_table . " p  
            ORDER BY p.registration_date ASC ";
        
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

public function ReadAllUsersOnMobile()
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
                p.vote_weight,
                p.platform  
            FROM " . $this->users_table . " p  
            WHERE p.platform = 'mobile' 
            ORDER BY p.registration_date ASC ";
        
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

public function ReadAllTopUsers()
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
                p.vote_weight, 
                p.platform 
            FROM " . $this->users_table . " p  
            ORDER BY p.voter_consistency DESC ";
        
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

public function checkIfUserExistsInTokenTable($email) 
    {
        // Check if the user already exists
        $query_check = "SELECT id FROM " . $this->tokens_table . " WHERE token_for = :email";
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
    public function createUserWithoutPassword($email)
    {
        // $customer_id = strval(time());

        $query = "INSERT INTO " . $this->users_table . " SET             
            
            email_address=:email
            ";
    
        // prepare query
        $stmt = $this->conn->prepare($query);    
        
        
        $stmt->bindParam(":email", $email);

        
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

public function checkIfEmailCodeIsValidForMobilePasswordReset($email, $verificationCode) 
{
    // Get the most recent token for this email
    $query = "SELECT token 
              FROM " . $this->password_reset_tokens_table . " 
              WHERE email_address = :email 
              ORDER BY created_at DESC 
              LIMIT 1";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Compare the tokens directly (case-sensitive exact match)
        if (substr($tokenData['token'], 0, 4) === $verificationCode) {
            // Token is valid - you may want to delete it here to prevent reuse
            // $this->deleteToken($email, $verificationCode);
            // 
            return true;
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

public function ReadDollarExchangeRate()
{
    $query = "SELECT
        p.id,
        p.rate 
        FROM
        " . $this->dollar_exchange_rate_table . " p 
        
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
        
        description = :description,
        request_image = :request_image,
        help_token = :help_token";

    // prepare query
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(":email", $email);
    
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

    public function UpdateHelpRequestImage($email, $requestImage)
    {
        $query = "";
        {
            $query = "UPDATE " . $this->help_requests_table . " SET 
            
           request_image = :request_image 
            WHERE email_address = :email 
            ";
        }
        

        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":email", $email);
    
    // $stmt->bindParam(":description", $description);
    $stmt->bindParam(":request_image", $requestImage);
    // $stmt->bindParam(":help_token", $helpToken);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    public function checkIfUserCanPostHelpRequest($email) 
    {
        //return ["status" => false, "message" => "We're upgrading. Check back in a few hours."];
        
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
                // return ["status" => false, "message" => $fullname . " you are not eligible to proceed."];
                return ["status" => false, "message" => $fullname . " Level 2 Verification (KYC) is required to proceed. Not eligible."];
            }
    
            if (strtoupper($user['kyc_status']) !== 'APPROVED') {
                return ["status" => false, "message" => $fullname . " your KYC is not approved."];
            }
    
            if (empty($user['bank_name']) || empty($user['account_name']) || empty($user['account_number'])) {
                return ["status" => false, "message" => "Bank details are incomplete."];
            }
    
            //AND voter_consistency >= 30 
            // Step 3: Check if a recent beneficiary record exists (within 6 months)
            // $query_beneficiary = "SELECT date FROM " . $this->beneficiaries_table . " WHERE email_address = :email_address ORDER BY date DESC LIMIT 1";
            $query_beneficiary = "SELECT b.date, u.voter_consistency  
                      FROM " . $this->beneficiaries_table . " b
                      JOIN " . $this->users_table . " u ON b.email_address = u.email_address
                      WHERE b.email_address = :email_address 
                      AND u.voter_consistency < 30
                      ORDER BY b.date DESC 
                      LIMIT 1";
            $stmt_beneficiary = $this->conn->prepare($query_beneficiary);
            $stmt_beneficiary->bindParam(":email_address", $email);
            $stmt_beneficiary->execute();


            // Fetch the result
$result = $stmt_beneficiary->fetch(PDO::FETCH_ASSOC);
// Store voter_consistency in a variable
$voterConsistency = null;
if ($result && isset($result['voter_consistency'])) {
    $voterConsistency = $result['voter_consistency'];
    // $result['date'] is also available if needed
}

    
            // if ($stmt_beneficiary->rowCount() > 0) {
            //     $beneficiary = $stmt_beneficiary->fetch(PDO::FETCH_ASSOC);
            //     $lastDate = new DateTime($beneficiary['date']);
            //     $now = new DateTime();
            //     $interval = $now->diff($lastDate);
    
            //     // Calculate total months difference
            //     $totalMonths = ($interval->y * 1) + $interval->m;
    
            //     if ($totalMonths < 1) {
            //         $elapsedMonths = $totalMonths;
            //         $remainingMonths = 1 - $elapsedMonths;
        
            //         return [
            //             "status" => false, 
            //             "message" => sprintf(
            //                 "Your request was granted %d month(s) ago. You can request again in %d month(s).#KINDLY COMMIT TO NOMINATING OTHERS FOR NOW OR VOTE CONSISTENTL FOR 30 DAYS.",
            //                 $elapsedMonths,
            //                 $remainingMonths
            //             )
            //         ];
            // }
            // }
            if ($stmt_beneficiary->rowCount() > 0) {
    $beneficiary = $stmt_beneficiary->fetch(PDO::FETCH_ASSOC);
    $lastDate = new DateTime($beneficiary['date']);
    $now = new DateTime();
    $interval = $now->diff($lastDate);

    // Calculate total months difference
    $totalMonths = ($interval->y * 12) + $interval->m; // Fixed: years should multiply by 12

    if ($totalMonths < 1) {
        // Less than 1 month? Show days instead
        $elapsedDays = $interval->days;
        $remainingDays = 30 - $elapsedDays; // Assuming a 30-day cooldown

        return [
            "status" => false, 
            "message" => sprintf(
                // "Your request was granted %d day(s) ago. Stay active and come back to ASK in another %d day(s).#KINDLY COMMIT TO NOMINATING OTHERS FOR NOW OR VOTE CONSISTENTLY FOR 30 DAYS.",
                "Your request was granted %d day(s) ago. Stay active and come back to ASK in another " . (30 - $voterConsistency) . " day(s).#KINDLY COMMIT TO NOMINATING OTHERS FOR NOW OR VOTE CONSISTENTLY FOR 30 DAYS.",
                $elapsedDays,
                $remainingDays
            )
        ];
    } else {
        // 1+ months? Show months + remaining days
        $elapsedMonths = $totalMonths;
        $elapsedDays = $interval->d; // Days beyond full months
        $remainingMonths = 0; // Adjust based on your cooldown logic
        $remainingDays = 0;   // Adjust based on your cooldown logic

        return [
            "status" => false, 
            "message" => sprintf(
                // "Your request was granted %d month(s) and %d day(s) ago. Stay active and come back to ASK in another %d month(s) and %d day(s).#KINDLY COMMIT TO NOMINATING OTHERS FOR NOW OR VOTE CONSISTENTLY FOR 30 DAYS.",
                "Your request was granted %d month(s) and %d day(s) ago. Stay active and come back to ASK in another %d month(s) and " . (30 - $voterConsistency) . " day(s).#KINDLY COMMIT TO NOMINATING OTHERS FOR NOW OR VOTE CONSISTENTLY FOR 30 DAYS.",
                $elapsedMonths,
                $elapsedDays,
                $remainingMonths,
                $remainingDays
            )
        ];
    }
}
    
            // Step 4: Ensure user hasn't already submitted a help request
            $query_help_requests = "SELECT id FROM " . $this->help_requests_table . " WHERE email_address = :email_address LIMIT 1";
            $stmt_help_requests = $this->conn->prepare($query_help_requests);
            $stmt_help_requests->bindParam(":email_address", $email);
            $stmt_help_requests->execute();
    
            if ($stmt_help_requests->rowCount() > 0) {
                return ["status" => false, "message" => "You have a pending request, proceed to manage your request."];
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
        //return ["status" => false, "message" => "We're upgrading. Check back in a few hours."];

        
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
                    p.email_address,
                    p.request_image,
                    p.help_token,
                    u.fullname,
                    u.is_cheat,
                    u.email_verified,
                    u.kyc_status   
                FROM " . $this->help_requests_table . " p 
                LEFT JOIN " . $this->users_table . " u ON p.email_address = u.email_address
                 WHERE p.help_token = :help_token 
                 
                 
                 ";
            
            // AND u.is_cheat='No'
            //      AND u.email_verified='Yes'
            //      AND u.kyc_status='Approved'


            // Prepare the statement
            $stmt = $this->conn->prepare($query);
    
            // Bind the email parameter to the prepared statement
            $stmt->bindParam(':help_token', $helpToken, PDO::PARAM_STR);
    
            // Execute the statement
            $stmt->execute();
    
            // Fetch the result
            $request = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($request === false) {
                return [
                    'status' => false,
                    'message' => 'Request no longer available'
                ];
            }


            if (
                $request['is_cheat'] !== 'No' ||
                 $request['email_verified'] !== 'Yes' ||
                 $request['kyc_status'] !== 'APPROVED'
            ) {

                
            // Check if user is marked as cheat
            if (isset($request['is_cheat']) && $request['is_cheat'] === 'Yes') {
                return [
                    'status' => false,
                    'message' => 'Request currently not available'
                ];
            }

            // Check if fullname is empty due to kyc
            if (
                !isset($request['fullname']) || $request['fullname'] === ''
                ||
                !isset($request['kyc_status']) || $request['kyc_status'] === '' || $request['kyc_status'] === 'REJECTED' || $request['kyc_status'] === 'PENDING'
                ) {
                return [
                    'status' => false,
                    'message' => 'Currently not available'
                ];
            }


            }
    
            // Remove is_cheat from the response since we don't need to expose it
            unset($request['is_cheat']);
    
            return [
                'status' => true,
                'message' => 'Success',
                'data' => $request
            ];

    
        } catch (Exception $e) {
            // Log the error message
        error_log("Error reading help request: " . $e->getMessage());
        return [
            'status' => false,
            'message' => 'An error occurred while processing your request'
        ];
        }

    }

    public function checkIfUserCanNominate($email, $help_token, $fingerPrint) 
{
    //return ["status" => false, "message" => "We're upgrading. Check back in a few hours."];



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
            return ["status" => false, "message" => "Oops!#You were flagged for cheating. Complete your KYC and contact Support to resume nominating."];
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
                return ["status" => false, "message" => "Oops!#Sorry, self-nominations are not allowed."];
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
                   FROM " . $this->nominations_history_table . " nh
                   JOIN " . $this->users_table . " voter ON nh.voter_email = voter.email_address
                   JOIN " . $this->users_table . " nominee ON nh.nominee_email = nominee.email_address
                   WHERE (
                     (voter.fullname = :voter_fullname AND voter.fullname != '')
                     OR 
                     nh.voter_device_id = :voter_device_id 
                     OR
                     nh.voter_email = :email 
                    ) 
                     AND (nh.voter_email != nh.nominee_email OR voter.fullname != nominee.fullname)
                     AND DATE(nh.voting_date) = CURRENT_DATE()";
$stmt_existing = $this->conn->prepare($query_existing);
$stmt_existing->bindValue(":voter_fullname", $fullname, PDO::PARAM_STR);
$stmt_existing->bindValue(":voter_device_id", $fingerPrint, PDO::PARAM_STR); 
$stmt_existing->bindValue(":email", $email, PDO::PARAM_STR); 
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
                $response = ["status" => false, "message" => "Oops!#Try again tomorrow. You have either nominated already or trying to share device, complete KYC to enable device sharing or come back tomorrow."];
                return $response;
            }
            } else { //LVL2 do not check for device
// Step 5b: Check for existing nomination (same voter+today)
            $today = date('Y-m-d');
            $query_existing = "SELECT COUNT(*) as existing_count 
                   FROM " . $this->nominations_history_table . " nh
                   JOIN " . $this->users_table . " voter ON nh.voter_email = voter.email_address
                   JOIN " . $this->users_table . " nominee ON nh.nominee_email = nominee.email_address
                   WHERE (voter.fullname = :voter_fullname)
                     AND (nh.voter_email != nh.nominee_email OR voter.fullname != nominee.fullname)
                     AND DATE(nh.voting_date) = CURRENT_DATE()";
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
                $response = ["status" => false, "message" => "You have already nominated today."];
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
public function updateVoterConsistencySilently($email) {
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


    public function CreateNomination($email, $voterConsistency, $voterDeviceId, $votingWeight, $nomineeEmail, $helpToken)
    {
        $query = "";
        {
            $query = "INSERT INTO " . $this->nominations_history_table . " SET 
            
            voter_email=:voter_email,
            voter_device_id=:voter_device_id,

            voting_weight=:voting_weight,
            nominee_email=:nominee_email,
            help_token=:help_token
            ";
        }

        // prepare query
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":voter_email", $email);
        // $stmt->bindParam(":voter_fullname", $voterFullname);
        $stmt->bindParam(":voter_device_id", $voterDeviceId);

        $stmt->bindParam(":voting_weight", $votingWeight);
        $stmt->bindParam(":nominee_email", $nomineeEmail);
        // $stmt->bindParam(":nominee_fullname", $nomineeFullname);
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



    public function checkIfUserExistsWithKYCName($kycname, $email) {
        $kycname = strtolower(trim($kycname));
        $email = strtolower(trim($email));
    
        $query = "SELECT fullname FROM " . $this->users_table . " WHERE fullname = :fullname";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":fullname", $kycname);
        $stmt->execute();
    
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($result) {
            $fullname = strtolower(trim($result['fullname']));
    
            if ($kycname === $fullname) {
                $updateQuery = "UPDATE " . $this->users_table . " 
                                SET is_cheat = 'No', eligibility = 'No' 
                                WHERE email_address = :email";
                $updateStmt = $this->conn->prepare($updateQuery);
                $updateStmt->bindParam(":email", $email);
    
                if ($updateStmt->execute()) {
                    return true;
                }
            }
        }
    }


    public function calculateShares($shareType, $numberOfBeneficiaries, $totalAmount, $shareRatio = []) {
        $shares = [];
    
        if ($numberOfBeneficiaries <= 0 || $totalAmount <= 0) {
            return $shares; // empty if invalid input
        }
    
        if ($shareType === "direct") {
            // Equal split
            $shareAmount = round($totalAmount / $numberOfBeneficiaries, 2);
            for ($i = 0; $i < $numberOfBeneficiaries; $i++) {
                $shares[] = $shareAmount;
            }
        } elseif ($shareType === "ratio") {
            if (count($shareRatio) !== $numberOfBeneficiaries) {
                return []; // mismatch in ratio count and number of beneficiaries
            }
    
            $ratioSum = array_sum($shareRatio);
            foreach ($shareRatio as $ratio) {
                $shares[] = round(($ratio / $ratioSum) * $totalAmount, 2);
            }
        }
    
        return $shares;
    }
    


    public function updateUserDNQ($email, $price, $type, $reference) {
        try {
            // error_log("updateUserDNQ called with email: $email, price: $price, type: $type");
    
            // Initialize response
            $response = [
                "status" => false,
                "message" => "",
                "dnq" => 0,
                "new_vote_weight" => 0
            ];
    
            // Calculate DNQ
            $dnq = 0;
            $rate = 1;

            //go and get rates
            $query = "SELECT rate FROM " . $this->dnq_values_table . " WHERE name = :type";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':type', $type, PDO::PARAM_STR);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $rate = $row['rate'];
    }


    
            if ($type == "naira") {
                $dnq = (int)($price / $rate);
                $paymentMethod = "naira";
                // error_log("Currency type is naira. DNQ calculated as: $dnq");
            } else if ($type == "dollar") {
                $dnq = (int)($price / $rate);
                $paymentMethod = "dollar";
                // error_log("Currency type is dollar. DNQ calculated as: $dnq");
            } else {
                $response["message"] = "Invalid currency type";
                // error_log("Invalid currency type: $type");
                return $response;
            }
    
            if ($email !== "anonymousdonor@askfoundations.org") {
                // Get current vote weight
                $getQuery = "SELECT vote_weight FROM " . $this->users_table . " WHERE email_address = :email";
                $getStmt = $this->conn->prepare($getQuery);
                $getStmt->bindParam(":email", $email);
    
                if (!$getStmt->execute()) {
                    $response["message"] = "Failed to get current vote weight";
                    // error_log("Failed to execute SELECT query for user: $email");
                    return $response;
                }
    
                $userData = $getStmt->fetch(PDO::FETCH_ASSOC);
                if (!$userData) {
                    $response["message"] = "User not found";
                    // error_log("User not found: $email");
                    return $response;
                }
    
                $currentWeight = $userData['vote_weight'];
                $newWeight = $currentWeight + $dnq;
                // error_log("Current vote weight: $currentWeight, New weight after DNQ: $newWeight");
    
                // Perform the update
                $updateQuery = "UPDATE " . $this->users_table . " SET vote_weight = :new_weight WHERE email_address = :email";
                $updateStmt = $this->conn->prepare($updateQuery);
                $updateStmt->bindParam(":email", $email);
                $updateStmt->bindParam(":new_weight", $newWeight, PDO::PARAM_INT);
    
                if ($updateStmt->execute()) {
                    // Generate a transaction reference (you might want to use a better method)
                    // $transactionRef = 'TXN' . time() . rand(100, 999);
                    
                    // Record the payment in payments_table
                    $paymentQuery = "INSERT INTO " . $this->payments_table . " (transaction_reference, email, price, subscription_type, payment_method) 
                                    VALUES (:transaction_ref, :email, :price, 'donation', :payment_method)";
                    $paymentStmt = $this->conn->prepare($paymentQuery);
                    $paymentStmt->bindParam(":transaction_ref", $reference);
                    $paymentStmt->bindParam(":email", $email);
                    $paymentStmt->bindParam(":price", $price);
                    $paymentStmt->bindParam(":payment_method", $paymentMethod);
                    
                    if ($paymentStmt->execute()) {
                        $response["status"] = true;
                        $response["message"] = "Successfully updated Daily Nomination Quota (DNQ)";
                        $response["dnq"] = $dnq;
                        $response["new_vote_weight"] = $newWeight;
                        // error_log("Update and payment record successful for user: $email");
                    } else {
                        $response["message"] = "Daily Nomination Quota (DNQ) updated but payment recording failed";
                        // error_log("Payment recording failed for user: $email");
                    }
                } else {
                    $response["message"] = "Update failed";
                    // error_log("Update failed for user: $email");
                }
                return $response;
            } else {
                // For anonymous donations, we'll still record the payment but without an email
                // $transactionRef = 'TXN' . time() . rand(100, 999);
                $paymentQuery = "INSERT INTO " . $this->payments_table . " (transaction_reference, email, price, subscription_type, payment_method) 
                                VALUES (:transaction_ref, NULL, :price, 'donation', :payment_method)";
                $paymentStmt = $this->conn->prepare($paymentQuery);
                $paymentStmt->bindParam(":transaction_ref", $reference);
                $paymentStmt->bindParam(":price", $price);
                $paymentStmt->bindParam(":payment_method", $paymentMethod);
                
                if ($paymentStmt->execute()) {
                    $response["status"] = true;
                    $response["message"] = "Anonymous Donation recorded";
                    $response["dnq"] = $dnq;
                    $response["new_vote_weight"] = 0; // Anonymous donations don't affect vote weight
                    // error_log("Anonymous donation recorded");
                } else {
                    $response["message"] = "Anonymous donation recording failed";
                    // error_log("Anonymous donation recording failed");
                }
                return $response;
            }
    
        } catch (Exception $e) {
            $errorMessage = "System error: " . $e->getMessage();
            // error_log($errorMessage);
            return [
                "status" => false,
                "message" => $errorMessage,
                "dnq" => 0,
                "new_vote_weight" => 0
            ];
        }
    }
    


    public function logPayment(
        $transaction_reference, 
        $username, 
        $firstname, 
        $lastname, 
        $amount, 
        $email, 
        $subscription_type)
    {
        $amount = $amount;
        $query = "INSERT INTO " . $this->payments_table . " SET             
            transaction_reference=:transaction_reference,
            username=:username,
            firstname=:firstname,
            lastname=:lastname,
            price=:price,
            email=:email,
            subscription_type=:subscription_type";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // Bind parameters
        
        $stmt->bindParam(":transaction_reference", $transaction_reference);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":firstname", $firstname);
        $stmt->bindParam(":lastname", $lastname);
        $stmt->bindParam(":price", $amount);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":subscription_type", $subscription_type);
        
        // execute query
        if ($stmt->execute()) {
            
            return true;
        }
    
        return false; 
    }


    public function GenerateBeneficiariesNotCheat($count, $state)
{

    $appendStateQuery = "";
    if ($state != "") {
        $appendStateQuery = " AND u.state_of_residence = :state";
    }

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
        u.voter_consistency as voter_consistency,
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
        INNER JOIN 
            " . $this->users_table . " u ON u.email_address = p.email_address
         WHERE 
        (u.is_cheat IS NULL OR u.is_cheat != 'Yes') AND (p.nomination_count > 0) AND (u.fullname != '') AND u.kyc_status = 'APPROVED'
        ". $appendStateQuery ."
        ORDER BY 
            p.nomination_count DESC,
            u.voter_consistency DESC,
            p.date ASC,
            u.registration_date ASC
        LIMIT :count";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':count', $count, PDO::PARAM_INT);

        if ($state != "") {
            $stmt->bindParam(':state', $state, PDO::PARAM_STR);
        }

        $stmt->execute();
        return $stmt;
}








function deleteRequest($email, $helpToken) {
    try {
        // Validate inputs
        if (empty($email) || empty($helpToken)) {
            return false;
        }

        // Delete request record
        $stmt = $this->conn->prepare("DELETE FROM " . $this->help_requests_table . " 
                            WHERE email_address = :email AND help_token = :help_token");
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":help_token", $helpToken);
        $stmt->execute();
        
        return $stmt->rowCount() > 0;  // Changed affected_rows to rowCount() for PDO
    } catch (PDOException $e) {  // Changed to catch PDOException specifically
        error_log("Delete request error: " . $e->getMessage());
        return false;
    }
}

function postBeneficiary($email, $helpToken, $amount, $remark) {
    try {
        // Start transaction
        $this->conn->beginTransaction();
        
        // First get the nomination_count from the request table (within transaction)
        $stmt = $this->conn->prepare("SELECT nomination_count FROM " . $this->help_requests_table . " 
                            WHERE email_address = ? AND help_token = ? LIMIT 1");
        $stmt->execute([$email, $helpToken]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$row) {
            $this->conn->rollBack();
            return false;
        }
        
        $nominationCount = $row['nomination_count'];
        
        // Create beneficiary record
        $stmt = $this->conn->prepare("INSERT INTO " . $this->$beneficiaries_table . " 
                            (email_address, amount, nomination_count, remark) 
                            VALUES (?, ?, ?, ?)");
        $stmt->execute([$email, $amount, $nominationCount, $remark]);
        
        if ($stmt->rowCount() === 0) {
            $this->conn->rollBack();
            return false;
        }
        
        // Delete request record
        $stmt = $this->conn->prepare("DELETE FROM " . $this->help_requests_table . " 
                            WHERE email_address = ? AND help_token = ?");
        $stmt->execute([$email, $helpToken]);
        
        if ($stmt->rowCount() === 0) {
            $this->conn->rollBack();
            return false;
        }
        
        // Commit if all operations succeeded
        $this->conn->commit();
        return true;
        
    } catch (PDOException $e) {
        if ($this->conn->inTransaction()) {
            $this->conn->rollBack();
        }
        // Log error if needed
        error_log("Beneficiary processing error: " . $e->getMessage());
        return false;
    }
}

function postBeneficiariesArray($beneficiaries) {
    try {
        // Validate input
        if (!is_array($beneficiaries) || empty($beneficiaries)) {
            throw new Exception("No beneficiaries provided");
        }




        
        // Start transaction
        $this->conn->beginTransaction();
        
        // Process each beneficiary
        foreach ($beneficiaries as $beneficiary) {
            $email = $beneficiary['email'];
            $helpToken = $beneficiary['helpToken'];
            $amount = $beneficiary['amount'];
            $remark = $beneficiary['remark'] ?? ''; // Optional field with default value
            
            // First get the nomination_count from the request table (within transaction)
            $stmt = $this->conn->prepare("SELECT nomination_count FROM " . $this->help_requests_table . " 
                                WHERE email_address = ? AND help_token = ? LIMIT 1");
            $stmt->execute([$email, $helpToken]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$row) {
                $this->conn->rollBack();
                return false;
            }
            
            $nominationCount = $row['nomination_count'];
            
            // Create beneficiary record
            $stmt = $this->conn->prepare("INSERT INTO " . $this->beneficiaries_table . " 
                                (email_address, amount, nomination_count, remark) 
                                VALUES (?, ?, ?, ?)");
            $stmt->execute([$email, $amount, $nominationCount, $remark]);
            
            if ($stmt->rowCount() === 0) {
                $this->conn->rollBack();
                return false;
            }
            
            // Delete request record
            $stmt = $this->conn->prepare("DELETE FROM " . $this->help_requests_table . " 
                                WHERE email_address = ? AND help_token = ?");
            $stmt->execute([$email, $helpToken]);
            
            if ($stmt->rowCount() === 0) {
                $this->conn->rollBack();
                return false;
            }

            

        // Update beneficiary record in users table
        $updateUserStmt = $this->conn->prepare("UPDATE " . $this->users_table . " 
                                SET voter_consistency = 1 WHERE email_address = ?");
        $updateUserStmt->execute([$email]);





//following no longer done here
        // // Reset all nominations in history table
        // $resetStmt = $this->conn->prepare("UPDATE " . $this->help_requests_table . " 
        //                         SET nomination_count = 0");
        // $resetStmt->execute();
        
    }

     
        
        // Commit if all operations succeeded
        $this->conn->commit();
        return true;
        
    } catch (PDOException $e) {
        if ($this->conn->inTransaction()) {
            $this->conn->rollBack();
        }
        // Log error if needed
        error_log("Beneficiary processing error: " . $e->getMessage());
        return false;
    }
}


// function postBeneficiariesArrayForState($beneficiaries) {
//     try {
//         // Validate input
//         if (!is_array($beneficiaries) || empty($beneficiaries)) {
//             throw new Exception("No beneficiaries provided");
//         }




        
//         // Start transaction
//         $this->conn->beginTransaction();
        
//         // Process each beneficiary
//         foreach ($beneficiaries as $beneficiary) {
//             $email = $beneficiary['email'];
//             $helpToken = $beneficiary['helpToken'];
//             $amount = $beneficiary['amount'];
//             $remark = $beneficiary['remark'] ?? ''; // Optional field with default value
            
//             // First get the nomination_count from the request table (within transaction)
//             $stmt = $this->conn->prepare("SELECT nomination_count FROM " . $this->help_requests_table . " 
//                                 WHERE email_address = ? AND help_token = ? LIMIT 1");
//             $stmt->execute([$email, $helpToken]);
//             $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
//             if (!$row) {
//                 $this->conn->rollBack();
//                 return false;
//             }
            
//             $nominationCount = $row['nomination_count'];
            
//             // Create beneficiary record
//             $stmt = $this->conn->prepare("INSERT INTO " . $this->beneficiaries_table . " 
//                                 (email_address, amount, nomination_count, remark) 
//                                 VALUES (?, ?, ?, ?)");
//             $stmt->execute([$email, $amount, $nominationCount, $remark]);
            
//             if ($stmt->rowCount() === 0) {
//                 $this->conn->rollBack();
//                 return false;
//             }
            
//             // Delete request record
//             $stmt = $this->conn->prepare("DELETE FROM " . $this->help_requests_table . " 
//                                 WHERE email_address = ? AND help_token = ?");
//             $stmt->execute([$email, $helpToken]);
            
//             if ($stmt->rowCount() === 0) {
//                 $this->conn->rollBack();
//                 return false;
//             }

            

//         // Update beneficiary record in users table
//         $updateUserStmt = $this->conn->prepare("UPDATE " . $this->users_table . " 
//                                 SET voter_consistency = 1 WHERE email_address = ?");
//         $updateUserStmt->execute([$email]);





// //following no longer done here
//         // // Reset all nominations in history table
//         // $resetStmt = $this->conn->prepare("UPDATE " . $this->help_requests_table . " 
//         //                         SET nomination_count = 0");
//         // $resetStmt->execute();
        
//     }

     
        
//         // Commit if all operations succeeded
//         $this->conn->commit();
//         return true;
        
//     } catch (PDOException $e) {
//         if ($this->conn->inTransaction()) {
//             $this->conn->rollBack();
//         }
//         // Log error if needed
//         error_log("Beneficiary processing error: " . $e->getMessage());
//         return false;
//     }
// }


function resetAllNominationCount() {
    try {
        // Reset all nominations in history table
        $resetStmt = $this->conn->prepare("UPDATE " . $this->help_requests_table . " 
                                SET nomination_count = 0");
        $resetStmt->execute();
        
        // Return true on success
        return true;
        
    } catch (PDOException $e) {
        // Log error
        error_log("Reset All Nomination Count processing error: " . $e->getMessage());
        // Return false on failure
        return false;
        
        // Alternatively, you could re-throw the exception:
        // throw $e;
    }
}


public function approveBeneficiary($email) {
    
    $status = "approved";
    
    $query = "UPDATE " . $this->beneficiaries_table . " 
              SET status = :status 
              WHERE email_address = :email_address";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    $stmt->bindParam(":status", $status);
    if ($stmt->execute()) {
        // Check if any row was actually updated
        return true;
    }
    return false;
}



public function getDNQData()
{
    $query = "SELECT * 
              FROM " . $this->dnq_values_table . " 
              ORDER BY id ASC 
              LIMIT 2";
    
    try {
        // Prepare the statement
        $stmt = $this->conn->prepare($query);

        // Execute the statement
        $stmt->execute();

        // Fetch all results as an associative array
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    } catch (PDOException $e) {
        // Log error or handle it appropriately
        error_log("Database error in getDNQData(): " . $e->getMessage());
        return []; // Return empty array on error
    }
}

public function getDollarExchange()
{
    $query = "SELECT * 
              FROM " . $this->dollar_exchange_rate_table . " 
              ORDER BY id ASC 
              LIMIT 1";
    
    // Prepare the statement
    $stmt = $this->conn->prepare($query);

    // Execute the statement
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::PARAM_STR);

    return $result ;
}

public function getDaylightSavings()
{
    $query = "SELECT * 
              FROM " . $this->daylight_savings_table . " 
              ORDER BY id ASC 
              LIMIT 1";
    
    // Prepare the statement
    $stmt = $this->conn->prepare($query);

    // Execute the statement
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::PARAM_STR);

    return $result ;
}


public function updateDNQValues($nairaRate, $dollarRate) 
{
    try {
        // Start transaction
        $this->conn->beginTransaction();
        
        // Update Naira rate (id = 1)
        $stmt1 = $this->conn->prepare("
            UPDATE " . $this->dnq_values_table . " 
            SET rate = :rate 
            WHERE id = 1 AND name = 'naira'
        ");
        $stmt1->bindParam(':rate', $nairaRate, PDO::PARAM_STR);
        $stmt1->execute();
        
        // Update Dollar rate (id = 2)
        $stmt2 = $this->conn->prepare("
            UPDATE " . $this->dnq_values_table . " 
            SET rate = :rate 
            WHERE id = 2 AND name = 'dollar'
        ");
        $stmt2->bindParam(':rate', $dollarRate, PDO::PARAM_STR);
        $stmt2->execute();
        
        // Commit transaction
        $this->conn->commit();
        
        return [
            'status' => true,
            'message' => 'DNQ values updated successfully',
            'updated_rates' => [
                'naira' => $nairaRate,
                'dollar' => $dollarRate
            ]
        ];
        
    } catch (PDOException $e) {
        // Rollback transaction if error occurs
        $this->conn->rollBack();
        
        return [
            'status' => false,
            'message' => 'Failed to update DNQ values: ' . $e->getMessage()
        ];
    }
}


public function updateExchangeRate($rate) 
{
    try {
        
        
        // Update Naira rate (id = 1)
        $stmt1 = $this->conn->prepare("
            UPDATE " . $this->dollar_exchange_rate_table . " 
            SET rate = :rate 
            WHERE id = 1 
        ");
        $stmt1->bindParam(':rate', $rate, PDO::PARAM_STR);
        $stmt1->execute();
        
        
        
        return [
            'status' => true,
            'message' => 'Exchange Rate updated successfully'            
        ];
        
    } catch (PDOException $e) {
        
        
        return [
            'status' => false,
            'message' => 'Failed to update Exchange Rate: ' . $e->getMessage()
        ];
    }
}

public function updateDaylightSavings($value) 
{
    try {
        
        
        // Update Daylight value (id = 1)
        $stmt1 = $this->conn->prepare("
            UPDATE " . $this->daylight_savings_table . " 
            SET value = :value 
            WHERE id = 1 
        ");
        $stmt1->bindParam(':value', $value, PDO::PARAM_STR);
        $stmt1->execute();
        
        
        
        return [
            'status' => true,
            'message' => 'Daylight Savings updated successfully'            
        ];
        
    } catch (PDOException $e) {
        
        
        return [
            'status' => false,
            'message' => 'Failed to update Daylight Savings: ' . $e->getMessage()
        ];
    }
}




public function updateAdminPassword($email, $newPassword) {
    $hashed = password_hash($newPassword, PASSWORD_DEFAULT);
    $query = "UPDATE " . $this->admins_table . " 
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
    $query = "DELETE FROM " . $this->subscriptions_table . " WHERE email_address = :email_address";    
    $stmt = $this->conn->prepare($query);    
    if ($stmt === false) {
        // Optional: log error
        return false;    
    }
    $stmt->bindParam(":email_address", $email, PDO::PARAM_STR);    
    return $stmt->execute();
}


 // // // password reset // //

//


public function UnsubscribeEmail($email) {
    $query = "DELETE FROM " . $this->subscriptions_table . " WHERE email_address = :email_address";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    return $stmt->execute();
}




public function UpdateUserWelcomeMessage($email) {

    $opened_welcome_message = 'Yes';
    $query = "UPDATE " . $this->users_table . " 
              SET opened_welcome_message = :opened_welcome_message 
              WHERE email_address = :email_address";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":email_address", $email);
    $stmt->bindParam(":opened_welcome_message", $opened_welcome_message);
    if ($stmt->execute()) {
        // Check if any row was actually updated
        return $stmt->rowCount() > 0;
    }
    return false;
}


public function ReadAllNominationsForAdmin()
{
    /* Complete Nomination Statistics */

    // First get the daylight savings value
    $daylightQuery = "SELECT value FROM daylight_savings_table LIMIT 1";
    $daylightStmt = $this->conn->prepare($daylightQuery);
    $daylightStmt->execute();
    $daylightResult = $daylightStmt->fetch(PDO::FETCH_ASSOC);
    $hourInterval = $daylightResult['value'] ?? 5; // Default to 5 if not found

    
        $query = "SELECT 
        u.fullname as voter, 
        u.email_address as voter_email, 
        nominee.fullname as nominee, 
        nh.voter_device_id as device,
        DATE_ADD(nh.voting_date, INTERVAL " . $hourInterval . " HOUR) as voted_time, 
        DATE_ADD(u.registration_date, INTERVAL " . $hourInterval . " HOUR) as registered, 
        u.state_of_residence as location,
        u.vote_weight as dnq,

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
        u.vote_weight as user_vote_weight,
        u.voter_consistency as user_voter_consistency 


        FROM 
        " . $this->users_table . " u
        INNER JOIN 
        " . $this->nominations_history_table . " nh 
        ON u.email_address = nh.voter_email
        LEFT JOIN 
        " . $this->users_table . " nominee 
        ON nh.nominee_email = nominee.email_address
        ORDER BY 
        nh.voting_date DESC;";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

public function setPlatform(
    $email,
    $platform
    ) {


        

    $query = "UPDATE " . $this->users_table . " 
              SET 
              
                platform =:platform 

              WHERE email_address = :email";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":email", $email);

    $stmt->bindParam(":platform", $platform);

    // Execute query and return the result
    if ($stmt->execute()) {
        return true;
    }

    // Optionally, log the error or handle it appropriately
    // error_log("Failed to update customer details: " . implode(":", $stmt->errorInfo()));

    return false;
}


public function getFullnameByEmail($email) {
    $query = "SELECT fullname FROM " . $this->users_table . " 
              WHERE email_address = :email LIMIT 1";

    // Prepare the SQL statement
    $stmt = $this->conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(":email", $email);

    // Execute query
    if ($stmt->execute()) {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['fullname'] ?? null; // Return fullname or null if not found
    }

    // Optionally log errors
    error_log("Failed to fetch fullname: " . implode(":", $stmt->errorInfo()));
    
    return false;
}


// Notification function to send a message to Firebase
function getAccessToken() {
    $keyFile = __DIR__.'/../keys/ask-platform-63830-firebase-adminsdk-fbsvc-57bace1375.json';
    $key = json_decode(file_get_contents($keyFile), true);

    $jwtHeader = ['alg' => 'RS256', 'typ' => 'JWT'];
    $jwtClaimSet = [
        'iss' => $key['client_email'],
        'scope' => 'https://www.googleapis.com/auth/datastore',
        'aud' => 'https://oauth2.googleapis.com/token',
        'exp' => time() + 3600,
        'iat' => time()
    ];

    $jwt = $this->base64url_encode(json_encode($jwtHeader)) . '.' . $this->base64url_encode(json_encode($jwtClaimSet));
    openssl_sign($jwt, $signature, $key['private_key'], 'SHA256');
    $jwt .= '.' . $this->base64url_encode($signature);

    $response = file_get_contents('https://oauth2.googleapis.com/token', false, stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query([
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion' => $jwt
            ])
        ]
    ]));

    $tokenData = json_decode($response, true);
    return $tokenData['access_token'];
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function sendFirestoreMessage($chatId, $messageData) {
    $projectId = 'ask-platform-63830';
    $accessToken = $this->getAccessToken();
    $url = "https://firestore.googleapis.com/v1/projects/$projectId/databases/(default)/documents/notifications/$chatId/messages";

    $data = [
        'fields' => [
            'message' => ['stringValue' => $messageData['message']],
            'meta' => ['stringValue' => $messageData['meta']] ?? '',
            // 'senderId' => ['stringValue' => $messageData['senderId']],
            // 'senderImage' => ['stringValue' => $messageData['senderImage']],
            // 'senderName' => ['stringValue' => $messageData['senderName']],
            // 'receiverId' => ['stringValue' => $messageData['receiverId']],
            // 'receiverName' => ['stringValue' => $messageData['receiverName']],
            'timestamp' => ['timestampValue' => date('c')] // ISO8601 timestamp
        ]
    ];

    $headers = [
        "Authorization: Bearer $accessToken",
        "Content-Type: application/json"
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        return ['success' => false, 'error' => curl_error($ch)];
    }
    curl_close($ch);

    $responseData = json_decode($response, true);
    if (isset($responseData['name'])) {
        return ['success' => true, 'messageId' => basename($responseData['name'])];
    } else {
        return ['success' => false, 'error' => $responseData['error']['message'] ?? 'Unknown error'];
    }
}


//Notification function to send a message to Firebase




public function ReadAllTopNominations()
{
    try {
        // Prepare the SQL query using a prepared statement
        $query = "SELECT
                n.id,
                n.date,
                n.nomination_count,
                n.description,
                n.remark,
                n.email_address,
                n.request_image, 
                n.help_token  
            FROM " . $this->help_requests_table . " n  
            ORDER BY n.nomination_count DESC 
            LIMIT 1";
        
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

public function ReadAllTrailingTopNominations()
{
    try {
        // Prepare the SQL query using a prepared statement
        $query = "SELECT
                n.id,
                n.date,
                n.nomination_count,
                n.description,
                n.remark,
                n.email_address,
                n.request_image, 
                n.help_token  
            FROM " . $this->help_requests_table . " n  
            WHERE n.nomination_count > 0
            ORDER BY n.nomination_count DESC 
            LIMIT 4 OFFSET 1";
        
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





public function checkIfUserExistsInDeleteTokenTable($email) 
{
    try {
        // Check if the user exists and get their token
        $query = "SELECT email_token FROM " . $this->delete_account_tokens_table . " 
                 WHERE token_for = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['email_token']; // Return existing token
        }
        return false; // User doesn't exist or token expired
    
    } catch (PDOException $e) {
        // error_log("Error checking user token: " . $e->getMessage());
        return false;
    }
}
public function InsertEmailTokenForDeleteUser($email, $randomToken)
    {
        // $customer_id = strval(time());

        $query = "INSERT INTO " . $this->delete_account_tokens_table . " SET             
            
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



public function DeleteAccount($email, $deleteToken)
{
    try {
        // First check if token is valid
        $tokenQuery = "SELECT id FROM " . $this->delete_account_tokens_table . " 
                      WHERE token_for = :email AND email_token = :deleteToken";
        $tokenStmt = $this->conn->prepare($tokenQuery);
        $tokenStmt->bindParam(":email", $email);
        $tokenStmt->bindParam(":deleteToken", $deleteToken);
        $tokenStmt->execute();

        // If token is not valid
        if ($tokenStmt->rowCount() === 0) {
            // error_log("Invalid or expired token for email: " . $email);
            return [
                'status' => false,
                'message' => 'Invalid or expired token'
            ];
        }


// Delete subscriptions_table record
            $stmt = $this->conn->prepare("DELETE FROM " . $this->subscriptions_table . " 
                                WHERE email_address = ?");
            $stmt->execute([$email]);            
            // if ($stmt->rowCount() === 0) {
            //     $this->conn->rollBack();
            //     return false;
            // }
            
        
        // Check if user exists in beneficiaries table
        $beneficiaryCheck = "SELECT id FROM " . $this->beneficiaries_table . " WHERE email_address = :email";
        $beneficiaryStmt = $this->conn->prepare($beneficiaryCheck);
        $beneficiaryStmt->bindParam(":email", $email);
        $beneficiaryStmt->execute();
        if ($beneficiaryStmt->rowCount() > 0) {
            return [
                'status' => false,
                'message' => 'Cannot delete account - user exists in beneficiaries table. Please contact support on: support@askfoundations.org'
            ];
        }


        // Begin transaction
        $this->conn->beginTransaction();

        // Delete the user account
        $deleteQuery = "DELETE FROM " . $this->users_table . " 
                       WHERE email_address = :email";
        $deleteStmt = $this->conn->prepare($deleteQuery);
        $deleteStmt->bindParam(":email", $email);
        $deleteStmt->execute();

        // Check if user was actually deleted
        if ($deleteStmt->rowCount() === 0) {
            $this->conn->rollBack();
            return [
                'status' => false,
                'message' => 'Account not found'
            ];
        }

        // Delete the token after successful account deletion
        $deleteTokenQuery = "DELETE FROM " . $this->delete_account_tokens_table . " 
                           WHERE token_for = :email";
        $deleteTokenStmt = $this->conn->prepare($deleteTokenQuery);
        $deleteTokenStmt->bindParam(":email", $email);
        $deleteTokenStmt->execute();

        // Commit transaction
        $this->conn->commit();

        return [
            'status' => true,
            'message' => 'Account deleted successfully'
        ];

    } catch (PDOException $e) {
        // Rollback transaction on error
        if ($this->conn->inTransaction()) {
            $this->conn->rollBack();
        }
        error_log("Delete account error: " . $e->getMessage());
        return [
            'status' => false,
            'message' => 'An error occurred while deleting account'
        ];
    }
}



public function checkIfNomineeExistsForTodayInNominations($email) 
{
    $today = date('Y-m-d');
    // Log the date being used for comparison
    // error_log("Checking if nominee exists for today. Today's date being used for comparison: " . $today);
    // error_log("Checking email: " . $email);

    // Check if the user already exists
    $query_check = "SELECT id FROM " . $this->nominations_history_table . " WHERE nominee_email = :email AND DATE(voting_date) = :today";
    // error_log("SQL query being executed: " . $query_check); // Log the query
    
    $stmt_check = $this->conn->prepare($query_check);
    $stmt_check->bindParam(":email", $email);
    $stmt_check->bindParam(":today", $today);
    $stmt_check->execute();

    $rowCount = $stmt_check->rowCount();
    // error_log("Number of rows found: " . $rowCount); // Log the row count
    
    // If the row count is greater than 1, it means the user exists, put into consideration prior insert which makes it 1
    if ($rowCount > 1) {
        // error_log("Nominee with email " . $email . " already exists in nominations for " . $today);
        return true;
    } else {
        // error_log("Nominee with email " . $email . " does not exist in nominations for " . $today);
        return false;
    }
}

}
?>