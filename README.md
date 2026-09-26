# 🍔 BurguerSync Ourinhos — Real-Time Delivery & Kitchen Kanban

<div align="center">

![BurguerSync Banner](assets/imagens/ourinhos-smash.jpg)

[![Google Antigravity](https://img.shields.io/badge/Developed%20with-Google%20Antigravity-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://antigravity.google)
[![Google Stitch](https://img.shields.io/badge/UI%2FUX-Google%20Stitch-EA4335?style=for-the-badge&logo=materialdesign&logoColor=white)](https://stitch.withgoogle.com)
[![Firebase Cloud Firestore](https://img.shields.io/badge/Database-Firebase%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![SENAI Ourinhos](https://img.shields.io/badge/SENAI-Ourinhos%20SP-E30613?style=for-the-badge&logo=googlekeep&logoColor=white)](https://sp.senai.br)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js%20v24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**[🇧🇷 Português](#-sobre-o-projeto-pt-br)** • **[🇺🇸 English](#-about-the-project-en)**

---

### 🌐 Links Oficiais da Aplicação

| Ambiente | Link de Acesso | Descrição |
| :--- | :--- | :--- |
| **🛍️ Loja do Cliente** | [Cardápio Online](https://siteprofissional1.github.io/burguersync-ourinhos/) | Catálogo com 10 hambúrgueres, 5 bebidas, carrinho e checkout Pix. |
| **👨‍🍳 Painel da Cozinha (Admin)** | [Painel da Cozinha 🔒](https://siteprofissional1.github.io/burguersync-ourinhos/admin.html) | Monitor em tempo real protegido por senha (`senai2026` ou `admin123`). |

</div>

---

## 🇧🇷 Sobre o Projeto (PT-BR)

O **BurguerSync Ourinhos** é uma aplicação web full-stack de ponta a ponta com sincronização reativa em tempo real. Desenvolvida para eliminar a perda de comandas físicas e sincronizar instantaneamente a jornada de compra do cliente com a linha de produção dos chapeiros na cozinha.

O projeto foi orquestrado através da plataforma **Google Antigravity**, integrando prototipagem de alta fidelidade via **Google Stitch MCP** e persistência serverless no **Firebase Cloud Firestore**.

### 🌟 Destaques e Funcionalidades

- **🛍️ Visão Exclusiva do Cliente (`index.html`):** 
  - Catálogo completo com **10 Hambúrgueres Artesanais** e **5 Bebidas Geladas**, além de porções rústicas.
  - Filtro interativo por categorias (**Todos**, **Hambúrgueres**, **Bebidas**, **Acompanhamentos**).
  - Gaveta expansível de carrinho com controle de quantidades e observações personalizadas por item (ex: *"Sem cebola, queijo extra"*).
  - Cálculo de subtotal automático e taxa de entrega fixa de Ourinhos (**R$ 5,00**).
  - Validação estrita cadastral com exigência do **DDD 14** (Ourinhos e região).
  - Checkout dinâmico com opção de troco para dinheiro e chave **Pix Copia e Cola**.
  
- **👨‍🍳 Painel Restrito da Cozinha & Admin (`admin.html`):**
  - **Acesso protegido por senha** (senha padrão: `senai2026` ou `admin123`) com persistência em sessão e botão de logout.
  - Métricas em tempo real no topo (**Novos Recebidos**, **Na Chapa**, **Em Despacho**, **Entregues**).
  - Escuta reativa do Firestore com `onSnapshot` e **buzzer sonoro** (Web Audio API) a cada novo pedido.
  - Cartões com informações completas do cliente, link direto de **WhatsApp** com um clique e botões de transição ergonômica de status:
    - 🔵 **Recebido** (`#00D4FF`)
    - 🟡 **Na Chapa / Em Preparo** (`#FFB800`)
    - 🟠 **Em Despacho** (`#FF9000`)
    - 🟢 **Entregue** (`#04D361`)

- **🛡️ Resiliência & Self-Annealing:** Backup de contingência em `localStorage` e reconexão automática ao Firestore.

---

## 🇺🇸 About the Project (EN)

**BurguerSync Ourinhos** is an end-to-end full-stack web application featuring real-time reactive synchronization. Designed to eliminate lost paper tickets and unify the workflow between the customer ordering experience and the kitchen grill team.

The project was architected via **Google Antigravity**, integrating high-fidelity design generation through **Google Stitch MCP** and serverless NoSQL data persistence via **Firebase Cloud Firestore**.

### 🌟 Key Features

- **🛍️ Dedicated Customer Storefront (`index.html`):**
  - Complete catalog featuring **10 Gourmet Burgers**, **5 Chilled Beverages**, and artisan sides.
  - Smooth category filter chips (**All**, **Burgers**, **Drinks**, **Sides**).
  - Responsive drawer cart with itemized custom notes (e.g., *"No onions, well-done"*).
  - Automated delivery fee calculation (fixed **R$ 5.00** for Ourinhos).
  - Regional phone validation enforcing **area code (14)**.
  - Instant Pix copy-and-paste checkout and cash change calculator.

- **👨‍🍳 Dedicated Kitchen & Admin Dashboard (`admin.html`):**
  - **Password-protected access** (default passwords: `senai2026` or `admin123`) with session state and secure logout.
  - Live metric counters (**Received**, **On Grill**, **Out for Delivery**, **Delivered**).
  - Real-time Firestore event stream (`onSnapshot`) with Web Audio kitchen buzzer chimes.
  - One-click customer WhatsApp integration and ergonomic status transition buttons.

---

## ⚡ Como Rodar Localmente no Windows

No terminal PowerShell ou Prompt de Comando:
```bash
npm start
```
*(Ou execute `.\executar.bat` no PowerShell)*

* Cardápio do Cliente: `http://localhost:3000`
* Painel da Cozinha: `http://localhost:3000/admin.html` *(Senha: `senai2026` ou `admin123`)*

---

<div align="center">
  <p>Criado por <a href="https://siteprofissional.pro" target="_blank" rel="noopener noreferrer" style="color: #0070f3; font-weight: 600;">siteprofissional.pro</a></p>
  <p><sub>SENAI Ourinhos • Formação Antigravity 2026</sub></p>
</div>
