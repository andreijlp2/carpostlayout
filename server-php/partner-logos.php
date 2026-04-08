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

// Diretório para uploads
$uploadDir = __DIR__ . '/uploads/logos/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// GET - Buscar logos ativos ou todos (admin)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $requestAction = '';
    if (isset($path)) {
        if (strpos($path, '/all') !== false) {
            $requestAction = 'all';
        }
    }

    $isAll = isset($_GET['all']) || $requestAction === 'all';
    
    if ($isAll) {
        if (!validateToken(['Authorization' => $authHeader])) {
            jsonResponse(['error' => 'Token não fornecido'], 401);
        }
        $stmt = $pdo->query('SELECT * FROM partner_logos ORDER BY created_at DESC');
    } else {
        $stmt = $pdo->query('SELECT * FROM partner_logos WHERE active = TRUE ORDER BY created_at DESC');
    }
    $logos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse($logos);
}

// POST - Criar logo (admin)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['name'] ?? '';
    $imageBase64 = $input['image_base64'] ?? '';
    
    if (empty($name) || empty($imageBase64)) {
        jsonResponse(['error' => 'Nome e imagem são obrigatórios'], 400);
    }
    
    // Salvar imagem
    $filename = 'logo_' . time() . '.png';
    $filepath = $uploadDir . $filename;
    
    $imageData = str_replace('data:image/png;base64,', '', $imageBase64);
    $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
    $imageData = base64_decode($imageData);
    
    file_put_contents($filepath, $imageData);
    
    $imageUrl = '/api/uploads/logos/' . $filename;
    
    $stmt = $pdo->prepare('INSERT INTO partner_logos (name, image_url) VALUES (?, ?)');
    $stmt->execute([$name, $imageUrl]);
    
    jsonResponse([
        'id' => $pdo->lastInsertId(),
        'name' => $name,
        'image_url' => $imageUrl,
        'message' => 'Logo criado com sucesso'
    ]);
}

// DELETE - Excluir logo (admin)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    // Aceita id via query string ou path
    $id = $_GET['id'] ?? 0;
    if ($id === 0) {
        // Extrai id do path: /partner-logos/1
        $pathInfo = $_SERVER['REQUEST_URI'];
        $pathInfo = parse_url($pathInfo, PHP_URL_PATH);
        $parts = explode('/', rtrim($pathInfo, '/'));
        $id = end($parts);
    }
    
    // Buscar imagem para excluir
    $stmt = $pdo->prepare('SELECT image_url FROM partner_logos WHERE id = ?');
    $stmt->execute([$id]);
    $logo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($logo) {
        $filepath = __DIR__ . $logo['image_url'];
        if (file_exists($filepath)) {
            unlink($filepath);
        }
    }
    
    $stmt = $pdo->prepare('DELETE FROM partner_logos WHERE id = ?');
    $stmt->execute([$id]);
    
    jsonResponse(['message' => 'Logo excluído com sucesso']);
}

jsonResponse(['error' => 'Método não permitido'], 405);
