<?php

class Service {
    private $conn;

    function __construct($conn) {
        $this->conn = $conn;
    }

    function login($email, $password) {
        // Implement login logic
        $query = "SELECT * FROM user_info WHERE email = '$email' AND password = '$password'";
        $result = $this->conn->query($query);

        if (!$result) {
            $response = ['status' => 'error', 'message' => 'Database error'];
        } elseif ($result->num_rows > 0) {
            $user_data = $result->fetch_assoc();
            $response = ['status' => true, 'data' => $user_data];
        } else {
            $response = ['status' => 'error', 'message' => 'Authentication failed'];
        }

        return $response;
    }
}

?>
