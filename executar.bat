@echo off
title BurguerSync Ourinhos - Servidor Local
echo ======================================================
echo    🍔 BurguerSync Ourinhos - Full-Stack Realtime 🍔
echo ======================================================
echo.
echo Iniciando servidor local na porta 3000...
echo.
start "" "http://localhost:3000"
node backend/server.js
pause
