@echo off
echo Iniciando servidor local...
echo Acesse: http://localhost:3000/meudenerosapp/
echo Pressione Ctrl+C para parar.
cd /d "%~dp0.."
npx serve . --listen 3000 --no-clipboard
