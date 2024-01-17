<?php

require_once('config.php');
require_once('service.php');

function handleLoginRequest($service) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['email']) && isset($data['password'])) {
        $response = $service->login($data['email'], $data['password']);

        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request data']);
    }
}

function handleLogoutRequest($service) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'message' => 'To be implemented']);
}

function handleRememberMeRequest($service) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'message' => 'To be implemented']);
}

function handleRegisterRequest($service) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'message' => 'To be implemented']);
}