/**
 * ==============================================================================
 * BurguerSync Ourinhos - Servidor Local de Desenvolvimento e API (Layer 3)
 * ==============================================================================
 * Suporte a rotas limpas (/ para o cardápio e /admin para o painel restrito da cozinha)
 * com headers de CORS e resolução de arquivos estáticos.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Rota de Health Check
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', servico: 'BurguerSync Ourinhos API', uptime: process.uptime() }));
    return;
  }

  // Normaliza caminho da requisição
  let requestPath = req.url.split('?')[0];

  if (requestPath === '/' || requestPath === '') {
    requestPath = '/index.html';
  } else if (requestPath === '/admin' || requestPath === '/cozinha') {
    requestPath = '/admin.html';
  }

  let safePath = path.normalize(requestPath);
  const filePath = path.join(PUBLIC_DIR, safePath);

  // Impede Directory Traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Acesso proibido.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado no servidor local.');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🍔 BurguerSync Ourinhos - Servidor Local Ativo!`);
  console.log(`🛍️  Link do Cliente (Cardápio): http://localhost:${PORT}`);
  console.log(`👨‍🍳 Link do Admin (Cozinha):   http://localhost:${PORT}/admin.html`);
  console.log(`🔐 Senha padrão do Admin:     senai2026 ou admin123`);
  console.log(`======================================================\n`);
});
