@echo off
title BurguerSync Ourinhos - Servidor Local
echo ==============================================================================
echo    🍔 BurguerSync Ourinhos - Full-Stack Delivery & Cozinha Realtime 🍔
echo ==============================================================================
echo.
echo Iniciando servidor local na porta 3000...
echo.
echo [1/2] Abrindo Cardapio do Cliente: http://localhost:3000
start "" "http://localhost:3000"
echo [2/2] Abrindo Painel Restrito da Cozinha: http://localhost:3000/admin.html
echo (Senha de acesso ao admin: senai2026 ou admin123)
echo.
node backend/server.js
pause
