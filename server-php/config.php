<?php
// Configuração do banco de dados
$db_host = 'localhost';
$db_user = 'carpostcom_site';
$db_pass = '122413@_and';
$db_name = 'carpostcom_site';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Garantir que o MySQL use UTC para comparações de data
    $pdo->exec("SET time_zone = '+00:00'");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na conexão com o banco de dados']);
    exit;
}

// Garantir usuário admin
$correctPassword = 'and@_2637';
$correctHash = password_hash($correctPassword, PASSWORD_DEFAULT);

$stmt = $pdo->prepare('SELECT id, password FROM users WHERE email = ?');
$stmt->execute(['andreijlp@hotmail.com']);
$existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$existingUser) {
    $stmt = $pdo->prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    $stmt->execute(['andreijlp@hotmail.com', $correctHash]);
} elseif (!password_verify($correctPassword, $existingUser['password'])) {
    $stmt = $pdo->prepare('UPDATE users SET password = ? WHERE email = ?');
    $stmt->execute([$correctHash, 'andreijlp@hotmail.com']);
}

// Função para validar token JWT
function validateToken($headers) {
    if (!isset($headers['Authorization'])) {
        return false;
    }
    
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    
    // Simples verificação de token (em produção use JWT proper)
    if (empty($token) || strlen($token) < 10) {
        return false;
    }
    
    return true;
}

// Função para gerar resposta JSON
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
