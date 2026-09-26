# 📋 Instruções de Operação - BurguerSync Ourinhos

Guia rápido de comandos e rotinas para execução, teste e deploy do projeto **BurguerSync Ourinhos**.

---

## 🚀 1. Inicialização Rápida no Windows

Basta clicar duas vezes no script:
```cmd
executar.bat
```
Ou executar diretamente via terminal:
```bash
npm start
```
Acesse a aplicação no navegador em: **`http://localhost:3000`**

---

## 🧪 2. Rotinas de Testes e Validação Determinística (Layer 3)

### Validação de Schemas e Regras de Negócio:
```bash
node execution/validate_schema.js
```
*Testa a integridade de dados, máscara de DDD 14 e taxa de R$ 5,00.*

### Teste de Conexão com Firebase Firestore:
```bash
node execution/test_firebase_connection.js
```
*Executa escrita, leitura e limpeza de documento de teste na coleção `pedidos`.*

---

## 🌐 3. Estrutura de Diretórios

```text
├── .env                     # Chaves de API e credenciais
├── .tmp/                    # Dados transitórios de debug e schema
├── assets/imagens/          # Imagens oficiais dos produtos
├── backend/                 # Regras do Firestore e servidor local
├── directives/              # SOPs e manuais de estratégia (Layer 1)
├── documentation/           # Documentação de arquitetura e promptHistory.md
├── execution/               # Scripts determinísticos de teste (Layer 3)
├── frontend/                # Espelhamento dos módulos e arquivos do cliente
├── src/                     # Código modular ES6 (cliente, cozinha, firebase)
├── index.html               # Aplicação principal unificada
├── style.css                # Folha de estilos Dark Mode com neons
├── executar.bat             # Inicializador em lote no Windows
└── README.md                # Apresentação bilíngue e badges
```

---

## ☁️ 4. Deploy no GitHub Pages
O projeto é 100% estático no cliente e conecta-se via CDN ao Firebase Cloud Firestore, tornando-o diretamente publicável no GitHub Pages via branch `main` na raiz `/`.
