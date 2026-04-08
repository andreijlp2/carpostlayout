-- Banco de dados CarPost
CREATE DATABASE IF NOT EXISTS carpostcom_site;
USE carpostcom_site;

-- Tabela de usuários (admin)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  google_analytics_id VARCHAR(100),
  google_tag_manager_id VARCHAR(100),
  meta_pixel_id VARCHAR(100),
  youtube_video_id VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de depoimentos
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  stars INT NOT NULL,
  content TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de links temporários para depoimentos
CREATE TABLE IF NOT EXISTS testimonial_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de logos parceiros
CREATE TABLE IF NOT EXISTS partner_logos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar usuário admin (senha: and@_2637)
DELETE FROM users WHERE email = 'andreijlp@hotmail.com';
INSERT INTO users (email, password) VALUES ('andreijlp@hotmail.com', '$2y$10$8K1p/a0dL5.E6N5Z8K9J0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U');

-- Inserir configurações padrão
INSERT INTO settings (google_analytics_id, google_tag_manager_id, meta_pixel_id, youtube_video_id)
SELECT '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM settings LIMIT 1);
