<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Suporte a login tanto por POST direto quanto por sub-rota
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Fallback para campos caso o JSON falhe (embora o React envie JSON)
    $email = $input['email'] ?? $_POST['email'] ?? '';
    $password = $input['password'] ?? $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        jsonResponse(['error' => 'Email e senha são obrigatórios'], 400);
    }
    
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user || !password_verify($password, $user['password'])) {
        jsonResponse(['error' => 'Credenciais inválidas'], 401);
    }
    
    // Gerar token simples
    $token = base64_encode($user['id'] . ':' . time() . ':' . bin2hex(random_bytes(16)));
    
    jsonResponse([
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'email' => $user['email']
        ]
    ]);
}

// Resposta de erro padrão caso não seja POST
jsonResponse([
    'error' => 'Acesso inválido',
    'method' => $_SERVER['REQUEST_METHOD'],
    'info' => 'Este endpoint aceita apenas requisições POST para login.'
], 405);
