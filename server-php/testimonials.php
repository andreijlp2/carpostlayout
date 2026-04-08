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

// Identifica a ação baseada no $path definido no index.php
$requestAction = '';
$requestId = '';
if (isset($path)) {
    $parts = explode('/', trim($path, '/'));
    // /testimonials, /testimonials/all, /testimonials/123
    if (isset($parts[1])) {
        if ($parts[1] === 'all') {
            $requestAction = 'all';
        } elseif (is_numeric($parts[1])) {
            $requestId = $parts[1];
        }
    }
}

// GET ALL - Buscar todos os depoimentos (admin)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($requestAction === 'all' || isset($_GET['all']))) {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    $stmt = $pdo->query('SELECT * FROM testimonials ORDER BY created_at DESC');
    $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse($testimonials);
}

// GET - Buscar depoimentos ativos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM testimonials WHERE active = TRUE ORDER BY created_at DESC');
    $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse($testimonials);
}

// POST - Criar depoimento (admin)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare('INSERT INTO testimonials (client_name, stars, content, active) VALUES (?, ?, ?, ?)');
    $stmt->execute([
        $input['client_name'],
        $input['stars'],
        $input['content'],
        $input['active'] ?? true
    ]);
    
    jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Depoimento criado com sucesso']);
}

// PUT - Atualizar depoimento (admin)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $_GET['id'] ?? 0;
    
    $stmt = $pdo->prepare('UPDATE testimonials SET client_name = ?, stars = ?, content = ?, active = ? WHERE id = ?');
    $stmt->execute([
        $input['client_name'],
        $input['stars'],
        $input['content'],
        $input['active'] ?? true,
        $id
    ]);
    
    jsonResponse(['message' => 'Depoimento atualizado com sucesso']);
}

// DELETE - Excluir depoimento (admin)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    // ID pode vir do caminho (/testimonials/5) ou da query string (?id=5)
    $id = $requestId ?: ($_GET['id'] ?? 0);
    
    if (!$id) {
        jsonResponse(['error' => 'ID do depoimento não fornecido'], 400);
    }
    
    $stmt = $pdo->prepare('DELETE FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);
    
    jsonResponse(['message' => 'Depoimento excluído com sucesso']);
}

jsonResponse(['error' => 'Método não permitido'], 405);
