<?php

require_once('src/controller.php');
require_once('src/service.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Get the requested route from the rewritten URL
$requestUri = $_SERVER['REQUEST_URI'];
$pathSegments = explode('/', trim($requestUri, '/'));

// Remove empty elements from the array
$pathSegments = array_filter($pathSegments);

// Get the route from the remaining segments
$route = end($pathSegments); // Use end() to get the last element

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Define the route-controller method mapping
    $routeControllerMap = [
        'login' => 'handleLoginRequest',
        'logout' => 'handleLogoutRequest',
        'rememberMe'=> 'handleRememberMeRequest',
        'Register' => 'handleRegisterRequest',
        // Add other routes as needed
    ];

    // Route the request to the appropriate controller method
    if (array_key_exists($route, $routeControllerMap)) {
        $controllerMethod = $routeControllerMap[$route];

        // Pass the database connection to the Service constructor
        $service = new Service($conn);
        $controllerMethod($service); // Pass the Service instance to the controller method
    } else {
        // Handle unknown routes, you can show an error page or redirect to a default route
        echo 'Unknown route';
    }
} else {
    // Handle non-POST requests
    echo 'Invalid request method. Only POST requests are allowed.';
}
