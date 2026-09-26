# 📋 Instruções de Operação - BurguerSync Ourinhos

Guia rápido de comandos e rotinas para execução, teste e deploy do projeto **BurguerSync Ourinhos**.

---

## 🚀 1. Inicialização Rápida no Windows / PowerShell

No terminal PowerShell ou Prompt de Comando:
```bash
npm start
```
*(Ou execute `.\executar.bat` no PowerShell / clique duas vezes no `executar.bat` no Explorer).*

### 🌐 Links Separados de Acesso:
* **🛍️ Área do Cliente (Cardápio & Pedidos):** [`http://localhost:3000`](http://localhost:3000)
* **👨‍🍳 Painel da Cozinha (Admin Restrito):** [`http://localhost:3000/admin.html`](http://localhost:3000/admin.html)

### 🔐 Credenciais de Acesso da Cozinha:
* **Senhas aceitas:** `senai2026` ou `admin123` *(ou `burguer123`)*

---

## 🍔 2. Catálogo Expandido

* **10 Hambúrgueres Artesanais:**
  1. Ourinhos Smash Burguer (R$ 28,00)
  2. Monster Bacon SENAI (R$ 34,00)
  3. Duplo Cheddar Melt (R$ 32,00)
  4. Smokehouse BBQ Artesanal (R$ 36,00)
  5. Trufado Gorgonzola Burger (R$ 39,00)
  6. Crispy Chicken Supreme (R$ 27,00)
  7. Costela Desfiada 8 Horas (R$ 38,00)
  8. Jalapeño Fire Smash (R$ 31,00)
  9. Veggie Cogumelos Salteados (R$ 33,00)
  10. Triplo Smash Vulcão (R$ 42,00)
* **5 Bebidas Geladas:**
  1. Coca-Cola Original Lata 350ml (R$ 6,00)
  2. Coca-Cola Sem Açúcar 350ml (R$ 6,00)
  3. Guaraná Antarctica Lata 350ml (R$ 6,00)
  4. Suco Natural de Laranja 500ml (R$ 10,00)
  5. Cerveja Artesanal IPA Ourinhos 500ml (R$ 18,00)
* **Acompanhamentos:**
  1. Batata Rústica Suprema (R$ 18,00)

---

## 🧪 3. Rotinas de Testes e Validação Determinística (Layer 3)

### Validação de Schemas e Regras de Negócio:
```bash
node execution/validate_schema.js
```

### Teste de Conexão com Firebase Firestore:
```bash
node execution/test_firebase_connection.js
```

### Teste End-to-End do Ciclo Operacional:
```bash
node execution/test_full_order_flow.js
```

---

## ☁️ 4. Deploy no GitHub Pages
* **Repositório Público:** [https://github.com/siteprofissional1/burguersync-ourinhos](https://github.com/siteprofissional1/burguersync-ourinhos)
* **Cardápio Online (Cliente):** [https://siteprofissional1.github.io/burguersync-ourinhos/](https://siteprofissional1.github.io/burguersync-ourinhos/)
* **Painel da Cozinha Online (Admin):** [https://siteprofissional1.github.io/burguersync-ourinhos/admin.html](https://siteprofissional1.github.io/burguersync-ourinhos/admin.html)
