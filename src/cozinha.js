/**
 * ==============================================================================
 * BurguerSync Ourinhos - Painel Restrito da Cozinha & Admin (Layer 3)
 * ==============================================================================
 * Autenticação por senha, escuta reativa onSnapshot do Firestore, avanços de status
 * operacionais e alertas sonoros (buzzer) na chegada de novos pedidos.
 */

import { db, collection, onSnapshot, updateDoc, doc, query, orderBy } from "./firebase-config.js";
import { formatarMoeda } from "./cliente.js";

// Senhas aceitas para operadores e administradores da cozinha
const SENHAS_ADMIN_VALIDAS = ["senai2026", "admin123", "burguer123"];

// Elementos DOM
const telaBloqueio = document.getElementById("telaBloqueio");
const formLoginAdmin = document.getElementById("formLoginAdmin");
const senhaAdminInput = document.getElementById("senhaAdminInput");
const erroLoginMsg = document.getElementById("erroLoginMsg");
const painelPrincipalAdmin = document.getElementById("painelPrincipalAdmin");
const listaPedidos = document.getElementById("listaPedidos");
const conexaoStatus = document.querySelector(".conexao-status");
const btnLogoutAdmin = document.getElementById("btnLogoutAdmin");
const contadorRecebidos = document.getElementById("contadorRecebidos");
const contadorPreparo = document.getElementById("contadorPreparo");
const contadorEntrega = document.getElementById("contadorEntrega");
const contadorEntregues = document.getElementById("contadorEntregues");

const audioAlerta = new (window.AudioContext || window.webkitAudioContext || null)();

let pedidosCache = [];
let filtroAtual = "todos";
let primeiroCarregamento = true;

/**
 * Toca o buzzer sonoro de cozinha ao receber novo pedido
 */
function tocarAlertaNovoPedido() {
  if (!audioAlerta) return;
  try {
    const osc = audioAlerta.createOscillator();
    const gain = audioAlerta.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, audioAlerta.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioAlerta.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, audioAlerta.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioAlerta.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioAlerta.destination);
    osc.start();
    osc.stop(audioAlerta.currentTime + 0.3);
  } catch (_) {}
}

/**
 * Formata o timestamp para hora legível
 */
function formatarHora(timestamp) {
  if (!timestamp) return "Agora";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function obterClasseBadge(status) {
  switch (status) {
    case "Recebido": return "badge-recebido";
    case "Em Preparo": return "badge-preparo";
    case "Saiu para Entrega": return "badge-entrega";
    case "Entregue": return "badge-entregue";
    default: return "badge-recebido";
  }
}

/**
 * Atualiza os contadores operacionais no topo do painel
 */
function atualizarContadores() {
  const recebidos = pedidosCache.filter(p => p.status === "Recebido").length;
  const preparo = pedidosCache.filter(p => p.status === "Em Preparo").length;
  const entrega = pedidosCache.filter(p => p.status === "Saiu para Entrega").length;
  const entregues = pedidosCache.filter(p => p.status === "Entregue").length;

  if (contadorRecebidos) contadorRecebidos.textContent = recebidos;
  if (contadorPreparo) contadorPreparo.textContent = preparo;
  if (contadorEntrega) contadorEntrega.textContent = entrega;
  if (contadorEntregues) contadorEntregues.textContent = entregues;
}

/**
 * Renderiza os pedidos no quadro Kanban
 */
function renderizarPedidos() {
  if (!listaPedidos) return;

  atualizarContadores();

  const pedidosFiltrados = filtroAtual === "todos"
    ? pedidosCache
    : pedidosCache.filter(p => p.status === filtroAtual);

  if (pedidosFiltrados.length === 0) {
    listaPedidos.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: 14px; border: 1px dashed var(--border-subtle);">
        <p style="font-size: 1.1rem; font-weight: 600;">👨‍🍳 Nenhum pedido encontrado neste filtro no momento.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Os pedidos sincronizados via Firebase aparecerão automaticamente em tempo real.</p>
      </div>
    `;
    return;
  }

  listaPedidos.innerHTML = "";

  pedidosFiltrados.forEach(pedido => {
    const article = document.createElement("article");
    article.className = "card-pedido-cozinha";
    article.dataset.id = pedido.id;

    const numeroLegivel = pedido.id ? `#${pedido.id.slice(-4).toUpperCase()}` : "#---";
    const horaFormatada = formatarHora(pedido.horario);
    const badgeClasse = obterClasseBadge(pedido.status);

    const telLimpo = (pedido.cliente.celular || "").replace(/\D/g, "");
    const linkWhatsApp = `https://wa.me/55${telLimpo}`;

    const itensHTML = (pedido.itens || []).map(item => `
      <li>
        <span class="item-qtd">${item.quantidade}x</span>
        <span class="item-nome">${item.nome}</span>
        ${item.obsItem && item.obsItem !== "Padrão" ? `<p class="obs-item-destaque">⚠️ Obs: ${item.obsItem}</p>` : ""}
      </li>
    `).join("");

    article.innerHTML = `
      <header class="pedido-top">
        <div class="pedido-meta">
          <span class="pedido-numero">${numeroLegivel}</span>
          <time class="pedido-hora">${horaFormatada}</time>
        </div>
        <span class="badge-status ${badgeClasse}">${pedido.status}</span>
      </header>

      <div class="pedido-cliente-info">
        <h4>${pedido.cliente.nome}</h4>
        <p>${pedido.cliente.endereco}</p>
        <p class="pedido-whatsapp">
          <a href="${linkWhatsApp}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
            📱 ${pedido.cliente.celular} (Abrir WhatsApp)
          </a>
        </p>
        ${pedido.cliente.obsEntrega ? `<p style="color: var(--neon-yellow); font-size: 0.8rem; margin-top: 0.2rem;">📍 ${pedido.cliente.obsEntrega}</p>` : ""}
      </div>

      <div class="pedido-itens-bloco">
        <h5>Itens Solicitados:</h5>
        <ul class="pedido-itens-lista">
          ${itensHTML}
        </ul>
      </div>

      <div class="pedido-pagamento-info">
        <span>Pagamento: <strong>${pedido.pagamento?.metodo || "Pix"}</strong>${pedido.pagamento?.troco ? ` (${pedido.pagamento.troco})` : ""}</span>
        <span>Total: <strong>${formatarMoeda(pedido.valores?.total || 0)}</strong></span>
      </div>

      <footer class="pedido-acoes-status">
        <button type="button" class="btn-status-acao ${pedido.status === "Recebido" ? "active" : ""}" data-status="Recebido">Recebido</button>
        <button type="button" class="btn-status-acao ${pedido.status === "Em Preparo" ? "active" : ""}" data-status="Em Preparo">Na Chapa</button>
        <button type="button" class="btn-status-acao ${pedido.status === "Saiu para Entrega" ? "active" : ""}" data-status="Saiu para Entrega">Em Despacho</button>
        <button type="button" class="btn-status-acao ${pedido.status === "Entregue" ? "active" : ""}" data-status="Entregue">Entregue</button>
      </footer>
    `;

    article.querySelectorAll(".btn-status-acao").forEach(btn => {
      btn.addEventListener("click", () => {
        const novoStatus = btn.dataset.status;
        atualizarStatusPedido(pedido.id, novoStatus);
      });
    });

    listaPedidos.appendChild(article);
  });
}

/**
 * Atualiza status no Firestore
 */
async function atualizarStatusPedido(pedidoId, novoStatus) {
  try {
    console.log(`🔄 Atualizando pedido ${pedidoId} para '${novoStatus}'...`);
    const docRef = doc(db, "pedidos", pedidoId);
    await updateDoc(docRef, { status: novoStatus });
  } catch (error) {
    console.error("❌ Erro ao atualizar status no Firestore:", error);
    alert("Falha ao sincronizar alteração com a nuvem.");
  }
}

/**
 * Configuração dos botões de filtro
 */
function configurarFiltrosCozinha() {
  const containerFiltros = document.querySelector(".cozinha-filtros");
  if (!containerFiltros) return;

  containerFiltros.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      containerFiltros.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      filtroAtual = e.currentTarget.dataset.filtro;
      renderizarPedidos();
    });
  });
}

/**
 * Escutador reativo em tempo real via Firestore onSnapshot
 */
function iniciarEscutaRealtime() {
  try {
    const consultaPedidos = query(collection(db, "pedidos"), orderBy("horario", "desc"));

    onSnapshot(consultaPedidos, (snapshot) => {
      if (conexaoStatus) {
        conexaoStatus.classList.remove("reconnecting");
        conexaoStatus.innerHTML = `<span class="pulse-indicator"></span> Cozinha Operando em Tempo Real`;
      }

      const novosPedidos = [];
      snapshot.forEach(docSnap => {
        novosPedidos.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });

      if (!primeiroCarregamento && novosPedidos.length > pedidosCache.length) {
        tocarAlertaNovoPedido();
      }
      primeiroCarregamento = false;

      pedidosCache = novosPedidos;
      renderizarPedidos();
    }, (error) => {
      console.warn("⚠️ Perda temporária de sinal:", error);
      if (conexaoStatus) {
        conexaoStatus.classList.add("reconnecting");
        conexaoStatus.innerHTML = `<span class="pulse-indicator"></span> Reconectando sinal...`;
      }
      setTimeout(iniciarEscutaRealtime, 5000);
    });
  } catch (error) {
    console.error("❌ Falha no listener do Firestore:", error);
  }
}

/**
 * Gerenciamento de Login e Autenticação do Admin
 */
function verificarAutenticacao() {
  const logado = sessionStorage.getItem("burguersync_admin_auth");

  if (logado === "true") {
    desbloquearPainel();
  } else {
    bloquearPainel();
  }
}

function desbloquearPainel() {
  telaBloqueio?.classList.add("hidden");
  painelPrincipalAdmin?.classList.remove("hidden");
  iniciarEscutaRealtime();
}

function bloquearPainel() {
  telaBloqueio?.classList.remove("hidden");
  painelPrincipalAdmin?.classList.add("hidden");
  sessionStorage.removeItem("burguersync_admin_auth");
}

function configurarEventosLogin() {
  formLoginAdmin?.addEventListener("submit", (e) => {
    e.preventDefault();
    const senhaDigitada = senhaAdminInput?.value.trim();

    if (SENHAS_ADMIN_VALIDAS.includes(senhaDigitada)) {
      erroLoginMsg?.classList.add("hidden");
      sessionStorage.setItem("burguersync_admin_auth", "true");
      desbloquearPainel();
    } else {
      if (erroLoginMsg) {
        erroLoginMsg.classList.remove("hidden");
        erroLoginMsg.textContent = "❌ Senha incorreta. Tente 'senai2026' ou 'admin123'.";
      }
      senhaAdminInput?.focus();
    }
  });

  btnLogoutAdmin?.addEventListener("click", () => {
    bloquearPainel();
    senhaAdminInput.value = "";
  });
}

/**
 * Inicialização do módulo de Cozinha / Admin
 */
export function inicializarCozinha() {
  configurarFiltrosCozinha();
  configurarEventosLogin();
  verificarAutenticacao();
}

// Inicializa quando carregado em admin.html
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarCozinha);
} else {
  inicializarCozinha();
}
