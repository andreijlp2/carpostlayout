<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

// Detecta ação por caminho OU por query string (?action=validate&token=...)
$action = '';
$pathToken = '';

// 1. Tenta query string (usado pelo frontend: ?action=validate&token=TOKEN)
if (!empty($_GET['action'])) {
    $action = $_GET['action'];
    $pathToken = $_GET['token'] ?? '';
}

// 2. Fallback: tenta detectar via $path (roteamento por caminho)
if (empty($action) && isset($path)) {
    if (strpos($path, '/generate') !== false) {
        $action = 'generate';
    } elseif (strpos($path, '/validate') !== false) {
        $action = 'validate';
        $parts = explode('/validate/', $path);
        $pathToken = $parts[1] ?? '';
    } elseif (strpos($path, '/submit') !== false) {
        $action = 'submit';
        $parts = explode('/submit/', $path);
        $pathToken = $parts[1] ?? '';
    }
}

// POST /generate - Gerar link temporário (admin)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'generate') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    $hours = $input['hours'] ?? 72;
    
    $token = bin2hex(random_bytes(16));
    // Usar UTC para compatibilidade com NOW() do MySQL
    $expiresAt = gmdate('Y-m-d H:i:s', time() + ($hours * 3600));
    
    $stmt = $pdo->prepare('INSERT INTO testimonial_links (token, expires_at) VALUES (?, ?)');
    $stmt->execute([$token, $expiresAt]);
    
    // URL dinâmica robusta
    $protocol = 'http';
    if ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') || 
        (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')) {
        $protocol = 'https';
    }
    
    $host = $_SERVER['HTTP_HOST'];
    $frontendUrl = $protocol . '://' . $host;
    $link = $frontendUrl . '/depoimento/' . $token;
    
    jsonResponse([
        'link' => $link,
        'expiresAt' => $expiresAt,
        'message' => 'Link gerado com sucesso'
    ]);
}

// GET /validate/:token - Validar link
if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($action === 'validate' || !empty($pathToken))) {
    $token = $pathToken ?: ($_GET['token'] ?? '');
    
    $stmt = $pdo->prepare('SELECT * FROM testimonial_links WHERE token = ? AND used = FALSE AND expires_at > NOW()');
    $stmt->execute([$token]);
    $link = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$link) {
        jsonResponse(['error' => 'Link inválido ou expirado'], 404);
    }
    
    jsonResponse(['valid' => true]);
}

// POST /submit/:token - Enviar depoimento
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($action === 'submit' || !empty($pathToken))) {
    $token = $pathToken ?: ($_GET['token'] ?? '');
    
    $stmt = $pdo->prepare('SELECT * FROM testimonial_links WHERE token = ? AND used = FALSE AND expires_at > NOW()');
    $stmt->execute([$token]);
    $link = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$link) {
        jsonResponse(['error' => 'Link inválido ou expirado'], 404);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['client_name']) || empty($input['stars']) || empty($input['content'])) {
        jsonResponse(['error' => 'Todos os campos são obrigatórios'], 400);
    }
    
    $stmt = $pdo->prepare('INSERT INTO testimonials (client_name, stars, content, active) VALUES (?, ?, ?, TRUE)');
    $stmt->execute([$input['client_name'], $input['stars'], $input['content']]);
    
    $stmt = $pdo->prepare('UPDATE testimonial_links SET used = TRUE WHERE token = ?');
    $stmt->execute([$token]);
    
    jsonResponse(['message' => 'Depoimento enviado com sucesso!']);
}

// DELETE /:token - Excluir link
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Não autorizado'], 401);
    }
    
    $token = $pathToken ?: ($_GET['token'] ?? '');
    if (empty($token)) {
        // Tenta extrair da URL se não estiver no $pathToken/$_GET
        $parts = explode('/', trim($path, '/'));
        $token = end($parts);
    }

    if (empty($token) || $token === 'testimonial-link') {
        jsonResponse(['error' => 'Token não fornecido'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM testimonial_links WHERE token = ?');
    $stmt->execute([$token]);
    
    if ($stmt->rowCount() > 0) {
        jsonResponse(['message' => 'Link excluído com sucesso']);
    } else {
        jsonResponse(['error' => 'Link não encontrado'], 404);
    }
}

jsonResponse(['error' => 'Método não permitido ou rota inválida', 'action' => $action], 405);
