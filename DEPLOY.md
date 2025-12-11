# 🚀 Guia de Deploy - Space Portfolio

Deploy do projeto Next.js no servidor Hetzner usando Docker + Nginx.

---

## 📋 Pré-requisitos no Servidor

Antes de começar, certifique-se que seu servidor Hetzner tem:

- ✅ Docker instalado
- ✅ Docker Compose instalado
- ✅ Nginx instalado
- ✅ Certbot para SSL (Let's Encrypt)

---

## 🔧 Passo 1: Configurar DNS do Domínio

1. Acesse o painel onde você comprou o domínio **diogohenrique.site**
2. Configure os registros DNS:

```
Tipo: A
Nome: @
Valor: [IP_DO_SEU_SERVIDOR_HETZNER]
TTL: 3600

Tipo: A
Nome: www
Valor: [IP_DO_SEU_SERVIDOR_HETZNER]
TTL: 3600
```

3. Aguarde a propagação (pode levar de minutos a algumas horas)
4. Teste com: `ping diogohenrique.site`

---

## 🖥️ Passo 2: Preparar o Servidor

Conecte-se ao servidor via SSH:

```bash
ssh root@[IP_DO_SERVIDOR]
```

### 2.1 Instalar Docker (se ainda não tiver)

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose -y

# Verificar instalação
docker --version
docker-compose --version
```

### 2.2 Criar estrutura de diretórios

```bash
# Criar diretório para o projeto
mkdir -p /var/www/diogohenrique.site
```

---

## 📤 Passo 3: Enviar Projeto para o Servidor

### Opção A: Usando o Script Automatizado (Recomendado)

No seu **computador local** (Windows):

1. Abra o arquivo `deploy.sh`
2. Substitua `SEU_IP_HETZNER` pelo IP real do servidor
3. Execute no Git Bash ou WSL:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Opção B: Manual via Git

No **servidor**:

```bash
cd /var/www/diogohenrique.site

# Clonar o repositório (se estiver no GitHub)
git clone [URL_DO_REPOSITORIO] .

# Ou receber via SCP do Windows
# No Windows (PowerShell):
# scp -r D:\projetos-pessoais\space-portfolio\* root@[IP]:/var/www/diogohenrique.site/
```

---

## 🐳 Passo 4: Build e Start do Container

No **servidor**:

```bash
cd /var/www/diogohenrique.site

# Build da imagem Docker
docker-compose build --no-cache

# Iniciar container
docker-compose up -d

# Verificar se está rodando
docker-compose ps

# Ver logs
docker-compose logs -f
```

O container estará rodando na **porta 3001** do servidor.

---

## 🌐 Passo 5: Configurar Nginx

### 5.1 Criar arquivo de configuração

No **servidor**:

```bash
# Copiar configuração do Nginx
cp /var/www/diogohenrique.site/nginx-config.conf /etc/nginx/sites-available/diogohenrique.site

# Criar link simbólico
ln -s /etc/nginx/sites-available/diogohenrique.site /etc/nginx/sites-enabled/

# Testar configuração
nginx -t
```

### 5.2 Ajustar configuração (temporária sem SSL)

Como ainda não temos SSL, edite temporariamente:

```bash
nano /etc/nginx/sites-available/diogohenrique.site
```

Use esta configuração **temporária**:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name diogohenrique.site www.diogohenrique.site;

    access_log /var/log/nginx/diogohenrique.site.access.log;
    error_log /var/log/nginx/diogohenrique.site.error.log;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 10M;
}
```

### 5.3 Reiniciar Nginx

```bash
systemctl restart nginx
systemctl status nginx
```

### 5.4 Testar

Acesse no navegador: `http://diogohenrique.site`

---

## 🔒 Passo 6: Configurar SSL (HTTPS)

### 6.1 Instalar Certbot

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y
```

### 6.2 Gerar certificado SSL

```bash
# Gerar certificado para o domínio
certbot --nginx -d diogohenrique.site -d www.diogohenrique.site

# Seguir as instruções:
# - Informar email
# - Aceitar termos
# - Escolher redirecionar HTTP para HTTPS (opção 2)
```

### 6.3 Testar renovação automática

```bash
# Testar renovação
certbot renew --dry-run
```

O Certbot configurará automaticamente a renovação.

### 6.4 Aplicar configuração completa do Nginx

Agora substitua pela configuração completa com SSL:

```bash
cp /var/www/diogohenrique.site/nginx-config.conf /etc/nginx/sites-available/diogohenrique.site
nginx -t
systemctl reload nginx
```

---

## ✅ Passo 7: Verificar Deploy

1. Acesse: `https://diogohenrique.site` ✅
2. Verifique o certificado SSL (cadeado verde)
3. Teste a responsividade do site

---

## 🔄 Como Atualizar o Site

### Método 1: Script Automatizado

```bash
./deploy.sh
```

### Método 2: Manual

No **servidor**:

```bash
cd /var/www/diogohenrique.site

# Atualizar código (se usar Git)
git pull

# Reconstruir container
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Verificar
docker-compose logs -f
```

---

## 📊 Comandos Úteis

### Gerenciar Container

```bash
# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f

# Parar container
docker-compose down

# Reiniciar container
docker-compose restart

# Reconstruir
docker-compose up -d --build
```

### Gerenciar Nginx

```bash
# Testar configuração
nginx -t

# Recarregar configuração
systemctl reload nginx

# Reiniciar Nginx
systemctl restart nginx

# Ver logs
tail -f /var/log/nginx/diogohenrique.site.access.log
tail -f /var/log/nginx/diogohenrique.site.error.log
```

### Monitoramento

```bash
# Ver uso de recursos
docker stats

# Ver espaço em disco
df -h

# Ver memória
free -h

# Ver processos Docker
docker ps -a
```

---

## 🐛 Troubleshooting

### Site não carrega

```bash
# Verificar se container está rodando
docker-compose ps

# Ver logs do container
docker-compose logs --tail=100

# Verificar se porta 3001 está ouvindo
netstat -tlnp | grep 3001

# Verificar Nginx
nginx -t
systemctl status nginx
```

### Erro de build Docker

```bash
# Limpar cache do Docker
docker system prune -a

# Reconstruir do zero
docker-compose build --no-cache
```

### Certificado SSL não funciona

```bash
# Verificar certificados
certbot certificates

# Renovar manualmente
certbot renew --force-renewal

# Verificar configuração do Nginx
nginx -t
```

---

## 📁 Estrutura no Servidor

```
/var/www/diogohenrique.site/
├── app/
├── components/
├── constants/
├── public/
├── .next/
├── Dockerfile
├── docker-compose.yml
├── nginx-config.conf
├── package.json
└── next.config.js

/etc/nginx/sites-available/
└── diogohenrique.site

/etc/letsencrypt/live/diogohenrique.site/
├── fullchain.pem
└── privkey.pem
```

---

## 🎯 Checklist Final

- [ ] DNS configurado e propagado
- [ ] Docker e Docker Compose instalados
- [ ] Projeto enviado para `/var/www/diogohenrique.site`
- [ ] Container rodando (porta 3001)
- [ ] Nginx configurado
- [ ] SSL configurado (Certbot)
- [ ] Site acessível via HTTPS
- [ ] Certificado SSL válido

---

## 💡 Dicas

1. **Backup**: Configure backups regulares do diretório do projeto
2. **Logs**: Monitore os logs regularmente para identificar problemas
3. **Atualizações**: Mantenha Docker, Nginx e certificados atualizados
4. **Firewall**: Configure firewall (UFW) para permitir apenas portas necessárias (80, 443, 22)
5. **Monitoramento**: Configure alertas para quando o container cair

---

## 🔥 Comandos Rápidos de Deploy

```bash
# Deploy completo (no servidor)
cd /var/www/diogohenrique.site && \
git pull && \
docker-compose down && \
docker-compose build --no-cache && \
docker-compose up -d && \
docker-compose logs --tail=50
```

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Verificar logs do container: `docker-compose logs -f`
2. Verificar logs do Nginx: `tail -f /var/log/nginx/diogohenrique.site.error.log`
3. Verificar status do sistema: `docker ps`, `systemctl status nginx`

---

**Bom deploy! 🚀**
