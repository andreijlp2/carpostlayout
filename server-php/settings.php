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
$authHeader = $headers['Authorization'] ?? $headers['Authorization'] ?? '';

// GET - Buscar configurações
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM settings LIMIT 1');
    $settings = $stmt->fetch(PDO::FETCH_ASSOC);
    jsonResponse($settings ?: []);
}

// PUT - Atualizar configurações (requer auth)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (!validateToken(['Authorization' => $authHeader])) {
        jsonResponse(['error' => 'Token não fornecido'], 401);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // UPSERT: cria a linha se não existir, atualiza se existir
    $stmt = $pdo->prepare("
        INSERT INTO settings (id, google_analytics_id, google_tag_manager_id, meta_pixel_id, youtube_video_id)
        VALUES (1, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            google_analytics_id    = VALUES(google_analytics_id),
            google_tag_manager_id  = VALUES(google_tag_manager_id),
            meta_pixel_id          = VALUES(meta_pixel_id),
            youtube_video_id       = VALUES(youtube_video_id)
    ");
    
    $stmt->execute([
        $input['google_analytics_id'] ?? '',
        $input['google_tag_manager_id'] ?? '',
        $input['meta_pixel_id'] ?? '',
        $input['youtube_video_id'] ?? ''
    ]);
    
    jsonResponse(['message' => 'Configurações atualizadas com sucesso']);
}

jsonResponse(['error' => 'Método não permitido'], 405);
