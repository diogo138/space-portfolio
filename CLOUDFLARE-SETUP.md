# ☁️ Configuração Cloudflare para diogohenrique.site

Guia para configurar o domínio com Cloudflare no seu servidor Hetzner.

---

## 🎯 Escolha seu Método

Você tem duas opções:

### ✅ Opção 1: DNS Only (Mais Simples - RECOMENDADO)

**Vantagens:**
- Setup mais simples
- SSL gerenciado por você (Let's Encrypt/Certbot)
- Controle total
- Mesma configuração do DEPLOY.md principal

**Use quando:**
- Primeiro deploy
- Quer simplicidade
- Não precisa de CDN/proteção extra do Cloudflare

### ✅ Opção 2: Cloudflare Proxy (CDN + Proteção)

**Vantagens:**
- CDN global (site mais rápido no mundo todo)
- Proteção DDoS automática
- Cache inteligente
- SSL gerenciado pelo Cloudflare

**Use quando:**
- Quer performance global
- Precisa de proteção extra
- Tráfego internacional

---

## 🔧 OPÇÃO 1: DNS Only (Recomendado para começar)

### Passo 1: Configurar DNS no Cloudflare

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecione o domínio **diogohenrique.site**
3. Vá em **DNS** → **Records**

### Passo 2: Criar/Editar Registros

```
Type: A
Name: @
Content: [IP_DO_SERVIDOR_HETZNER]
Proxy status: DNS only (nuvem CINZA ☁️) ← CLIQUE PARA DEIXAR CINZA!
TTL: Auto
```

```
Type: A
Name: www
Content: [IP_DO_SERVIDOR_HETZNER]
Proxy status: DNS only (nuvem CINZA ☁️) ← CLIQUE PARA DEIXAR CINZA!
TTL: Auto
```

### Passo 3: Configurações SSL (Desabilitar temporariamente)

1. Vá em **SSL/TLS** → **Overview**
2. Modo: **Off** (temporariamente)
3. Depois que configurar Certbot, mude para **Full (strict)**

### Passo 4: Seguir DEPLOY.md Normal

Agora siga o arquivo **DEPLOY.md** normalmente:
- Configure Nginx
- Instale Certbot
- Gere certificado SSL

### Passo 5: Voltar ao Cloudflare e Ativar SSL

1. Volte ao Cloudflare
2. **SSL/TLS** → **Overview**
3. Modo: **Full (strict)**

✅ Pronto! Seu site está no ar com SSL.

---

## 🚀 OPÇÃO 2: Cloudflare Proxy (CDN)

### Passo 1: Configurar DNS no Cloudflare

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecione o domínio **diogohenrique.site**
3. Vá em **DNS** → **Records**

### Passo 2: Criar/Editar Registros

```
Type: A
Name: @
Content: [IP_DO_SERVIDOR_HETZNER]
Proxy status: Proxied (nuvem LARANJA 🟧) ← Ativo!
TTL: Auto
```

```
Type: A
Name: www
Content: [IP_DO_SERVIDOR_HETZNER]
Proxy status: Proxied (nuvem LARANJA 🟧) ← Ativo!
TTL: Auto
```

### Passo 3: Configurar SSL no Cloudflare

1. **SSL/TLS** → **Overview**
2. Modo: **Full** (não precisa do strict)
3. **Edge Certificates**:
   - ✅ Always Use HTTPS: ON
   - ✅ Automatic HTTPS Rewrites: ON
   - ✅ Minimum TLS Version: 1.2

### Passo 4: Deploy do Container

No servidor, faça o deploy normalmente:

```bash
cd /var/www/diogohenrique.site
docker-compose up -d
```

### Passo 5: Configurar Nginx (SEM Certbot!)

Use a configuração especial para Cloudflare:

```bash
# No servidor
cp /var/www/diogohenrique.site/nginx-cloudflare.conf /etc/nginx/sites-available/diogohenrique.site

# Criar link simbólico
ln -s /etc/nginx/sites-available/diogohenrique.site /etc/nginx/sites-enabled/

# Testar
nginx -t

# Recarregar
systemctl reload nginx
```

### Passo 6: Configurações Extras (Opcional)

#### 6.1 Cache do Cloudflare

1. Vá em **Caching** → **Configuration**
2. Cache Level: **Standard**
3. Browser Cache TTL: **4 hours**

#### 6.2 Page Rules (Otimizações)

1. Vá em **Rules** → **Page Rules**
2. Criar regra:

```
URL: diogohenrique.site/_next/static/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
```

#### 6.3 Speed Optimizations

1. **Speed** → **Optimization**
2. Ative:
   - ✅ Auto Minify: JavaScript, CSS, HTML
   - ✅ Brotli
   - ✅ Early Hints
   - ✅ Rocket Loader (se não quebrar o site)

### Passo 7: Testar

```bash
# Verificar se está usando Cloudflare
curl -I https://diogohenrique.site | grep -i "cf-ray"

# Se aparecer "cf-ray", está funcionando!
```

---

## 🔄 Comparação das Opções

| Recurso | DNS Only | Proxy Cloudflare |
|---------|----------|------------------|
| **SSL** | Let's Encrypt (você) | Cloudflare (automático) |
| **CDN** | ❌ | ✅ |
| **Proteção DDoS** | ❌ | ✅ |
| **Cache Global** | ❌ | ✅ |
| **IP Real Exposto** | ✅ | ❌ (protegido) |
| **Complexidade** | Simples | Média |
| **Velocidade BR** | Rápido | Rápido |
| **Velocidade Global** | Normal | Muito rápido |

---

## 🐛 Troubleshooting Cloudflare

### Erro: "Too many redirects"

**Causa:** SSL mode incompatível

**Solução:**
1. Cloudflare: **SSL/TLS** → **Full** (não Flexible)
2. Nginx: Certifique-se que está ouvindo na porta 80

### Site não carrega (Cloudflare Proxy)

**Verificar:**
```bash
# No servidor: verificar se Nginx está ok
nginx -t
systemctl status nginx

# Verificar se container está rodando
docker ps | grep space-portfolio

# Ver logs
docker-compose logs -f
```

**Testar bypass do Cloudflare:**
```bash
# Testar direto no IP (sem Cloudflare)
curl -H "Host: diogohenrique.site" http://[IP_DO_SERVIDOR]
```

### Certificado SSL inválido

**Se usando DNS Only:**
```bash
# Renovar certificado
certbot renew --force-renewal
```

**Se usando Proxy:**
- Não precisa de certificado no servidor
- Cloudflare gerencia automaticamente

### Cache não está funcionando

1. Cloudflare: **Caching** → **Purge Cache**
2. Development Mode: ON (temporariamente para testar)

---

## 📊 Verificar se Cloudflare está Ativo

### Método 1: Online

Acesse: https://www.whatsmydns.net/#A/diogohenrique.site

- Se mostrar **IPs do Cloudflare** (104.x.x.x, 172.x.x.x): Proxy Ativo
- Se mostrar **seu IP Hetzner**: DNS Only

### Método 2: Terminal

```bash
# Ver DNS
dig diogohenrique.site +short

# Ver headers
curl -I https://diogohenrique.site
# Procure por: cf-ray, cf-cache-status
```

---

## 🎯 Recomendação Final

**Para começar:**
1. Use **Opção 1 (DNS Only)**
2. Siga o **DEPLOY.md** principal
3. Teste tudo funcionando
4. Depois, se quiser, migre para Proxy (Opção 2)

**Para produção com tráfego:**
- Use **Opção 2 (Proxy)** para melhor performance e proteção

---

## 📝 Checklist Cloudflare

### DNS Only:
- [ ] Registros A configurados (nuvem CINZA)
- [ ] SSL mode: Full (strict)
- [ ] Certbot instalado e funcionando
- [ ] Site acessível via HTTPS

### Proxy Ativo:
- [ ] Registros A configurados (nuvem LARANJA)
- [ ] SSL mode: Full
- [ ] Nginx sem Certbot (HTTP only)
- [ ] Headers CF-Ray aparecendo
- [ ] Cache funcionando

---

**Pronto! Escolha sua opção e siga em frente! 🚀**
