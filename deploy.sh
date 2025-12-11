#!/bin/bash

# Script de deploy automatizado para space-portfolio
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando deploy do Space Portfolio..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
SERVER_USER="root"
SERVER_HOST="SEU_IP_HETZNER"  # Substitua pelo IP do seu servidor
SERVER_PATH="/var/www/diogohenrique.site"
DOCKER_COMPOSE_FILE="docker-compose.yml"

echo -e "${BLUE}📦 Criando arquivo de build...${NC}"
tar -czf space-portfolio.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='*.tar.gz' \
  .

echo -e "${BLUE}📤 Enviando arquivos para o servidor...${NC}"
scp space-portfolio.tar.gz ${SERVER_USER}@${SERVER_HOST}:~

echo -e "${BLUE}🔧 Configurando no servidor...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} << 'ENDSSH'
  set -e

  # Criar diretório se não existir
  mkdir -p /var/www/diogohenrique.site

  # Extrair arquivos
  cd /var/www/diogohenrique.site
  tar -xzf ~/space-portfolio.tar.gz

  # Remover arquivo temporário
  rm ~/space-portfolio.tar.gz

  # Build e start do container
  docker-compose down 2>/dev/null || true
  docker-compose build --no-cache
  docker-compose up -d

  # Verificar status
  docker-compose ps

  echo "✅ Deploy concluído!"
ENDSSH

echo -e "${GREEN}✅ Deploy finalizado com sucesso!${NC}"
echo -e "${GREEN}🌐 Site disponível em: http://diogohenrique.site${NC}"

# Limpar arquivo local
rm space-portfolio.tar.gz

echo -e "${BLUE}📊 Logs do container:${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} "cd /var/www/diogohenrique.site && docker-compose logs --tail=50"
