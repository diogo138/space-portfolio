#!/bin/bash

# Script para verificar o estado atual do servidor antes do deploy
# Execute no servidor: bash verify-server.sh

echo "🔍 Verificando configuração do servidor..."
echo ""

echo "==================================="
echo "1. Sites Nginx Configurados:"
echo "==================================="
ls -la /etc/nginx/sites-enabled/
echo ""

echo "==================================="
echo "2. Portas em Uso:"
echo "==================================="
echo "Porta 80 (HTTP):"
netstat -tlnp | grep :80
echo ""
echo "Porta 443 (HTTPS):"
netstat -tlnp | grep :443
echo ""
echo "Porta 3001 (Futuro portfólio):"
netstat -tlnp | grep :3001
echo ""
echo "Porta 5678 (n8n):"
netstat -tlnp | grep :5678
echo ""

echo "==================================="
echo "3. Containers Docker Ativos:"
echo "==================================="
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"
echo ""

echo "==================================="
echo "4. Espaço em Disco:"
echo "==================================="
df -h /var/www
echo ""

echo "==================================="
echo "5. Diretórios /var/www:"
echo "==================================="
ls -lh /var/www/
echo ""

echo "==================================="
echo "6. Versões Instaladas:"
echo "==================================="
echo "Docker: $(docker --version)"
echo "Docker Compose: $(docker-compose --version)"
echo "Nginx: $(nginx -v 2>&1)"
echo ""

echo "==================================="
echo "7. Teste Configuração Nginx:"
echo "==================================="
nginx -t
echo ""

echo "✅ Verificação concluída!"
echo ""
echo "📝 Notas:"
echo "- Porta 3001 deve estar LIVRE (sem output)"
echo "- Nginx deve estar OK (successful)"
echo "- Deve haver espaço suficiente em disco"
