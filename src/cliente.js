/**
 * ==============================================================================
 * BurguerSync Ourinhos - Lógica da Visão do Cliente e Checkout (Layer 3)
 * ==============================================================================
 * Catálogo com filtros de categorias, carrinho reativo, cálculo automático com frete
 * fixo de Ourinhos (R$ 5,00), validação cadastral com DDD 14 e envio ao Firestore.
 */

import { db, collection, addDoc, serverTimestamp } from "./firebase-config.js";
import { PRODUTOS, CATEGORIAS } from "./produtos.js";

// Estado do Carrinho e Filtro
let carrinho = [];
let categoriaAtiva = "todos";
const TAXA_ENTREGA_FIXA = 5.00;

// Elementos DOM
const vitrineLanches = document.getElementById("vitrineLanches");
const containerCategorias = document.getElementById("containerCategorias");
const listaItensCarrinho = document.getElementById("listaItensCarrinho");
const contadorItensCarrinho = document.getElementById("contadorItensCarrinho");
const subtotalValor = document.getElementById("subtotalValor");
const taxaEntregaValor = document.getElementById("taxaEntregaValor");
const totalGeralValor = document.getElementById("totalGeralValor");
const formEntrega = document.getElementById("formEntrega");
const btnFinalizarPedido = document.getElementById("btnFinalizarPedido");
const campoTroco = document.getElementById("campoTroco");
const trocoPara = document.getElementById("trocoPara");
const modalConfirmacao = document.getElementById("modalConfirmacao");
const modalPedidoId = document.getElementById("modalPedidoId");
const modalPedidoResumo = document.getElementById("modalPedidoResumo");
const btnFecharModal = document.getElementById("btnFecharModal");
const btnCopiarPix = document.querySelector(".btn-copiar-pix");

/**
 * Formata valores para moeda brasileira (BRL)
 */
export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Renderiza os botões de seleção de categorias
 */
function renderizarCategorias() {
  if (!containerCategorias) return;
  containerCategorias.innerHTML = "";

  CATEGORIAS.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `categoria-chip ${cat.id === categoriaAtiva ? "active" : ""}`;
    btn.textContent = cat.nome;
    btn.dataset.categoria = cat.id;

    btn.addEventListener("click", () => {
      containerCategorias.querySelectorAll(".categoria-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      categoriaAtiva = cat.id;
      renderizarCatalogo();
    });

    containerCategorias.appendChild(btn);
  });
}

/**
 * Renderiza os produtos filtrados na vitrine
 */
function renderizarCatalogo() {
  if (!vitrineLanches) return;
  vitrineLanches.innerHTML = "";

  const produtosExibidos = categoriaAtiva === "todos"
    ? PRODUTOS
    : PRODUTOS.filter(p => p.categoria === categoriaAtiva);

  if (produtosExibidos.length === 0) {
    vitrineLanches.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
        Nenhum produto cadastrado nesta categoria.
      </div>
    `;
    return;
  }

  produtosExibidos.forEach(produto => {
    const card = document.createElement("article");
    card.className = "card-lanche";
    card.dataset.id = produto.id;

    card.innerHTML = `
      <div class="card-media">
        <img src="${produto.imagem}" alt="${produto.nome}" class="lanche-img" loading="lazy" onerror="this.src='assets/imagens/ourinhos-smash.jpg'">
        ${produto.destaque ? `<span class="badge-tag">${produto.destaque}</span>` : ""}
      </div>
      <div class="card-body">
        <h3 class="lanche-titulo">${produto.nome}</h3>
        <p class="lanche-descricao">${produto.descricao}</p>
        <div class="card-footer">
          <span class="preco-lanche">${formatarMoeda(produto.preco)}</span>
          <button type="button" class="btn-add-carrinho" data-id="${produto.id}">+ Adicionar</button>
        </div>
      </div>
    `;

    vitrineLanches.appendChild(card);
  });

  // Vincula eventos nos botões de adicionar
  vitrineLanches.querySelectorAll(".btn-add-carrinho").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      adicionarAoCarrinho(id);
    });
  });
}

/**
 * Adiciona um produto ao carrinho ou incrementa quantidade
 */
function adicionarAoCarrinho(produtoId) {
  const produto = PRODUTOS.find(p => p.id === produtoId);
  if (!produto) return;

  const itemExistente = carrinho.find(item => item.id === produtoId);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1,
      obs: ""
    });
  }

  atualizarCarrinho();
}

/**
 * Altera quantidade de um item no carrinho
 */
function alterarQuantidade(produtoId, delta) {
  const itemIndex = carrinho.findIndex(item => item.id === produtoId);
  if (itemIndex === -1) return;

  carrinho[itemIndex].quantidade += delta;
  if (carrinho[itemIndex].quantidade <= 0) {
    carrinho.splice(itemIndex, 1);
  }

  atualizarCarrinho();
}

/**
 * Remove item do carrinho
 */
function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter(item => item.id !== produtoId);
  atualizarCarrinho();
}

/**
 * Atualiza o DOM do carrinho e os totais
 */
function atualizarCarrinho() {
  if (!listaItensCarrinho) return;

  if (carrinho.length === 0) {
    listaItensCarrinho.innerHTML = `<li class="carrinho-vazio-msg">Seu carrinho está vazio.<br>Escolha seus lanches e bebidas ao lado! 🍔🥤</li>`;
    if (contadorItensCarrinho) contadorItensCarrinho.textContent = "0";
    if (subtotalValor) subtotalValor.textContent = formatarMoeda(0);
    if (totalGeralValor) totalGeralValor.textContent = formatarMoeda(TAXA_ENTREGA_FIXA);
    return;
  }

  let totalQtd = 0;
  let subtotal = 0;
  listaItensCarrinho.innerHTML = "";

  carrinho.forEach(item => {
    totalQtd += item.quantidade;
    const itemSubtotal = item.preco * item.quantidade;
    subtotal += itemSubtotal;

    const li = document.createElement("li");
    li.className = "carrinho-item";
    li.innerHTML = `
      <div class="carrinho-item-topo">
        <span class="carrinho-item-nome">${item.nome}</span>
        <span class="carrinho-item-preco">${formatarMoeda(itemSubtotal)}</span>
      </div>
      <div class="carrinho-item-controles">
        <div class="qtd-selector">
          <button type="button" class="btn-qtd btn-diminuir" data-id="${item.id}" aria-label="Diminuir">-</button>
          <span class="qtd-valor">${item.quantidade}</span>
          <button type="button" class="btn-qtd btn-aumentar" data-id="${item.id}" aria-label="Aumentar">+</button>
        </div>
        <button type="button" class="btn-remover-item" data-id="${item.id}">Remover</button>
      </div>
      <input type="text" class="item-obs-input" placeholder="Ex: Sem cebola, gelo e limão..." value="${item.obs || ""}" data-id="${item.id}">
    `;

    listaItensCarrinho.appendChild(li);
  });

  // Atualiza valores financeiros
  if (contadorItensCarrinho) contadorItensCarrinho.textContent = totalQtd;
  if (subtotalValor) subtotalValor.textContent = formatarMoeda(subtotal);
  if (taxaEntregaValor) taxaEntregaValor.textContent = formatarMoeda(TAXA_ENTREGA_FIXA);
  if (totalGeralValor) totalGeralValor.textContent = formatarMoeda(subtotal + TAXA_ENTREGA_FIXA);

  // Vincula botões de controle do carrinho
  listaItensCarrinho.querySelectorAll(".btn-aumentar").forEach(btn => {
    btn.addEventListener("click", () => alterarQuantidade(btn.dataset.id, 1));
  });

  listaItensCarrinho.querySelectorAll(".btn-diminuir").forEach(btn => {
    btn.addEventListener("click", () => alterarQuantidade(btn.dataset.id, -1));
  });

  listaItensCarrinho.querySelectorAll(".btn-remover-item").forEach(btn => {
    btn.addEventListener("click", () => removerDoCarrinho(btn.dataset.id));
  });

  listaItensCarrinho.querySelectorAll(".item-obs-input").forEach(input => {
    input.addEventListener("input", (e) => {
      const id = e.target.dataset.id;
      const item = carrinho.find(i => i.id === id);
      if (item) {
        item.obs = e.target.value.trim();
      }
    });
  });
}

/**
 * Máscara e formatação de telefone para DDD 14
 */
function configurarMascaraTelefone() {
  const telInput = document.getElementById("telefoneCliente");
  if (!telInput) return;

  telInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 6) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 0) {
      valor = `(${valor}`;
    }
    e.target.value = valor;
  });
}

/**
 * Alternância de opções de pagamento (Troco / Pix)
 */
function configurarOpcoesPagamento() {
  const opcoesRadio = document.querySelectorAll('input[name="pagamentoMetodo"]');
  const pixBox = document.getElementById("pixCheckout");

  opcoesRadio.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "dinheiro") {
        campoTroco?.classList.remove("hidden");
        trocoPara?.focus();
      } else {
        campoTroco?.classList.add("hidden");
      }

      if (e.target.value === "pix") {
        pixBox?.classList.remove("hidden");
      } else {
        pixBox?.classList.add("hidden");
      }
    });
  });

  btnCopiarPix?.addEventListener("click", () => {
    const chavePix = "pix@burguersync.ourinhos.com.br";
    navigator.clipboard.writeText(chavePix).then(() => {
      const originalTexto = btnCopiarPix.textContent;
      btnCopiarPix.textContent = "Copiado! ✓";
      setTimeout(() => {
        btnCopiarPix.textContent = originalTexto;
      }, 2000);
    });
  });
}

/**
 * Validação rigorosa dos campos antes do envio
 */
function validarFormulario() {
  const nome = document.getElementById("nomeCliente")?.value.trim();
  const email = document.getElementById("emailCliente")?.value.trim();
  const telefone = document.getElementById("telefoneCliente")?.value.trim();
  const rua = document.getElementById("enderecoRua")?.value.trim();
  const numero = document.getElementById("enderecoNumero")?.value.trim();
  const bairro = document.getElementById("enderecoBairro")?.value.trim();

  document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

  if (carrinho.length === 0) {
    alert("⚠️ Seu carrinho está vazio! Adicione pelo menos um lanche ou bebida antes de finalizar.");
    return false;
  }

  if (!nome || nome.length < 3) {
    destacarErro("nomeCliente", "Por favor, digite seu nome completo (mínimo 3 caracteres).");
    return false;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !regexEmail.test(email)) {
    destacarErro("emailCliente", "Por favor, insira um e-mail válido.");
    return false;
  }

  const telNumeros = (telefone || "").replace(/\D/g, "");
  if (!telNumeros.startsWith("14") || telNumeros.length < 10 || telNumeros.length > 11) {
    destacarErro("telefoneCliente", "Por favor, informe um telefone de Ourinhos/região com DDD (14).");
    return false;
  }

  if (!rua) {
    destacarErro("enderecoRua", "Informe o nome da rua ou avenida de entrega.");
    return false;
  }

  if (!numero) {
    destacarErro("enderecoNumero", "Informe o número da residência/comércio.");
    return false;
  }

  if (!bairro) {
    destacarErro("enderecoBairro", "Informe o bairro de Ourinhos.");
    return false;
  }

  return true;
}

function destacarErro(fieldId, mensagem) {
  const campo = document.getElementById(fieldId);
  if (campo) {
    campo.classList.add("input-error");
    campo.focus();
  }
  alert(`⚠️ Atenção: ${mensagem}`);
}

/**
 * Envia o pedido ao Firebase Cloud Firestore com autorrecuperação
 */
async function finalizarPedido(e) {
  e.preventDefault();

  if (!validarFormulario()) return;

  btnFinalizarPedido.disabled = true;
  btnFinalizarPedido.textContent = "⏳ Enviando Pedido para a Cozinha...";

  const nome = document.getElementById("nomeCliente").value.trim();
  const email = document.getElementById("emailCliente").value.trim();
  const telefone = document.getElementById("telefoneCliente").value.trim();
  const rua = document.getElementById("enderecoRua").value.trim();
  const numero = document.getElementById("enderecoNumero").value.trim();
  const bairro = document.getElementById("enderecoBairro").value.trim();
  const referencia = document.getElementById("enderecoReferencia")?.value.trim() || "";
  const obsEntrega = document.getElementById("obsEntrega")?.value.trim() || "";

  const metodoPagamentoRadio = document.querySelector('input[name="pagamentoMetodo"]:checked')?.value || "pix";
  let metodoFormatado = "Pix";
  if (metodoPagamentoRadio === "cartao") metodoFormatado = "Cartao_Entrega";
  if (metodoPagamentoRadio === "dinheiro") metodoFormatado = "Dinheiro_Entrega";

  const troco = metodoPagamentoRadio === "dinheiro" ? (trocoPara?.value.trim() || "Não precisa") : "";

  const subtotal = carrinho.reduce((acc, curr) => acc + (curr.preco * curr.quantidade), 0);
  const total = subtotal + TAXA_ENTREGA_FIXA;

  const enderecoCompleto = `${rua}, ${numero} - ${bairro}${referencia ? ` (${referencia})` : ""}, Ourinhos-SP`;

  const payloadPedido = {
    cliente: {
      nome,
      email,
      celular: telefone,
      endereco: enderecoCompleto,
      obsEntrega
    },
    itens: carrinho.map(item => ({
      nome: item.nome,
      preco: item.preco,
      quantidade: item.quantidade,
      obsItem: item.obs || "Padrão"
    })),
    pagamento: {
      metodo: metodoFormatado,
      troco
    },
    valores: {
      subtotal: parseFloat(subtotal.toFixed(2)),
      taxaEntrega: TAXA_ENTREGA_FIXA,
      total: parseFloat(total.toFixed(2))
    },
    status: "Recebido",
    horario: serverTimestamp()
  };

  try {
    console.log("🚀 Enviando pedido ao Firestore...", payloadPedido);
    const docRef = await addDoc(collection(db, "pedidos"), payloadPedido);
    console.log("✅ Pedido gravado com sucesso! ID:", docRef.id);

    exibirModalSucesso(docRef.id, payloadPedido);

    // Reseta carrinho e formulário
    carrinho = [];
    atualizarCarrinho();
    formEntrega.reset();
    campoTroco?.classList.add("hidden");

  } catch (error) {
    console.error("❌ Falha ao enviar pedido ao Firestore:", error);
    try {
      localStorage.setItem("burguersync_failed_order", JSON.stringify(payloadPedido));
    } catch (_) {}

    alert("❌ Ocorreu uma oscilação na conexão com a nuvem. Seu pedido foi preservado localmente e tentaremos reenviar em instantes.");
  } finally {
    btnFinalizarPedido.disabled = false;
    btnFinalizarPedido.textContent = "Finalizar e Enviar Pedido para a Cozinha";
  }
}

/**
 * Exibe o modal de confirmação
 */
function exibirModalSucesso(pedidoId, pedido) {
  if (!modalConfirmacao) return;

  if (modalPedidoId) modalPedidoId.textContent = `#${pedidoId.slice(-6).toUpperCase()}`;
  if (modalPedidoResumo) {
    modalPedidoResumo.innerHTML = `
      <p><strong>Cliente:</strong> ${pedido.cliente.nome}</p>
      <p><strong>Endereço:</strong> ${pedido.cliente.endereco}</p>
      <p><strong>Total:</strong> ${formatarMoeda(pedido.valores.total)} (${pedido.pagamento.metodo})</p>
      <p><strong>Status:</strong> <span style="color: var(--neon-cyan);">Recebido na Cozinha</span></p>
    `;
  }

  modalConfirmacao.classList.remove("hidden");
}

/**
 * Inicialização da interface do Cliente
 */
export function inicializarCliente() {
  renderizarCategorias();
  renderizarCatalogo();
  atualizarCarrinho();
  configurarMascaraTelefone();
  configurarOpcoesPagamento();

  if (formEntrega) {
    formEntrega.addEventListener("submit", finalizarPedido);
  }

  btnFecharModal?.addEventListener("click", () => {
    modalConfirmacao?.classList.add("hidden");
  });
}

// Inicializa automaticamente se carregado em página dedicada
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarCliente);
} else {
  inicializarCliente();
}
