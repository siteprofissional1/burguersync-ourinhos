/**
 * ==============================================================================
 * BurguerSync Ourinhos - Painel da Cozinha em Tempo Real (Layer 3)
 * ==============================================================================
 * Escuta reativa via onSnapshot do Firestore, renderização kanban instantânea,
 * atualização de status via updateDoc e avisos sonoros de novos pedidos.
 */

import { db, collection, onSnapshot, updateDoc, doc, query, orderBy } from "./firebase-config.js";
import { formatarMoeda } from "./cliente.js";

const listaPedidos = document.getElementById("listaPedidos");
const conexaoStatus = document.querySelector(".conexao-status");
const audioAlerta = new (window.AudioContext || window.webkitAudioContext || null)();

let pedidosCache = [];
let filtroAtual = "todos";
let primeiroCarregamento = true;

/**
 * Toca sinal sonoro sutil (Buzzer de cozinha) ao receber novo pedido
 */
function tocarAlertaNovoPedido() {
  if (!audioAlerta) return;
  try {
    const osc = audioAlerta.createOscillator();
    const gain = audioAlerta.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, audioAlerta.currentTime); // Tom Ré
    osc.frequency.exponentialRampToValueAtTime(880, audioAlerta.currentTime + 0.15); // Tom Lá
    gain.gain.setValueAtTime(0.2, audioAlerta.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioAlerta.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioAlerta.destination);
    osc.start();
    osc.stop(audioAlerta.currentTime + 0.3);
  } catch (_) {
    // Interação do usuário pode ser necessária para áudio
  }
}

/**
 * Formata o timestamp do Firestore para hora legível (HH:mm)
 */
function formatarHora(timestamp) {
  if (!timestamp) return "Agora";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Retorna a classe CSS da badge de acordo com o status
 */
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
 * Renderiza os pedidos no painel kanban da cozinha
 */
function renderizarPedidos() {
  if (!listaPedidos) return;

  const pedidosFiltrados = filtroAtual === "todos"
    ? pedidosCache
    : pedidosCache.filter(p => p.status === filtroAtual);

  if (pedidosFiltrados.length === 0) {
    listaPedidos.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: 14px; border: 1px dashed var(--border-subtle);">
        <p style="font-size: 1.1rem; font-weight: 600;">👨‍🍳 Nenhum pedido nesta categoria no momento.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Os pedidos recebidos aparecerão aqui em tempo real!</p>
      </div>
    `;
    return;
  }

  listaPedidos.innerHTML = "";

  pedidosFiltrados.forEach(pedido => {
    const article = document.createElement("article");
    article.className = "card-pedido-cozinha";
    article.dataset.id = pedido.id;

    // Número legível simplificado
    const numeroLegivel = pedido.id ? `#${pedido.id.slice(-4).toUpperCase()}` : "#---";
    const horaFormatada = formatarHora(pedido.horario);
    const badgeClasse = obterClasseBadge(pedido.status);

    // Formata link de WhatsApp direto para o entregador/chapeiro
    const telLimpo = (pedido.cliente.celular || "").replace(/\D/g, "");
    const linkWhatsApp = `https://wa.me/55${telLimpo}`;

    // Renderiza lista de itens e observações
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
            📱 ${pedido.cliente.celular} (WhatsApp)
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
        <button type="button" class="btn-status-acao ${pedido.status === "Em Preparo" ? "active" : ""}" data-status="Em Preparo">Em Preparo</button>
        <button type="button" class="btn-status-acao ${pedido.status === "Saiu para Entrega" ? "active" : ""}" data-status="Saiu para Entrega">Em Entrega</button>
        <button type="button" class="btn-status-acao ${pedido.status === "Entregue" ? "active" : ""}" data-status="Entregue">Entregue</button>
      </footer>
    `;

    // Vincula clique nos botões de status do pedido
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
 * Atualiza o status do pedido no Firestore
 */
async function atualizarStatusPedido(pedidoId, novoStatus) {
  try {
    console.log(`🔄 Atualizando status do pedido ${pedidoId} para '${novoStatus}'...`);
    const docRef = doc(db, "pedidos", pedidoId);
    await updateDoc(docRef, { status: novoStatus });
    console.log(`✅ Status atualizado com sucesso!`);
  } catch (error) {
    console.error("❌ Erro ao atualizar status no Firestore:", error);
    alert("Erro ao sincronizar alteração de status com o banco em nuvem.");
  }
}

/**
 * Configura botões de filtro no painel da cozinha
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
 * Inicia o escutador em tempo real (onSnapshot) com reconexão resiliente
 */
export function inicializarCozinha() {
  configurarFiltrosCozinha();

  try {
    const consultaPedidos = query(collection(db, "pedidos"), orderBy("horario", "desc"));

    onSnapshot(consultaPedidos, (snapshot) => {
      if (conexaoStatus) {
        conexaoStatus.classList.remove("reconnecting");
        conexaoStatus.innerHTML = `<span class="pulse-indicator"></span> Cozinha Operando`;
      }

      const novosPedidos = [];
      snapshot.forEach(docSnap => {
        novosPedidos.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });

      // Se novos pedidos chegaram após o carregamento inicial, toca o buzzer
      if (!primeiroCarregamento && novosPedidos.length > pedidosCache.length) {
        tocarAlertaNovoPedido();
      }
      primeiroCarregamento = false;

      pedidosCache = novosPedidos;
      renderizarPedidos();
    }, (error) => {
      console.warn("⚠️ Perda temporária de conexão com o Firestore na cozinha:", error);
      if (conexaoStatus) {
        conexaoStatus.classList.add("reconnecting");
        conexaoStatus.innerHTML = `<span class="pulse-indicator"></span> Reconectando sinal...`;
      }
      // Tenta reconectar após 5 segundos
      setTimeout(() => inicializarCozinha(), 5000);
    });

  } catch (error) {
    console.error("❌ Falha crítica ao inicializar listener da cozinha:", error);
  }
}
