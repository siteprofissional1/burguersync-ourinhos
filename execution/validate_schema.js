/**
 * ==============================================================================
 * BurguerSync Ourinhos - Script Determinístico de Validação de Schema (Layer 3)
 * ==============================================================================
 * Valida a conformidade de payloads de pedidos com o modelo de dados do Firestore
 * conforme estipulado na Diretiva Layer 1 (directives/projeto.md).
 */

const fs = require('fs');
const path = require('path');

// Carrega o arquivo de schema temporário
const schemaPath = path.join(__dirname, '..', '.tmp', 'raw_order_schema.json');

function validarPedido(pedido, index) {
  const erros = [];

  // 1. Validação dos dados do Cliente
  if (!pedido.cliente) {
    erros.push(`Pedido #${index}: Objeto 'cliente' ausente.`);
  } else {
    const { nome, email, celular, endereco } = pedido.cliente;
    if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
      erros.push(`Pedido #${index}: Nome do cliente inválido ou muito curto.`);
    }
    if (!email || !email.includes('@')) {
      erros.push(`Pedido #${index}: Formato de e-mail inválido.`);
    }
    // Validação estrita do DDD 14 de Ourinhos/região
    const regexDDD14 = /^\(?14\)?\s?9?\d{4}-?\d{4}$/;
    const celularLimpo = (celular || '').replace(/\D/g, '');
    if (!celularLimpo.startsWith('14') || celularLimpo.length < 10 || celularLimpo.length > 11) {
      erros.push(`Pedido #${index}: Número de celular deve ser do DDD 14 (Ourinhos). Recebido: ${celular}`);
    }
    if (!endereco || endereco.trim().length < 5) {
      erros.push(`Pedido #${index}: Endereço de entrega obrigatório incompleto.`);
    }
  }

  // 2. Validação dos Itens
  if (!Array.isArray(pedido.itens) || pedido.itens.length === 0) {
    erros.push(`Pedido #${index}: O carrinho deve conter ao menos 1 item.`);
  } else {
    pedido.itens.forEach((item, itemIdx) => {
      if (!item.nome || typeof item.nome !== 'string') {
        erros.push(`Pedido #${index}, Item #${itemIdx}: Nome do produto ausente.`);
      }
      if (typeof item.preco !== 'number' || item.preco <= 0) {
        erros.push(`Pedido #${index}, Item #${itemIdx}: Preço unitário inválido.`);
      }
      if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
        erros.push(`Pedido #${index}, Item #${itemIdx}: Quantidade deve ser inteiro positivo.`);
      }
    });
  }

  // 3. Validação dos Valores Financeiros e Taxa Fixa de R$ 5,00
  if (!pedido.valores) {
    erros.push(`Pedido #${index}: Objeto 'valores' ausente.`);
  } else {
    const { subtotal, taxaEntrega, total } = pedido.valores;
    const taxaEsperada = 5.00;
    if (taxaEntrega !== taxaEsperada) {
      erros.push(`Pedido #${index}: Taxa de entrega fixa para Ourinhos deve ser R$ 5,00. Recebido: ${taxaEntrega}`);
    }
    // Recalcula subtotal
    const subtotalCalculado = pedido.itens.reduce((acc, curr) => acc + (curr.preco * curr.quantidade), 0);
    if (Math.abs(subtotal - subtotalCalculado) > 0.01) {
      erros.push(`Pedido #${index}: Subtotal divergente. Calculado: ${subtotalCalculado.toFixed(2)}, Informado: ${subtotal}`);
    }
    if (Math.abs(total - (subtotalCalculado + taxaEsperada)) > 0.01) {
      erros.push(`Pedido #${index}: Total geral inconsistente.`);
    }
  }

  // 4. Validação de Status do Ciclo Operacional
  const statusValidos = ['Recebido', 'Em Preparo', 'Saiu para Entrega', 'Entregue'];
  if (!statusValidos.includes(pedido.status)) {
    erros.push(`Pedido #${index}: Status '${pedido.status}' inválido. Válidos: ${statusValidos.join(', ')}`);
  }

  return erros;
}

function executarValidacao() {
  console.log('--- INICIANDO VALIDAÇÃO DETERMINÍSTICA DE SCHEMA (BURGUERSYNC) ---');

  if (!fs.existsSync(schemaPath)) {
    console.error(`ERRO: Arquivo não encontrado: ${schemaPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(schemaPath, 'utf-8');
  const parsed = JSON.parse(rawData);
  const pedidos = parsed.pedidosExemplo || [];

  let totalErros = 0;

  pedidos.forEach((pedido, idx) => {
    const erros = validarPedido(pedido, idx + 1);
    if (erros.length > 0) {
      console.error(`❌ Falhas no pedido #${idx + 1}:`);
      erros.forEach(e => console.error(`   - ${e}`));
      totalErros += erros.length;
    } else {
      console.log(`✅ Pedido #${idx + 1} (${pedido.cliente.nome}) validado com 100% de conformidade.`);
    }
  });

  if (totalErros > 0) {
    console.error(`\n❌ Validação concluída com ${totalErros} erro(s).`);
    process.exit(1);
  } else {
    console.log(`\n🎉 Todos os ${pedidos.length} pedidos de teste cumpriram os requisitos estritos da Layer 1.`);
  }
}

executarValidacao();
