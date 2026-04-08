<?php
// Router simples para API
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

// Se é a raíz do site ou não começa com /api, sai (deixa o servidor servir arquivos estáticos)
if ($path === '/' || $path === '' || strpos($path, '/api') !== 0) {
    // Não é requisição de API - sai
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Endpoint não encontrado', 'path' => $path]);
    exit;
}

// Remove /api do início
$path = str_replace('/api', '', $path);

// Normaliza o caminho (remove barras extras)
$path = rtrim($path, '/');

// Log para debug
// error_log("Path: " . $path);

// Rotas - verifica se começa com o caminho
if ($path === '/auth' || $path === '/auth/login' || strpos($path, '/auth/') === 0) {
    require_once __DIR__ . '/auth.php';
} elseif ($path === '/settings' || $path === '/settings/' || strpos($path, '/settings/') === 0) {
    require_once __DIR__ . '/settings.php';
} elseif ($path === '/testimonials' || $path === '/testimonials/' || strpos($path, '/testimonials') === 0) {
    require_once __DIR__ . '/testimonials.php';
} elseif ($path === '/testimonial-link' || $path === '/testimonial-link/' || strpos($path, '/testimonial-link') === 0) {
    require_once __DIR__ . '/testimonial-link.php';
} elseif ($path === '/partner-logos' || $path === '/partner-logos/' || strpos($path, '/partner-logos') === 0) {
    require_once __DIR__ . '/partner-logos.php';
} elseif (strpos($path, '/uploads/logos/') === 0 || strpos($path, '/api/uploads/logos/') === 0) {
    // Servir imagens estáticas de logos
    $filePath = str_replace('/api', '', $path);
    $file = __DIR__ . $filePath;
    if (file_exists($file) && is_file($file)) {
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $mimeTypes = [
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml'
        ];
        header('Content-Type: ' . ($mimeTypes[$ext] ?? 'application/octet-stream'));
        readfile($file);
        exit;
    }
} elseif ($path === '/health' || $path === '') {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'timestamp' => date('c')]);
} else {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Endpoint não encontrado', 'path' => $path]);
}
