# Diretriz de Design UI/UX: BurguerSync Ourinhos

## 1. Visão Geral e Filosofia de Design

O **BurguerSync Ourinhos** é uma aplicação web progressiva e moderna voltada para entrega de hambúrgueres artesanais e gestão operacional de cozinha em tempo real. A experiência visual combina a conveniência dinâmica de aplicativos de delivery com uma atmosfera gastronômica noturna imersiva em Dark Mode.

A interface é orientada a duas jornadas operacionais complementares:

* **Visão do Cliente:** Vitrine fluida de lanches, carrinho reativo, cálculo automático de frete e checkout objetivo.


* **Visão da Cozinha:** Painel kanban em tempo real com controle de status visual de pedidos e destaque de observações operacionais.



---

## 2. Paleta de Cores Hexadecimal (Dark Mode & Neons)

### Cores de Fundo e Superfícies

* **Fundo Global Primário (Canvas):** `#0A0A0C` (Preto absoluto profundo com leve matiz carvão, reduz o cansaço visual e maximiza o contraste luminoso).
* **Fundo Secundário (Containers e Modais):** `#121214` (Cinza escuro para cabeçalhos, barras de navegação e containers de seção).


* **Superfície de Cards (Elevated Surface):** `#202024` (Cinza grafite refinado para os cartões de lanches, resumo do carrinho e pedidos da cozinha).


* **Superfície em Foco / Hover:** `#2A2A30` (Cinza intermediário com luminosidade superior para estados ativos e foco).
* **Bordas Estruturais:** `#323238` (Linhas de contorno sutis para separar elementos sem poluição visual).

### Cores de Marca e Ações Primárias

* **Laranja Neon (Brand / Apetite / Botões Principais):** `#FF9000` (Tom cítrico vibrante de alto apelo gastronômico para CTAs de adicionar e destaques de preço).


* **Laranja Neon Hover:** `#FFA826` (Elevação luminosa ao passar o mouse).
* **Amarelo Neon (Atenção / Observações / Destaques):** `#FFB800` (Usado para advertências, observações personalizadas de lanches e badges de preparo).


* **Verde Neon (Confirmação / Conclusão / Checkout):** `#04D361` (Verde vibrante de alta conversão para o botão final de envio e pedidos concluídos).


* **Verde Neon Hover:** `#1FE075` (Estado ativo com brilho pulsante).

### Cores de Status Operacional (Painel da Cozinha)

* **Status Recebido:** `#00D4FF` (Ciano elétrico para novos pedidos pendentes de ação).


* **Status Em Preparo:** `#FFB800` (Amarelo ouro neon para pedidos em chapa e montagem).


* **Status Saiu para Entrega:** `#FF9000` (Laranja quente para pedidos a caminho do destino).


* **Status Entregue:** `#04D361` (Verde esmeralda neon para finalização bem-sucedida).


* **Status Cancelado / Alerta:** `#FF334B` (Vermelho neon para estornos ou cancelamentos).

### Tipografia e Contraste

* **Texto Principal (High Emphasis):** `#F5F7FA` (Branco gelo para títulos, nomes dos lanches e valores monetários).
* **Texto Secundário (Medium Emphasis):** `#A8A8B3` (Cinza médio para descrições de ingredientes e rótulos de campos de entrega).
* **Texto Desabilitado / Placeholder:** `#6B6B76` (Cinza escuro para dicas de preenchimento e separadores secundários).

---

## 3. Tipografia e Hierarquia Visual

### Famílias Tipográficas

* **Títulos e Valores (Display):** `'Poppins', -apple-system, BlinkMacSystemFont, sans-serif` (Tipografia geométrica de peso marcante, trazendo modernidade e impacto gastronômico).
* **Textos de Apoio e Formulários (Body):** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` (Tipografia neutra com leitura nítida em telas de diferentes densidades de pixels).

### Hierarquia e Escala Tipográfica

* **Título Principal de Página (H1):** Tamanho `2.25rem` (36px) no desktop e `1.75rem` (28px) no celular. Peso 800 (Extra Bold). Line-height `1.2`. Espaçamento entre letras `-0.02em`.
* **Títulos de Seções e Cabeçalhos de Painel (H2):** Tamanho `1.5rem` (24px) no desktop e `1.25rem` (20px) no celular. Peso 700 (Bold). Line-height `1.3`.
* **Nomes dos Lanches e Títulos de Cards (H3):** Tamanho `1.125rem` (18px). Peso 600 (Semi Bold). Line-height `1.4`. Cor `#F5F7FA`.
* **Preços em Destaque:** Tamanho `1.25rem` (20px). Peso 700 (Bold). Cor `#FF9000` com display numérico tabular.


* **Corpo de Texto (Descrições de Itens):** Tamanho `0.938rem` (15px). Peso 400 (Regular). Line-height `1.6`. Cor `#A8A8B3`.
* **Rótulos de Formulário (Labels):** Tamanho `0.875rem` (14px). Peso 600 (Semi Bold). Cor `#F5F7FA`.
* **Badges de Status e Microtextos:** Tamanho `0.75rem` (12px). Peso 700 (Bold). Caixa alta (Uppercase) com `letter-spacing: 0.08em`.

---

## 4. Estrutura de HTML5 Semântico

### Mapeamento de IDs Essenciais

* `#app`: Container raiz de gerenciamento de estado da interface.
* `#navModo`: Seletor de abas para alternar entre visão do cliente e visão da cozinha.


* `#btnModoCliente`: Gatilho de navegação para a experiência de compra do cliente.


* `#btnModoCozinha`: Gatilho de navegação para o painel em tempo real da cozinha.


* `#viewCliente`: Seção principal que engloba o catálogo de produtos e fluxo de compra.


* `#vitrineLanches`: Grade semântica de exibição dos cartões de hambúrgueres e acompanhamentos.


* `#carrinho`: Painel flutuante ou barra lateral dedicada à revisão do pedido.


* `#contadorItensCarrinho`: Badge numérico indicando a quantidade de itens no carrinho.


* `#listaItensCarrinho`: Lista de itens adicionados com seletores de quantidade e observações.


* `#resumoFinanceiro`: Bloco com valores de subtotal, taxa fixa de entrega e total geral.


* `#subtotalValor`: Elemento que exibe o somatório dos itens.


* `#taxaEntregaValor`: Elemento com o valor da taxa de entrega fixa de Ourinhos (R$ 5,00).


* `#totalGeralValor`: Elemento de exibição do total final consolidado.


* `#formEntrega`: Formulário de dados cadastrais e endereço para despacho.


* `#nomeCliente`: Campo de texto para o nome completo do cliente.


* `#emailCliente`: Campo para o e-mail do cliente.


* `#telefoneCliente`: Campo para número de WhatsApp/celular do cliente.


* `#enderecoRua`: Campo com a rua ou avenida da entrega.


* `#enderecoNumero`: Campo com o número do imóvel.


* `#enderecoBairro`: Campo do bairro de Ourinhos.


* `#enderecoReferencia`: Campo opcional com ponto de referência.


* `#obsEntrega`: Instruções adicionais de entrega (ex: portaria, interfone).


* `#tipoPagamento`: Conjunto de opções de seleção do método de pagamento.


* `#campoTroco`: Campo condicional ativado ao escolher pagamento em dinheiro.


* `#pixCheckout`: Bloco com Chave Copia e Cola e QR Code dinâmico.


* `#btnFinalizarPedido`: Botão de ação de destaque verde para disparo do pedido à cozinha.


* `#viewCozinha`: Seção operacional do painel administrativo da cozinha.


* `#listaPedidos`: Grade dinâmica dos pedidos recebidos organizados por horário.



### Estrutura Semântica Base (Esqueleto HTML5)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BurguerSync Ourinhos - Delivery & Cozinha</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <!-- Topbar & Alternador de Modo -->
    <header class="topbar-app">
      <div class="topbar-brand">
        <span class="brand-glow">BurguerSync</span> Ourinhos
      </div>
      <nav id="navModo" aria-label="Modo de Operação">
        <button id="btnModoCliente" class="tab-btn active" type="button">🛍️ Fazer Pedido</button>
        <button id="btnModoCozinha" class="tab-btn" type="button">👨‍🍳 Painel da Cozinha</button>
      </nav>
    </header>

    <main class="main-content">
      <!-- VISÃO 1: ÁREA DO CLIENTE -->
      <section id="viewCliente" class="view-panel active">
        <header class="section-intro">
          <h2>Cardápio Artesanal</h2>
          <p>Selecione seus lanches com blends prensados e ingredientes selecionados.</p>
        </header>

        <!-- Vitrine de Lanches -->
        <section id="vitrineLanches" class="menu-grid" aria-label="Cardápio de Lanches">
          <!-- Card de Exemplo 1 -->
          <article class="card-lanche" data-id="1">
            <div class="card-media">
              <img src="assets/imagens/ourinhos-smash.jpg" alt="Ourinhos Smash Burguer" class="lanche-img" loading="lazy">
              <span class="badge-tag">Mais Vendido</span>
            </div>
            <div class="card-body">
              <h3 class="lanche-titulo">Ourinhos Smash Burguer</h3>
              <p class="lanche-descricao">Pão brioche tostado na manteiga, 2x smash burger artesanal de 80g, queijo cheddar cremoso e bacon crocante.</p>
              <div class="card-footer">
                <span class="preco-lanche">R$ 28,00</span>
                <button type="button" class="btn-add-carrinho" data-id="1">+ Adicionar</button>
              </div>
            </div>
          </article>

          <!-- Card de Exemplo 2 -->
          <article class="card-lanche" data-id="2">
            <div class="card-media">
              <img src="assets/imagens/monster-bacon.jpg" alt="Monster Bacon SENAI" class="lanche-img" loading="lazy">
            </div>
            <div class="card-body">
              <h3 class="lanche-titulo">Monster Bacon SENAI</h3>
              <p class="lanche-descricao">Pão australiano macio, 200g de blend bovino no ponto, camadas fartas de bacon caramelizado, onion rings e molho especial.</p>
              <div class="card-footer">
                <span class="preco-lanche">R$ 34,00</span>
                <button type="button" class="btn-add-carrinho" data-id="2">+ Adicionar</button>
              </div>
            </div>
          </article>

          <!-- Card de Exemplo 3 -->
          <article class="card-lanche" data-id="3">
            <div class="card-media">
              <img src="assets/imagens/batata-suprema.jpg" alt="Batata Rústica Suprema" class="lanche-img" loading="lazy">
            </div>
            <div class="card-body">
              <h3 class="lanche-titulo">Batata Rústica Suprema</h3>
              <p class="lanche-descricao">Batatas cortadas em gomos crocantes por fora e macias por dentro, cobertas com fondue de cheddar e farofa de bacon artesanal.</p>
              <div class="card-footer">
                <span class="preco-lanche">R$ 18,00</span>
                <button type="button" class="btn-add-carrinho" data-id="3">+ Adicionar</button>
              </div>
            </div>
          </article>
        </section>

        <!-- Container do Carrinho e Checkout -->
        <aside id="carrinho" class="carrinho-drawer">
          <div class="carrinho-header">
            <h3>Seu Pedido (<span id="contadorItensCarrinho">0</span>)</h3>
            <button type="button" class="btn-fechar-carrinho" aria-label="Fechar Carrinho">✕</button>
          </div>

          <div class="carrinho-conteudo">
            <ul id="listaItensCarrinho" class="itens-carrinho-lista">
              <!-- Itens injetados dinamicamente via JS -->
            </ul>

            <div id="resumoFinanceiro" class="resumo-financeiro">
              <div class="linha-resumo">
                <span>Subtotal</span>
                <span id="subtotalValor">R$ 0,00</span>
              </div>
              <div class="linha-resumo">
                <span>Taxa de Entrega (Ourinhos)</span>
                <span id="taxaEntregaValor">R$ 5,00</span>
              </div>
              <div class="linha-resumo linha-total">
                <span>Total Geral</span>
                <span id="totalGeralValor">R$ 5,00</span>
              </div>
            </div>

            <!-- Formulário de Entrega e Pagamento -->
            <form id="formEntrega" class="form-entrega" novalidate>
              <fieldset class="form-grupo">
                <legend>Dados de Contato</legend>
                <div class="input-control">
                  <label for="nomeCliente">Nome Completo</label>
                  <input type="text" id="nomeCliente" name="nomeCliente" required placeholder="Ex: Victor César">
                </div>
                <div class="input-control">
                  <label for="emailCliente">E-mail</label>
                  <input type="email" id="emailCliente" name="emailCliente" required placeholder="seuemail@exemplo.com">
                </div>
                <div class="input-control">
                  <label for="telefoneCliente">WhatsApp / Celular</label>
                  <input type="tel" id="telefoneCliente" name="telefoneCliente" required placeholder="(14) 99999-9999">
                </div>
              </fieldset>

              <fieldset class="form-grupo">
                <legend>Endereço de Entrega (Ourinhos-SP)</legend>
                <div class="grid-form-duplo">
                  <div class="input-control flex-grow">
                    <label for="enderecoRua">Rua / Avenida</label>
                    <input type="text" id="enderecoRua" name="enderecoRua" required placeholder="Ex: Rua Vitório Christoni">
                  </div>
                  <div class="input-control w-pequeno">
                    <label for="enderecoNumero">Número</label>
                    <input type="text" id="enderecoNumero" name="enderecoNumero" required placeholder="1500">
                  </div>
                </div>
                <div class="input-control">
                  <label for="enderecoBairro">Bairro</label>
                  <input type="text" id="enderecoBairro" name="enderecoBairro" required placeholder="Ex: Vila São Luiz">
                </div>
                <div class="input-control">
                  <label for="enderecoReferencia">Ponto de Referência</label>
                  <input type="text" id="enderecoReferencia" name="enderecoReferencia" placeholder="Ex: Próximo à praça central">
                </div>
                <div class="input-control">
                  <label for="obsEntrega">Instruções para o Entregador</label>
                  <textarea id="obsEntrega" name="obsEntrega" rows="2" placeholder="Ex: Tocar o interfone 22 ou deixar na portaria"></textarea>
                </div>
              </fieldset>

              <fieldset class="form-grupo">
                <legend>Forma de Pagamento</legend>
                <div id="tipoPagamento" class="pagamento-opcoes">
                  <label class="radio-card">
                    <input type="radio" name="pagamentoMetodo" value="pix" checked>
                    <span class="radio-custom"></span>
                    <span class="radio-label">⚡ Pix Instantâneo</span>
                  </label>
                  <label class="radio-card">
                    <input type="radio" name="pagamentoMetodo" value="cartao">
                    <span class="radio-custom"></span>
                    <span class="radio-label">💳 Cartão na Entrega</span>
                  </label>
                  <label class="radio-card">
                    <input type="radio" name="pagamentoMetodo" value="dinheiro">
                    <span class="radio-custom"></span>
                    <span class="radio-label">💵 Dinheiro</span>
                  </label>
                </div>

                <!-- Campo Troco (Condicional) -->
                <div id="campoTroco" class="input-control troco-box hidden">
                  <label for="trocoPara">Precisa de troco para quanto?</label>
                  <input type="text" id="trocoPara" name="trocoPara" placeholder="Ex: R$ 50,00">
                </div>

                <!-- Painel Pix (Condicional) -->
                <div id="pixCheckout" class="pix-info-box">
                  <div class="pix-badge">Chave Pix Oficial</div>
                  <p class="pix-instrucao">Faça a transferência e seu pedido entrará em preparo imediatamente.</p>
                  <div class="pix-copia-cola">
                    <code>pix@burguersync.ourinhos.com.br</code>
                    <button type="button" class="btn-copiar-pix">Copiar</button>
                  </div>
                </div>
              </fieldset>

              <button type="submit" id="btnFinalizarPedido" class="btn-checkout-neon">
                Finalizar e Enviar Pedido para a Cozinha
              </button>
            </form>
          </div>
        </aside>
      </section>

      <!-- VISÃO 2: PAINEL DA COZINHA -->
      <section id="viewCozinha" class="view-panel">
        <header class="section-intro">
          <div class="cozinha-title-row">
            <h2>Pedidos em Tempo Real</h2>
            <div class="conexao-status">
              <span class="pulse-indicator"></span> Cozinha Operando
            </div>
          </div>
          <p>Acompanhe, gerencie e avance os pedidos diretamente para a chapa e expedição.</p>
        </header>

        <section id="listaPedidos" class="kanban-pedidos" aria-label="Lista de Pedidos">
          <!-- Card de Exemplo de Pedido na Cozinha -->
          <article class="card-pedido-cozinha" data-pedido-id="101">
            <header class="pedido-top">
              <div class="pedido-meta">
                <span class="pedido-numero">#101</span>
                <time class="pedido-hora">19:42</time>
              </div>
              <span class="badge-status badge-preparo">Em Preparo</span>
            </header>

            <div class="pedido-cliente-info">
              <h4>Victor César</h4>
              <p>Rua Vitório Christoni, 1500 - Vila São Luiz</p>
              <p class="pedido-whatsapp">📱 (14) 99895-1657</p>
            </div>

            <div class="pedido-itens-bloco">
              <h5>Itens Solicitados:</h5>
              <ul class="pedido-itens-lista">
                <li>
                  <span class="item-qtd">1x</span>
                  <span class="item-nome">Ourinhos Smash Burguer</span>
                  <p class="obs-item-destaque">⚠️ Obs: Sem cebola, cheddar extra bem derretido.</p>
                </li>
                <li>
                  <span class="item-qtd">1x</span>
                  <span class="item-nome">Batata Rústica Suprema</span>
                </li>
              </ul>
            </div>

            <div class="pedido-pagamento-info">
              <span>Pagamento: <strong>Pix (Aprovado)</strong></span>
              <span>Total: <strong>R$ 51,00</strong></span>
            </div>

            <footer class="pedido-acoes-status">
              <button type="button" class="btn-status-acao btn-status-recebido" data-target="recebido">Recebido</button>
              <button type="button" class="btn-status-acao btn-status-preparo active" data-target="preparo">Em Preparo</button>
              <button type="button" class="btn-status-acao btn-status-entrega" data-target="entrega">Saiu para Entrega</button>
              <button type="button" class="btn-status-acao btn-status-entregue" data-target="entregue">Entregue</button>
            </footer>
          </article>
        </section>
      </section>
    </main>
  </div>
</body>
</html>

```

---

## 5. Estilo CSS3 Moderno

```css
/* =========================================================
   VARIÁVEIS DO DESIGN SYSTEM (CUSTOM PROPERTIES)
   ========================================================= */
:root {
  /* Superfícies e Fundos */
  --bg-canvas: #0A0A0C;
  --bg-surface: #121214;
  --bg-card: #202024;
  --bg-card-hover: #2A2A30;
  --border-subtle: #323238;
  --border-highlight: #424249;

  /* Cores de Marca e Neons */
  --neon-orange: #FF9000;
  --neon-orange-glow: rgba(255, 144, 0, 0.45);
  --neon-yellow: #FFB800;
  --neon-yellow-glow: rgba(255, 184, 0, 0.4);
  --neon-green: #04D361;
  --neon-green-glow: rgba(4, 211, 97, 0.45);
  --neon-cyan: #00D4FF;
  --neon-cyan-glow: rgba(0, 212, 255, 0.4);

  /* Tipografia */
  --font-display: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --text-primary: #F5F7FA;
  --text-secondary: #A8A8B3;
  --text-muted: #6B6B76;

  /* Transições e Sombras */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --shadow-card: 0 10px 25px rgba(0, 0, 0, 0.5);
  --shadow-glow-orange: 0 0 20px var(--neon-orange-glow);
  --shadow-glow-green: 0 0 25px var(--neon-green-glow);
}

/* =========================================================
   RESET E BASE (MOBILE-FIRST)
   ========================================================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button, input, textarea {
  font-family: inherit;
  color: inherit;
}

/* =========================================================
   CABEÇALHO & NAVEGAÇÃO DE MODOS
   ========================================================= */
.topbar-app {
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}

.topbar-brand {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand-glow {
  color: var(--neon-orange);
  text-shadow: 0 0 12px var(--neon-orange-glow);
}

#navModo {
  display: flex;
  background-color: var(--bg-canvas);
  padding: 0.35rem;
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
  gap: 0.35rem;
}

.tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.65rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  border-radius: 7px;
  cursor: pointer;
  transition: var(--transition-fast);
}

.tab-btn.active {
  background-color: var(--bg-card);
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-highlight);
}

/* =========================================================
   SELEÇÃO DE TELAS (VIEWS)
   ========================================================= */
.view-panel {
  display: none;
  padding: 1.5rem 1.25rem 5rem 1.25rem;
}

.view-panel.active {
  display: block;
  animation: fadeInView 0.35s ease-out forwards;
}

@keyframes fadeInView {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-intro {
  margin-bottom: 1.75rem;
}

.section-intro h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.section-intro p {
  color: var(--text-secondary);
  font-size: 0.938rem;
  margin-top: 0.25rem;
}

/* =========================================================
   VITRINE DE LANCHES (CARDS FLUIDOS & HOVER NEON)
   ========================================================= */
.menu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.card-lanche {
  background-color: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
}

.card-lanche:hover {
  transform: translateY(-5px);
  border-color: var(--neon-orange);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7), var(--shadow-glow-orange);
}

.card-media {
  position: relative;
  background-color: #161619;
  height: 190px;
  overflow: hidden;
}

.lanche-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card-lanche:hover .lanche-img {
  transform: scale(1.06);
}

.badge-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--neon-orange);
  color: #000;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--neon-orange-glow);
}

.card-body {
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.lanche-titulo {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.lanche-descricao {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.85rem;
}

.preco-lanche {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--neon-orange);
  text-shadow: 0 0 10px var(--neon-orange-glow);
}

.btn-add-carrinho {
  background-color: transparent;
  color: var(--neon-orange);
  border: 1.5px solid var(--neon-orange);
  padding: 0.55rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-add-carrinho:hover {
  background-color: var(--neon-orange);
  color: #000;
  box-shadow: 0 0 15px var(--neon-orange-glow);
  transform: scale(1.03);
}

/* =========================================================
   CARRINHO E FORMULÁRIO DE ENTREGA
   ========================================================= */
.carrinho-drawer {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  margin-top: 2rem;
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
}

.carrinho-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.carrinho-header h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
}

.btn-fechar-carrinho {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
}

.itens-carrinho-lista {
  list-style: none;
  margin: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resumo-financeiro {
  background-color: var(--bg-card);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
  margin-bottom: 1.5rem;
}

.linha-resumo {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.linha-total {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.form-entrega {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grupo {
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.25rem;
  background-color: var(--bg-canvas);
}

.form-grupo legend {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--neon-orange);
  padding: 0 0.5rem;
}

.input-control {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.85rem;
}

.input-control:last-child {
  margin-bottom: 0;
}

.input-control label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.input-control input,
.input-control textarea {
  background-color: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: var(--transition-fast);
}

.input-control input:focus,
.input-control textarea:focus {
  border-color: var(--neon-orange);
  box-shadow: 0 0 10px var(--neon-orange-glow);
}

.pagamento-opcoes {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.radio-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: var(--transition-fast);
}

.radio-card:hover {
  border-color: var(--neon-orange);
}

.pix-info-box {
  margin-top: 1rem;
  background-color: var(--bg-card);
  border: 1px dashed var(--neon-cyan);
  border-radius: 8px;
  padding: 1rem;
}

.pix-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--neon-cyan);
  text-transform: uppercase;
}

.pix-copia-cola {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-canvas);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
}

.btn-copiar-pix {
  background-color: var(--neon-cyan);
  color: #000;
  border: none;
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

/* BOTÃO FINAL DE CHECKOUT VERDE NEON */
.btn-checkout-neon {
  background: linear-gradient(135deg, var(--neon-green), #02A84C);
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 1.15rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  box-shadow: var(--shadow-glow-green);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  margin-top: 1rem;
}

.btn-checkout-neon:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 0 35px var(--neon-green-glow);
}

/* =========================================================
   PAINEL DA COZINHA (KANBAN & BADGES BRILHO NEON)
   ========================================================= */
.cozinha-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conexao-status {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--neon-green);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--neon-green);
  box-shadow: 0 0 10px var(--neon-green);
  animation: pulseGlow 1.8s infinite;
}

@keyframes pulseGlow {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 15px var(--neon-green); }
  100% { transform: scale(0.95); opacity: 0.8; }
}

.kanban-pedidos {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.card-pedido-cozinha {
  background-color: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pedido-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.75rem;
}

.pedido-numero {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
}

.pedido-hora {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-left: 0.5rem;
}

/* BADGES DE STATUS COM BRILHO NEON */
.badge-status {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  border: 1px solid transparent;
}

.badge-recebido {
  background-color: rgba(0, 212, 255, 0.15);
  color: var(--neon-cyan);
  border-color: var(--neon-cyan);
  box-shadow: 0 0 12px var(--neon-cyan-glow);
}

.badge-preparo {
  background-color: rgba(255, 184, 0, 0.15);
  color: var(--neon-yellow);
  border-color: var(--neon-yellow);
  box-shadow: 0 0 12px var(--neon-yellow-glow);
}

.badge-entrega {
  background-color: rgba(255, 144, 0, 0.15);
  color: var(--neon-orange);
  border-color: var(--neon-orange);
  box-shadow: 0 0 12px var(--neon-orange-glow);
}

.badge-entregue {
  background-color: rgba(4, 211, 97, 0.15);
  color: var(--neon-green);
  border-color: var(--neon-green);
  box-shadow: 0 0 12px var(--neon-green-glow);
}

.pedido-cliente-info h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.pedido-cliente-info p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.pedido-itens-bloco {
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 0.85rem;
}

.pedido-itens-bloco h5 {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.pedido-itens-lista {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.item-qtd {
  font-weight: 700;
  color: var(--neon-orange);
}

.item-nome {
  font-weight: 600;
}

.obs-item-destaque {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--neon-yellow);
  margin-top: 0.2rem;
}

.pedido-pagamento-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
}

.pedido-acoes-status {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.btn-status-acao {
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  padding: 0.6rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-status-acao:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.btn-status-acao.active {
  background-color: var(--bg-card-hover);
  color: #FFF;
  border-color: var(--neon-orange);
  box-shadow: 0 0 10px var(--neon-orange-glow);
}

/* =========================================================
   BREAKPOINTS RESPONSIVOS (MOBILE-FIRST)
   ========================================================= */

/* Tablet (a partir de 768px) */
@media (min-width: 768px) {
  .topbar-app {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2rem;
  }

  .view-panel {
    padding: 2rem;
  }

  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .grid-form-duplo {
    display: flex;
    gap: 1rem;
  }

  .flex-grow {
    flex: 1;
  }

  .w-pequeno {
    width: 120px;
  }

  .pagamento-opcoes {
    flex-direction: row;
  }

  .radio-card {
    flex: 1;
  }

  .kanban-pedidos {
    grid-template-columns: repeat(2, 1fr);
  }

  .pedido-acoes-status {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop & Telas Grandes (a partir de 1024px) */
@media (min-width: 1024px) {
  .view-panel {
    max-width: 1320px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }

  /* Layout Dividido na Visão do Cliente: Vitrine + Sidebar Carrinho */
  #viewCliente {
    display: none;
  }

  #viewCliente.active {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 2.5rem;
    align-items: start;
  }

  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .carrinho-drawer {
    margin-top: 0;
    position: sticky;
    top: 95px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .btn-fechar-carrinho {
    display: none;
  }

  /* Cozinha em Kanban Amplo */
  .kanban-pedidos {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
}

/* Telas Ultra-Wide (a partir de 1440px) */
@media (min-width: 1440px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .kanban-pedidos {
    grid-template-columns: repeat(4, 1fr);
  }
}

```

---

## 6. Diretrizes de Suporte Responsivo e Interação

### Experiência Mobile (Celular)

* O catálogo de lanches ocupa 100% da largura em coluna única com área de clique ampla.


* O carrinho atua como uma gaveta recolhível (bottom sheet drawer), mantendo um botão flutuante com contador totalizador visível durante a rolagem do cardápio.


* Todos os seletores manuais de quantidade (+/-) e botões de adicionar possuem altura mínima de `44px` para compatibilidade com toque em telas móveis.


* Os campos de formulário utilizam teclados virtuais otimizados: teclado numérico para telefone e números de endereço, e teclado de e-mail para comunicação direta.



### Experiência Desktop (Computadores e Telas de Apoio da Cozinha)

* Na Visão do Cliente, a tela se divide automaticamente em grid duplo: o catálogo de produtos à esquerda e a barra de revisão com checkout fixada à direita (Sticky Sidebar).


* Na Visão da Cozinha, o painel assume formato de monitor de pedidos com cartões expansíveis em até 4 colunas horizontais.


* O avanço de status possui botões independentes com feedback luminoso neon para toque rápido ou clique único com mouse.



---

## 7. Diretrizes de UX e Acessibilidade (a11y)

* **Contraste de Cores:** A relação de contraste entre os textos claros (`#F5F7FA`) e as superfícies escuras (`#0A0A0C`, `#202024`) atende ao padrão WCAG AAA com proporção superior a `7:1`.
* **Destaque de Observações Críticas:** Informações personalizadas sobre os lanches (ex: *"Sem cebola, cheddar bem derretido"*) utilizam a cor Amarelo Neon com ícone de advertência, impedindo erros na chapa da cozinha.


* **Feedback Tátil e Visual:** Todos os botões possuem microanimações no estado de hover com `transform: translateY(-2px)` e expansão de sombra neon (`box-shadow`), sinalizando prontidão de resposta.


* **Acessibilidade Semântica:** Uso rigoroso de tags `<article>`, `<header>`, `<main>`, `<aside>`, `<fieldset>` e atributos `aria-label` para navegadores com leitores de tela.