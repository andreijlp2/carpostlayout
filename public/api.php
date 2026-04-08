<?php
/**
 * Router de Emergência CarPost
 * Este arquivo vive na raiz do site para contornar problemas de roteamento de subpastas.
 */

$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

// Remove a parte do script (/api.php) do path se presente
$path = str_replace('/api.php', '', $path);
// Também remove /api caso o frontend ainda envie
$path = str_replace('/api', '', $path);

// Normalização final
$path = rtrim($path, '/');
if (empty($path)) $path = '/';

// Define o diretório base das APIs (subpasta api/)
$apiBase = __DIR__ . '/api';

// Rotas Baseadas na URL Amigável
if ($path === '/auth' || $path === '/auth/login' || strpos($path, '/auth/') === 0) {
    require_once $apiBase . '/auth.php';
} elseif ($path === '/settings' || $path === '/settings/' || strpos($path, '/settings/') === 0) {
    require_once $apiBase . '/settings.php';
} elseif ($path === '/testimonials' || $path === '/testimonials/' || strpos($path, '/testimonials') === 0) {
    require_once $apiBase . '/testimonials.php';
} elseif ($path === '/testimonial-link' || $path === '/testimonial-link/' || strpos($path, '/testimonial-link') === 0) {
    require_once $apiBase . '/testimonial-link.php';
} elseif ($path === '/partner-logos' || $path === '/partner-logos/' || strpos($path, '/partner-logos') === 0) {
    require_once $apiBase . '/partner-logos.php';
} elseif (strpos($path, '/uploads/logos/') === 0) {
    // Servir imagens estáticas de logos
    $file = $apiBase . $path;
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
} elseif ($path === '/health' || $path === '/') {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'online', 'mode' => 'bypass', 'timestamp' => date('c')]);
} else {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Endpoint não encontrado no router de emergência',
        'requested_path' => $path,
        'method' => $_SERVER['REQUEST_METHOD']
    ]);
}
